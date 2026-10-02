import { cn } from "@/lib/utils";
interface LogoIconProps {
  className?: string;
}

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <div
      className={cn(
        "relative rounded-full shadow-sm flex items-center justify-center transition-transform bg-white",
        className
      )}
      style={{
        // Tricolor ring: Right white, Bottom-left green, Top-left saffron
        background: "conic-gradient(from 0deg, #F1F5F9 0deg 180deg, #138808 180deg 270deg, #FF9933 270deg 360deg)",
        padding: "3px", // Thickness of the ring
      }}
    >
      <div className="bg-white rounded-full h-full w-full relative flex items-center justify-center overflow-hidden">
        {/* Ashoka Chakra */}
        <div className="absolute inset-0 flex items-center justify-center animate-[spin_8s_linear_infinite]">
          <svg
            viewBox="0 0 100 100"
            className="h-[75%] w-[75%] text-[#000080]"
            fill="none"
          >
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
