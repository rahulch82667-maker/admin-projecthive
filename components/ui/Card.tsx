import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl
        border border-white/20 dark:border-zinc-800/50
        rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
        overflow-hidden ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
