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
  const [showUI, setShowUI] = useState(true);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // 3秒后自动隐藏UI
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
    return () => {
      document.body.style.overflow = "";
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // 切换图片时滚回顶部
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [currentIndex]);

  const showUIBriefly = useCallback(() => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) setCurrentIndex(index);
    setTranslateX(0);
    setIsDragging(false);
    showUIBriefly();
  }, [images.length, showUIBriefly]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
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

  // 点击切换 UI 显示/隐藏
  const handleTap = () => {
    if (showUI) {
      setShowUI(false);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      showUIBriefly();
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
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* 顶部浮层（点击后临时出现） */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? "auto" : "none" }}
      >
        <span className="text-white text-sm font-medium truncate max-w-[200px]">{current.title}</span>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">{currentIndex + 1} / {images.length}</span>
          <button
            onClick={onClose}
            className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-white/20 active:bg-white/40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* 图片区域 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        onClick={handleTap}
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
          draggable={false}
        />
      </div>

      {/* 底部浮层指示点 */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5 transition-opacity duration-300"
          style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? "auto" : "none" }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-4 shadow-md" : "bg-white/50 w-1.5"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
