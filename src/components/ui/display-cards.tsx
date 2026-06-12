"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Trophy } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Trophy className="size-5" />,
  title = "Achievement",
  description = "Description goes here",
  date = "Date",
  iconClassName = "text-[#C3E41D]",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "display-card-element relative flex h-56 w-[22rem] sm:w-[28rem] -skew-y-[8deg] select-none flex-col justify-between border border-neutral-800 bg-neutral-950 px-6 py-6 transition-colors duration-700 group hover:border-[#C3E41D] [&>*]:flex [&>*]:items-center [&>*]:gap-3 shadow-[0_0_40px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {/* Brutalist terminal scanline on hover */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(195,228,29,0)_50%,rgba(195,228,29,0.02)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

      <div className="relative z-10 w-full justify-between items-start">
        <div className="flex items-center gap-4">
          <span className={cn("relative inline-flex items-center justify-center w-12 h-12 bg-black border border-neutral-800 transition-colors group-hover:bg-[#C3E41D] group-hover:text-black group-hover:border-[#C3E41D]", iconClassName)}>
            {icon}
          </span>
          <p 
            className={cn("text-xl md:text-2xl font-bold uppercase tracking-tight", titleClassName)}
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {title}
          </p>
        </div>
      </div>
      
      <p 
        className="text-lg text-neutral-400 leading-relaxed relative z-10 mt-4 whitespace-normal line-clamp-3"
        style={{ fontFamily: "'Antic', sans-serif" }}
      >
        {description}
      </p>
      
      <div className="relative z-10 mt-auto pt-4 flex justify-end w-full">
        <p 
          className="text-xs font-bold tracking-widest text-[#C3E41D] uppercase"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {date}
        </p>
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const displayCards = cards || [];

  return (
    <div className="display-cards-container grid [grid-template-areas:'stack'] place-items-center w-full h-[400px] md:h-[500px]">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
