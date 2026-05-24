import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Crimson_Pro,
  Atkinson_Hyperlegible,
} from "next/font/google";
import "./globals.css";

const display = Crimson_Pro({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Research Navigator — 科研工具导航站",
    template: "%s · Research Navigator",
  },
  description:
    "面向研究生与科研新人的工具导航：论文搜索、预印本、代码复现、开放数据、文献图谱、写作工具与数据集，原创整理。",
  applicationName: "Research Navigator",
  authors: [{ name: "Research Navigator" }],
  keywords: [
    "科研工具",
    "论文搜索",
    "预印本",
    "代码复现",
    "开放数据",
    "文献图谱",
    "写作工具",
    "数据集",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#07050c" },
  ],
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('rn-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='dark'||s==='light')?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <a href="#main" className="skip-link">
          跳到主内容
        </a>
        {children}
      </body>
    </html>
  );
}
