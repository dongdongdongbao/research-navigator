# Research Navigator

> 一个为研究生与科研新人整理的科研工具导航站。原创整理 · 零账号 · 零追踪。

**Live demo:** https://research-navigator-92jm.vercel.app

<!-- 截图占位：建议放 hero 暗色截图 + 卡片网格截图各一张 -->
<!-- ![Hero screenshot](./docs/screenshot-hero.png) -->
<!-- ![Cards screenshot](./docs/screenshot-cards.png) -->

---

## 这是什么

35 条原创整理的科研工具入口，覆盖论文搜索、预印本、代码复现、开放数据、文献图谱、数据集、写作工具七个分类。**所有描述均为原创撰写**，链接直跳原站，不复制官网内容、不爬虫、不储存用户行为。

定位是一个**简历项目 + 实用工具**：在做出能用的工具的同时，演示一套现代前端工程实践。

## 功能

- **URL 驱动的全状态可分享**：搜索关键词、分类、标签、抽屉打开的资源 ID 全部走 `?q=` `?cat=` `?tags=` `?id=`，刷新 / 后退 / 直接贴链接都能还原
- **本地搜索**：跨名称 / 英文名 / 描述 / 标签的关键词匹配，35 条数据无需 Fuse 等模糊搜索库
- **分类单选 + 标签多选组合筛选**：分类与标签语义分离，标签默认折叠避免视觉过载
- **分类分布条形图**：纯 CSS 横向条，点击条形等价于选中该分类（双重入口）
- **自建无障碍抽屉**：portal + focus trap + ESC / 遮罩关闭 + body scroll lock + `aria-modal` + reduced-motion，桌面右抽屉 / 移动端底部抽屉
- **暗黑 / 浅色 / 系统三态主题切换**：通过 inline `<head>` 脚本读 `localStorage` + `matchMedia` 提前写 `data-theme`，零 hydration 闪烁
- **View Transitions API**：分类切换时卡片走浏览器原生平滑重排（Chrome / Edge / Safari 18+），不支持的浏览器自动回退
- **完全响应式**：375px 起，桌面三列 / 平板二列 / 手机一列；抽屉在 ≥ 1024px 走右侧、否则底部
- **a11y 全程考虑**：跳到主内容 skip link、focus-visible 紫色 ring、ARIA 标签、`prefers-reduced-motion` 全局开关

## 视觉语言：Dark Research Lab

- 三色 aurora（violet `#8B5CF6` → blue `#3B82F6` → cyan `#22D3EE`）
- 玻璃拟态卡片（`backdrop-filter: blur(20px) saturate(160%)` + 顶部 1px 光照高亮）
- Hero 内自建 SVG 节点网络（12 节点 18 边，CSS keyframe 漂移，不引 Three.js）
- 双 gradient orb 缓慢漂浮做背景情绪
- Featured 卡片有 4 秒呼吸边光（reduced-motion 自动停）
- 字体三层：Crimson Pro（display serif）/ Atkinson Hyperlegible（无障碍 body sans）/ Geist Mono

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | [Next.js 16](https://nextjs.org) App Router（PPR + Suspense） |
| UI | [React 19](https://react.dev) + [Tailwind CSS v4](https://tailwindcss.com)（`@theme inline` + `@custom-variant dark`） |
| 类型 | TypeScript 5 (strict) |
| 字体 | Crimson Pro · Atkinson Hyperlegible · Geist Mono（`next/font/google`） |
| 状态 | URL search params + React `useSyncExternalStore` + `useDeferredValue`，无状态管理库 |
| 数据 | 本地 TypeScript 文件（35 条原创），构建期 schema 校验 |
| 动效 | CSS keyframes · View Transitions API · `prefers-reduced-motion` |
| 运行时依赖 | **0 个额外包**（仅 Next / React / Tailwind 自带） |

特意没有引入：shadcn/ui · Radix · Framer Motion · Fuse.js · lucide-react · D3 · Three.js — 所有效果用浏览器原生 API + 自建组件实现，约束自己也是工程信号。

## 项目结构

```
src/
├── app/                      # Next App Router (Server + Client islands)
├── components/
│   ├── ui/                   # 通用原语：badge / button / drawer / glass / icon
│   ├── layout/               # header / footer / theme-toggle
│   └── features/             # 业务复合：hero / filter-bar / resource-card …
├── data/                     # 类型化静态数据（categories / resources / tags）
├── lib/                      # 纯函数：filter / search / cn / validate-data
├── hooks/                    # use-theme / use-url-state / use-focus-trap / …
└── types.ts
```

## 快速开始

```bash
git clone https://github.com/dongdongdongbao/research-navigator.git
cd research-navigator
npm install
npm run dev
```

打开 http://localhost:3000。

Windows + Tailwind v4 用户如遇 `lightningcss.win32-x64-msvc.node` 缺失：
```bash
npm install --save-dev lightningcss-win32-x64-msvc
```

## 命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 开发模式（Turbopack） |
| `npm run build` | 生产构建（全静态预渲染） |
| `npm run start` | 启动生产构建 |
| `npm run lint` | ESLint（Next core-web-vitals + TypeScript） |

## 资源贡献

如果你认为有遗漏的优质科研工具值得收录，欢迎开 issue 提建议。所有条目必须是**原创描述**（不复制官网原文），并保持**链接直跳原站**的策略。

## License

[MIT](./LICENSE) © 2026 dongdongdongbao
