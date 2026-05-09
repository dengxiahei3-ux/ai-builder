export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  image: string; // emoji for now
  pages: TemplatePage[];
}

export interface TemplatePage {
  slug: string;
  name: string;
  content: Record<string, any>;
}

const TEMPLATES: Template[] = [
  {
    id: "photography",
    name: "摄影作品集",
    description: "暗黑风格，大图展示，适合摄影师和设计师",
    category: "个人展示",
    color: "from-zinc-900 to-zinc-800",
    image: "📷",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "光影之间",
          subtitle: "捕捉每一个值得铭记的瞬间",
          heroImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
          features: ["人像摄影", "风光摄影", "商业摄影"],
          about: "十年专注摄影艺术，用镜头讲述属于你的故事。",
          contactEmail: "hello@example.com",
        },
      },
    ],
  },
  {
    id: "business",
    name: "企业官网",
    description: "专业商务风格，适合科技公司和服务型企业",
    category: "企业展示",
    color: "from-blue-700 to-blue-600",
    image: "🏢",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "创新科技 驱动未来",
          subtitle: "为您的企业提供一站式数字化解决方案",
          services: ["技术开发", "产品设计", "数字化转型"],
          about: "我们是一支充满激情的团队，致力于用技术改变世界。",
          contactEmail: "contact@company.com",
        },
      },
    ],
  },
  {
    id: "restaurant",
    name: "餐厅官网",
    description: "温暖风格，展示菜单和预订信息",
    category: "餐饮",
    color: "from-amber-700 to-amber-600",
    image: "🍽️",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "味觉之旅",
          subtitle: "用心做好每一道菜",
          specialties: ["招牌牛排", "手工意面", "精选红酒"],
          about: "选用最新鲜的食材，为您呈现最地道的味道。",
          contactEmail: "info@restaurant.com",
          address: "上海市静安区南京西路1000号",
        },
      },
    ],
  },
  {
    id: "portfolio",
    name: "个人简历",
    description: "极简干净，适合求职和自由职业者展示",
    category: "个人展示",
    color: "from-emerald-600 to-emerald-500",
    image: "👤",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "张三",
          subtitle: "全栈工程师 / 5年经验",
          skills: ["React / Next.js", "Node.js / Python", "UI/UX 设计"],
          about: "热爱技术，善于将复杂问题简单化。",
          contactEmail: "me@example.com",
        },
      },
    ],
  },
  {
    id: "landing",
    name: "产品落地页",
    description: "高转化率设计，适合新品发布和营销活动",
    category: "营销",
    color: "from-violet-600 to-violet-500",
    image: "🚀",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "重新定义效率",
          subtitle: "让你的团队效率提升 10 倍",
          highlights: ["简单易用", "安全可靠", "高性价比"],
          about: "我们打造的产品，让每一天的工作都更加轻松。",
          contactEmail: "sales@product.com",
        },
      },
    ],
  },
  {
    id: "ecommerce",
    name: "电商展示",
    description: "明亮简洁，适合展示产品和在线销售",
    category: "电商",
    color: "from-rose-600 to-rose-500",
    image: "🛍️",
    pages: [
      {
        slug: "home",
        name: "首页",
        content: {
          title: "优品生活馆",
          subtitle: "精选好物，品质生活",
          products: ["时尚服饰", "家居好物", "数码配件"],
          about: "我们用心挑选每一件商品，只为给你最好的体验。",
          contactEmail: "shop@example.com",
        },
      },
    ],
  },
];

export function getTemplates(): Template[] {
  return TEMPLATES;
}

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
