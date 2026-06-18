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

const BASE = process.env.NODE_ENV === "production" ? "/demo" : "";

export const modules: Module[] = [
  {
    id: "home",
    title: "首页",
    cover: `${BASE}/images/home/门店作业标准_数据面板@4x.png`,
    count: 7,
    images: [
      { id: "home-1", src: `${BASE}/images/home/门店作业标准_数据面板@4x.png`, title: "数据面板" },
      { id: "home-2", src: `${BASE}/images/home/门店作业标准_最近查阅@4x.png`, title: "最近查阅" },
      { id: "home-3", src: `${BASE}/images/home/门店作业标准_最近查阅@4x-2.png`, title: "最近查阅（变体）" },
      { id: "home-4", src: `${BASE}/images/home/门店作业标准_纯金刚位@4x.png`, title: "纯金刚位" },
      { id: "home-5", src: `${BASE}/images/home/门店作业标准_橙色主题_金刚位@4x.png`, title: "橙色主题金刚位" },
      { id: "home-6", src: `${BASE}/images/home/门店作业标准_蓝色主题_金刚位@4x.png`, title: "蓝色主题金刚位" },
      { id: "home-7", src: `${BASE}/images/home/门店作业标准_金刚位_瀑布流@4x.png`, title: "金刚位瀑布流" },
    ],
  },
  {
    id: "sop",
    title: "SOP 详情",
    cover: `${BASE}/images/sop/SOP详情_概览@4x.png`,
    count: 5,
    images: [
      { id: "sop-1", src: `${BASE}/images/sop/SOP详情_概览@4x.png`, title: "概览" },
      { id: "sop-2", src: `${BASE}/images/sop/SOP详情_附件@4x.png`, title: "附件" },
      { id: "sop-3", src: `${BASE}/images/sop/PDF-文件预览@4x.png`, title: "PDF 文件预览" },
      { id: "sop-4", src: `${BASE}/images/sop/docx-文件预览@4x.png`, title: "Docx 文件预览" },
      { id: "sop-5", src: `${BASE}/images/sop/更新日志@4x.png`, title: "更新日志" },
    ],
  },
  {
    id: "search",
    title: "搜索",
    cover: `${BASE}/images/search/搜索_初始状态@4x.png`,
    count: 2,
    images: [
      { id: "search-1", src: `${BASE}/images/search/搜索_初始状态@4x.png`, title: "初始状态" },
      { id: "search-2", src: `${BASE}/images/search/搜索_搜索结果@4x.png`, title: "搜索结果" },
    ],
  },
  {
    id: "standard",
    title: "门店作业标准",
    cover: `${BASE}/images/standard/门店作业标准@4x.png`,
    count: 1,
    images: [
      { id: "standard-1", src: `${BASE}/images/standard/门店作业标准@4x.png`, title: "门店作业标准" },
    ],
  },
  {
    id: "feedback",
    title: "问题反馈",
    cover: `${BASE}/images/feedback/问题反馈_初始@4x.png`,
    count: 3,
    images: [
      { id: "feedback-1", src: `${BASE}/images/feedback/问题反馈_初始@4x.png`, title: "初始状态" },
      { id: "feedback-2", src: `${BASE}/images/feedback/问题反馈_选择@4x.png`, title: "选择状态" },
      { id: "feedback-3", src: `${BASE}/images/feedback/问题反馈_回显@4x.png`, title: "回显状态" },
    ],
  },
];
