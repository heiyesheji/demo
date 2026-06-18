import { notFound } from "next/navigation";
import Link from "next/link";
import { modules } from "@/data/modules";
import ThumbnailGrid from "@/components/ThumbnailGrid";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export async function generateStaticParams() {
  return modules.map((m) => ({ module: m.id }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleId } = await params;
  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) {
    notFound();
  }

  return (
    <div className="max-w-lg mx-auto pb-8">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-4">
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="返回"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <div>
            <h1 className="text-base font-bold text-gray-900">{mod.title}</h1>
            <p className="text-xs text-gray-400">{mod.count} 张设计稿</p>
          </div>
        </div>
      </div>

      {/* 缩略图网格 */}
      <ThumbnailGrid images={mod.images} />
    </div>
  );
}
