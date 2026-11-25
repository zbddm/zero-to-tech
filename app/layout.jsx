// app/layout.jsx 是 Next.js 的"全站外壳"——所有页面都套在它里面。
// 它取代了 4.4 的 index.html + main.jsx + App.jsx 最外面那层壳：
//   - <html>/<body> 由它提供；
//   - app-shell / page-shell / page-content 这层包裹，和 4.4 App.jsx 里一模一样；
//   - 4.4 main.jsx 里那 8 行 import CSS，原样搬到这里（顺序不变）。
// 注意：导航条 Nav 不在这儿，它在每一页的 hero 里（HomeView / TextLabView 各放一份），
// 这样整页布局和 4.4 完全一致。

import Script from "next/script";

import "../css/reset.css";
import "../css/variables.css";
import "../css/layout.css";
import "../css/hero.css";
import "../css/nav.css";
import "../css/cards.css";
import "../css/lab.css";
import "../css/responsive.css";

export const metadata = {
  title: "zero to tech",
  description: "个人主页 + 文字实验室",
};

// GTM 容器 ID。想换环境时可用环境变量 NEXT_PUBLIC_GTM_ID 覆盖，无需改代码。
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-ND446FNK";

// dataLayer 初始化：必须在使用 gtag()/dataLayer 之前执行。
const gtmInitScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`;

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 全站埋点：GTM 容器脚本，放在 body 最前面，所有页面共享 */}
        <Script id="gtm-init" strategy="afterInteractive">
          {gtmInitScript}
        </Script>
        <Script
          id="gtm-loader"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        {/* JS 被禁用时的兜底追踪（GTM 官方要求的 noscript 部分） */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>

        <div className="app-shell">
          <div className="page-shell">
            <main className="page-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
