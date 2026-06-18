import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";

export default function HomePage() {
  const totalImages = modules.reduce((acc, m) => acc + m.count, 0);

  return (
    <div className="max-w-lg mx-auto pb-8">
      {/* 顶部 Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-bold text-gray-900">设计稿预览</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {modules.length} 个模块 · 共 {totalImages} 张图
        </p>
      </div>

      {/* 模块卡片网格 */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}
