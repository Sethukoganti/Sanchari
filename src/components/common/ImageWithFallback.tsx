"use client";

import Image from "next/image";
import { useState } from "react";
import { getRandomFallbackImage } from "@/lib/images";
import clsx from "clsx";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  objectPosition?: string;
  quality?: number;
  blurDataURL?: string;
  onError?: () => void;
  showLocationText?: boolean;
  showIcon?: boolean;
  aspectRatio?: "square" | "video" | "custom";
}

/**
 * Image component with automatic fallback handling
 * Shows a beautiful gradient placeholder with location name if image fails to load
 * Implements proper Next.js Image optimization with blur-up effect
 */
export function ImageWithFallback({
  src,
  alt,
  title,
  width = 800,
  height = 600,
  className = "",
  containerClassName = "",
  priority = false,
  fill = false,
  objectFit = "cover",
  objectPosition = "center",
  quality = 75,
  blurDataURL,
  onError,
  showLocationText = false,
  showIcon = false,
  aspectRatio = "custom",
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    custom: "",
  }[aspectRatio];

  // Container classes for aspect ratio or custom sizing
  const containerClasses = clsx(
    "relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-300",
    aspectRatioClass,
    containerClassName
  );

  // Image wrapper for fill-based sizing
  if (fill || !width || !height) {
    return (
      <div className={containerClasses}>
        {!hasError ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              quality={quality}
              priority={priority}
              className={clsx(
                "transition-opacity duration-500",
                isLoading ? "opacity-0" : "opacity-100",
                className
              )}
              style={{
                objectFit: objectFit,
                objectPosition: objectPosition,
              }}
              onError={handleError}
              onLoadingComplete={handleLoadingComplete}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
            {/* Skeleton/Loading state */}
            {isLoading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
            )}
          </>
        ) : (
          <ErrorFallback
            locationName={title || alt}
            showText={showLocationText}
            showIcon={showIcon}
          />
        )}
      </div>
    );
  }

  // Fixed size image
  return (
    <div className={containerClasses}>
      {!hasError ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            className={clsx(
              "transition-opacity duration-500 h-full w-full",
              isLoading ? "opacity-0" : "opacity-100",
              className
            )}
            style={{
              objectFit: objectFit,
              objectPosition: objectPosition,
            }}
            onError={handleError}
            onLoadingComplete={handleLoadingComplete}
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Skeleton/Loading state */}
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
          )}
        </>
      ) : (
        <ErrorFallback
          locationName={title || alt}
          showText={showLocationText}
          showIcon={showIcon}
        />
      )}
    </div>
  );
}

/**
 * Fallback component shown when image fails to load
 */
function ErrorFallback({
  locationName,
  showText = false,
  showIcon = false,
}: {
  locationName: string;
  showText?: boolean;
  showIcon?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50 p-4 text-center">
      {showIcon && (
        <div className="mb-3 text-4xl">
          <span className="text-5xl">🏞️</span>
        </div>
      )}

      {showText && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Image not available
          </p>
          {locationName && (
            <p className="text-xs text-slate-600">{locationName}</p>
          )}
        </div>
      )}

      {/* Decorative element */}
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 400 300"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Decorative mountains */}
          <path
            d="M 0 200 L 100 100 L 200 150 L 300 80 L 400 200 L 400 300 L 0 300 Z"
            fill="currentColor"
            className="text-amber-400"
          />
          {/* Decorative sun */}
          <circle cx="100" cy="80" r="30" fill="currentColor" className="text-yellow-400" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for image placeholders
 */
export function ImageSkeleton({
  className = "",
  aspectRatio = "video",
}: {
  className?: string;
  aspectRatio?: "square" | "video" | "custom";
}) {
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    custom: "h-64",
  }[aspectRatio];

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse",
        aspectRatioClass,
        className
      )}
    >
      <div className="h-full w-full" />
    </div>
  );
}
