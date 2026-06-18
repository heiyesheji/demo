"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // 切换图片时滚动回顶部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) setCurrentIndex(index);
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
    // 只有明显横向滑动才拦截，避免影响上下滚动
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      e.preventDefault();
      setTranslateX(dx);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0 && currentIndex < images.length - 1) goTo(currentIndex + 1);
      else if (dx > 0 && currentIndex > 0) goTo(currentIndex - 1);
      else { setTranslateX(0); setIsDragging(false); }
    } else {
      setTranslateX(0);
      setIsDragging(false);
    }
  };

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
    <div className="fixed inset-0 z-50 bg-black flex flex-col select-none">
      {/* 顶部栏 */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm">
        <span className="text-white text-sm font-medium truncate max-w-[200px]">{current.title}</span>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">{currentIndex + 1} / {images.length}</span>
          <button
            onClick={onClose}
            className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-white/10 active:bg-white/30 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* 图片滚动区域 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging && Math.abs(translateX) > 0 ? "none" : "transform 0.25s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.id}
          src={current.src}
          alt={current.title}
          className="w-full h-auto block"
        />
      </div>

      {/* 底部点指示器 */}
      {images.length > 1 && (
        <div className="flex-shrink-0 flex justify-center gap-1.5 py-3 bg-black/80 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-4" : "bg-white/40 w-1.5"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
