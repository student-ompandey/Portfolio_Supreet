"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 250;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-black bg-[#C3E41D] border-[#C3E41D]";
      case "in-progress":
        return "text-[#C3E41D] bg-black border-[#C3E41D]";
      case "pending":
        return "text-white bg-black/40 border-neutral-800";
      default:
        return "text-white bg-black/40 border-neutral-800";
    }
  };

  return (
    <div
      className="w-full h-full min-h-[800px] flex flex-col items-center justify-center bg-black overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Hub Core */}
          <div className="absolute w-20 h-20 bg-black border-2 border-[#C3E41D] animate-pulse flex items-center justify-center z-10" style={{ boxShadow: '0 0 20px rgba(195, 228, 29, 0.5)' }}>
            <div className="absolute w-24 h-24 border border-[#C3E41D]/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-32 h-32 border border-[#C3E41D]/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 bg-[#C3E41D]/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[500px] h-[500px] rounded-full border border-neutral-800 border-dashed"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(195, 228, 29, 0.2) 0%, rgba(0,0,0,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#C3E41D] text-black"
                      : isRelated
                      ? "bg-[#C3E41D]/50 text-black"
                      : "bg-black text-[#C3E41D]"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-[#C3E41D] shadow-lg shadow-[#C3E41D]/30"
                      : isRelated
                      ? "border-[#C3E41D] animate-pulse"
                      : "border-neutral-800"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <div
                  className={`
                  absolute top-14 whitespace-nowrap
                  text-xs font-bold tracking-widest uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-neutral-500"}
                `}
                  style={{ fontFamily: "'Fira Code', monospace", left: "50%", transform: "translateX(-50%)" }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-black border-[#C3E41D] shadow-xl shadow-[#C3E41D]/10 overflow-visible z-50">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#C3E41D]"></div>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          className={`px-2 text-[10px] ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.category}
                        </Badge>
                        <span className="text-[10px] font-bold text-[#C3E41D]" style={{ fontFamily: "'Fira Code', monospace" }}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-neutral-400 pb-6">
                      <p className="mb-4">{item.content}</p>

                      <div className="mt-4 pt-4 border-t border-neutral-800">
                        <div className="flex justify-between items-center text-xs mb-2 font-bold tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
                          <span className="flex items-center text-neutral-500">
                            <Zap size={12} className="mr-2 text-[#C3E41D]" />
                            Proficiency
                          </span>
                          <span className="text-[#C3E41D]">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
                          <div
                            className="h-full bg-[#C3E41D]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-neutral-800">
                          <div className="flex items-center mb-3">
                            <Link size={12} className="text-[#C3E41D] mr-2" />
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-500" style={{ fontFamily: "'Fira Code', monospace" }}>
                              Connected Tech
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-3 text-[10px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-2 text-neutral-500 group-hover:text-[#C3E41D]"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
