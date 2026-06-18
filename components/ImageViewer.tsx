"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ImageItem } from "@/data/modules";

interface ImageViewerProps {
  images: ImageItem[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewer({ images, initialIndex, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
    setTranslateX(0);
    setIsDragging(false);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // 横向移动更明显时才跟手
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setTranslateX(dx);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0 && currentIndex < images.length - 1) {
        goTo(currentIndex + 1);
      } else if (dx > 0 && currentIndex > 0) {
        goTo(currentIndex - 1);
      } else {
        setTranslateX(0);
        setIsDragging(false);
      }
    } else {
      setTranslateX(0);
      setIsDragging(false);
    }
  };

  // 键盘支持
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, goTo, onClose]);

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col select-none"
      ref={containerRef}
    >
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 py-3 z-10 bg-black/60">
        <span className="text-white text-sm font-medium truncate max-w-[200px]">
          {current.title}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
            aria-label="关闭"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* 图片区域 */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging && Math.abs(translateX) > 0 ? "none" : "transform 0.25s ease",
          }}
        >
          <Image
            key={current.id}
            src={current.src}
            alt={current.title}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>

        {/* 左右切换按钮（平板/桌面可见） */}
        {currentIndex > 0 && (
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* 底部点指示器 */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-3 bg-black/60">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
