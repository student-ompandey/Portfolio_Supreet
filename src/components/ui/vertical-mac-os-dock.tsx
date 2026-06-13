'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../lib/utils';

// Types for the component
export interface VerticalDockApp {
  id: string;
  name: string;
  icon: string;
  url: string;
}

interface VerticalMacOSDockProps {
  apps: VerticalDockApp[];
  className?: string;
}

const VerticalMacOSDock: React.FC<VerticalMacOSDockProps> = ({ 
  apps, 
  className = ''
}) => {
  const [mouseY, setMouseY] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(0);

  // Responsive size calculations based on viewport
  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 56, maxScale: 1.6, effectWidth: 240 };
    }

    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    
    if (smallerDimension < 768) {
      return {
        baseIconSize: Math.max(48, smallerDimension * 0.07),
        maxScale: 1.4,
        effectWidth: smallerDimension * 0.35
      };
    } else {
      return {
        baseIconSize: 56,
        maxScale: 1.6,
        effectWidth: 250
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(8, baseIconSize * 0.15);

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback((mousePosition: number | null) => {
    if (mousePosition === null) {
      return apps.map(() => minScale);
    }

    return apps.map((_, index) => {
      const normalIconCenter = (index * (baseIconSize + baseSpacing)) + (baseIconSize / 2);
      const minYPos = mousePosition - (effectWidth / 2);
      const maxYPos = mousePosition + (effectWidth / 2);
      
      if (normalIconCenter < minYPos || normalIconCenter > maxYPos) {
        return minScale;
      }
      
      const theta = ((normalIconCenter - minYPos) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      
      return minScale + (scaleFactor * (maxScale - minScale));
    });
  }, [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]);

  const calculatePositions = useCallback((scales: number[]) => {
    let currentY = 0;
    
    return scales.map((scale) => {
      const scaledHeight = baseIconSize * scale;
      const centerY = currentY + (scaledHeight / 2);
      currentY += scaledHeight + baseSpacing;
      return centerY;
    });
  }, [baseIconSize, baseSpacing]);

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    const initialPositions = calculatePositions(initialScales);
    setCurrentScales(initialScales);
    setCurrentPositions(initialPositions);
  }, [apps, calculatePositions, minScale, config]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseY);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseY !== null ? 0.2 : 0.12;

    setCurrentScales(prevScales => {
      return prevScales.map((currentScale, index) => {
        const diff = targetScales[index] - currentScale;
        return currentScale + (diff * lerpFactor);
      });
    });

    setCurrentPositions(prevPositions => {
      return prevPositions.map((currentPos, index) => {
        const diff = targetPositions[index] - currentPos;
        return currentPos + (diff * lerpFactor);
      });
    });

    const scalesNeedUpdate = currentScales.some((scale, index) => 
      Math.abs(scale - targetScales[index]) > 0.002
    );
    const positionsNeedUpdate = currentPositions.some((pos, index) => 
      Math.abs(pos - targetPositions[index]) > 0.1
    );
    
    if (scalesNeedUpdate || positionsNeedUpdate || mouseY !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseY, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    
    if (now - lastMouseMoveTime.current < 16) {
      return;
    }
    
    lastMouseMoveTime.current = now;
    
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setMouseY(e.clientY - rect.top - padding);
    }
  }, [baseIconSize]);

  const handleMouseLeave = useCallback(() => {
    setMouseY(null);
  }, []);

  const contentHeight = currentPositions.length > 0 
    ? Math.max(...currentPositions.map((pos, index) => 
        pos + (baseIconSize * currentScales[index]) / 2
      ))
    : (apps.length * (baseIconSize + baseSpacing)) - baseSpacing;

  const padding = Math.max(8, baseIconSize * 0.12);

  return (
    <div 
      ref={dockRef}
      className={cn("backdrop-blur-xl z-[100]", className)}
      style={{
        height: `${contentHeight + padding * 2}px`,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: `${Math.max(16, baseIconSize * 0.4)}px`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `
          0 10px 30px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        padding: `${padding}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative"
        style={{
          width: `${baseIconSize}px`,
          height: '100%'
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = baseIconSize * scale;
          
          return (
            <a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex flex-row items-center justify-end group transition-transform hover:z-50"
              style={{
                top: `${position - scaledSize / 2}px`,
                right: '0px',
                height: `${scaledSize}px`,
                width: `${scaledSize}px`,
                transformOrigin: 'right center',
                zIndex: Math.round(scale * 10)
              }}
            >
              {/* Custom Tooltip on the left side */}
              <div 
                className="absolute right-[calc(100%+16px)] opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md text-white border border-white/10 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-xl"
              >
                {app.name}
              </div>

              <img
                src={app.icon}
                alt={app.name}
                width={scaledSize}
                height={scaledSize}
                className="object-contain drop-shadow-xl"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalMacOSDock;
