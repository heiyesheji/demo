import Link from "next/link";
import { Module } from "@/data/modules";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      href={`/${module.id}`}
      className="group block rounded-2xl overflow-hidden bg-gray-100 active:scale-95 transition-transform duration-150"
    >
      {/* 封面图 */}
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={module.cover}
          alt={module.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 图片数量角标 */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
          {module.count} 张
        </div>
      </div>
      {/* 模块名称 */}
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-gray-800 truncate">{module.title}</p>
      </div>
    </Link>
  );
}
