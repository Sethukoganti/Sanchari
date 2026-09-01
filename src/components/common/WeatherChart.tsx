"use client";

import { useState } from "react";
import { Sun, CloudRain, Thermometer, Calendar } from "lucide-react";
import type { MonthWeather } from "@/lib/types";
import { cn } from "@/lib/utils";

interface WeatherChartProps {
  destinationName: string;
  monthlyData: MonthWeather[];
}

export function WeatherChart({ destinationName, monthlyData }: WeatherChartProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(monthlyData[0]?.month || "Jan");

  const activeWeather = monthlyData.find((m) => m.month === selectedMonth) || monthlyData[0];

  const maxTemp = Math.max(...monthlyData.map((m) => m.tempHigh), 45);
  const maxRain = Math.max(...monthlyData.map((m) => m.rainfall), 400);

  return (
    <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-warm-white">
            12-Month Climate & Rainfall Chart
          </h3>
          <p className="text-xs text-muted-gray">
            Interactive seasonal climate breakdown for planning optimal travel dates in {destinationName}.
          </p>
        </div>

        {/* Selected Month Summary Card */}
        {activeWeather && (
          <div className="rounded-2xl border border-turmeric/30 bg-black/60 px-4 py-2 flex items-center gap-4">
            <div>
              <span className="font-display text-base font-bold text-warm-white">{activeWeather.month}</span>
              <p className="text-[11px] text-turmeric font-mono">{activeWeather.recommendation}</p>
            </div>
            <div className="text-right font-mono text-xs text-zinc-300">
              <div>{activeWeather.tempHigh}°C / {activeWeather.tempLow}°C</div>
              <div className="text-teal-400 text-[10px]">{activeWeather.rainfall} mm rain</div>
            </div>
          </div>
        )}
      </div>

      {/* Bar Chart Visualization */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-3 items-end h-48 pt-6 pb-2 border-b border-white/10">
        {monthlyData.map((m) => {
          const isSelected = m.month === selectedMonth;
          const tempHeight = Math.max((m.tempHigh / maxTemp) * 100, 15);
          const rainHeight = Math.max((m.rainfall / maxRain) * 100, 5);

          return (
            <button
              key={m.month}
              type="button"
              onClick={() => setSelectedMonth(m.month)}
              className="flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              {/* Rain indicator bar */}
              <div
                style={{ height: `${rainHeight}%` }}
                className={cn(
                  "w-1 sm:w-1.5 rounded-full mb-1 transition-all",
                  isSelected ? "bg-teal-400" : "bg-teal-500/30 group-hover:bg-teal-400/60"
                )}
                title={`${m.rainfall} mm rainfall`}
              />

              {/* Temp indicator bar */}
              <div
                style={{ height: `${tempHeight}%` }}
                className={cn(
                  "w-full rounded-t-lg transition-all flex flex-col justify-between py-1 items-center",
                  isSelected
                    ? "bg-gradient-to-t from-amber-600 to-turmeric shadow-lg shadow-turmeric/20"
                    : "bg-white/10 group-hover:bg-white/20"
                )}
              >
                <span className="text-[9px] font-mono font-bold text-black hidden sm:block">
                  {m.tempHigh}°
                </span>
              </div>

              <span
                className={cn(
                  "text-[10px] font-mono font-bold mt-2",
                  isSelected ? "text-turmeric" : "text-muted-gray group-hover:text-warm-white"
                )}
              >
                {m.month}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-muted-gray pt-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-turmeric inline-block" />
            <span>High Temperature (°C)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-1 rounded bg-teal-400 inline-block" />
            <span>Precipitation (mm)</span>
          </span>
        </div>
        <span className="font-mono text-[11px]">Click on any month to view detailed travel advisory</span>
      </div>
    </div>
  );
}

