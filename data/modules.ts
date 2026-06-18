export interface ImageItem {
  id: string;
  src: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  cover: string;
  count: number;
  images: ImageItem[];
}

const BASE = "/demo";

export const modules: Module[] = [
  {
    id: "home",
    title: "首页",
    cover: `${BASE}/images/home/data-panel.png`,
    count: 7,
    images: [
      { id: "home-1", src: `${BASE}/images/home/data-panel.png`, title: "数据面板" },
      { id: "home-2", src: `${BASE}/images/home/recent-view.png`, title: "最近查阅" },
      { id: "home-3", src: `${BASE}/images/home/recent-view-2.png`, title: "最近查阅（变体）" },
      { id: "home-4", src: `${BASE}/images/home/icon-grid.png`, title: "纯金刚位" },
      { id: "home-5", src: `${BASE}/images/home/icon-grid-orange.png`, title: "橙色主题金刚位" },
      { id: "home-6", src: `${BASE}/images/home/icon-grid-blue.png`, title: "蓝色主题金刚位" },
      { id: "home-7", src: `${BASE}/images/home/icon-grid-waterfall.png`, title: "金刚位瀑布流" },
    ],
  },
  {
    id: "sop",
    title: "SOP 详情",
    cover: `${BASE}/images/sop/overview.png`,
    count: 5,
    images: [
      { id: "sop-1", src: `${BASE}/images/sop/overview.png`, title: "概览" },
      { id: "sop-2", src: `${BASE}/images/sop/attachment.png`, title: "附件" },
      { id: "sop-3", src: `${BASE}/images/sop/pdf-preview.png`, title: "PDF 文件预览" },
      { id: "sop-4", src: `${BASE}/images/sop/docx-preview.png`, title: "Docx 文件预览" },
      { id: "sop-5", src: `${BASE}/images/sop/changelog.png`, title: "更新日志" },
    ],
  },
  {
    id: "search",
    title: "搜索",
    cover: `${BASE}/images/search/initial.png`,
    count: 2,
    images: [
      { id: "search-1", src: `${BASE}/images/search/initial.png`, title: "初始状态" },
      { id: "search-2", src: `${BASE}/images/search/results.png`, title: "搜索结果" },
    ],
  },
  {
    id: "standard",
    title: "门店作业标准",
    cover: `${BASE}/images/standard/standard.png`,
    count: 1,
    images: [
      { id: "standard-1", src: `${BASE}/images/standard/standard.png`, title: "门店作业标准" },
    ],
  },
  {
    id: "feedback",
    title: "问题反馈",
    cover: `${BASE}/images/feedback/initial.png`,
    count: 3,
    images: [
      { id: "feedback-1", src: `${BASE}/images/feedback/initial.png`, title: "初始状态" },
      { id: "feedback-2", src: `${BASE}/images/feedback/select.png`, title: "选择状态" },
      { id: "feedback-3", src: `${BASE}/images/feedback/echo.png`, title: "回显状态" },
    ],
  },
];
