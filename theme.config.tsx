import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  docsRepositoryBase: "https://github.com/HausDAO/docs/blob/develop",
  logo: (
    <>
      <img src="/haus-logo-sm.png" width="50px" className="Header__logo" />
      <span className="Header__brand">DAOhaus v3 Docs</span>
    </>
  ),
  primaryHue: { light: 238, dark: 46 },
  project: {
    link: "https://github.com/HausDAO/docs",
  },
  chat: {
    link: "https://discord.gg/daohaus",
  },
  // banner: {
  //   key: "v3 Release",
  //   text: (
  //     <a href="https://daohaus.club" target="_blank">
  //       🎉 DAOHaus v3 is released. Read more →
  //     </a>
  //   ),
  // },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <div>{title}</div>;
      }
      if (title === "Hello") {
        return <>👋 {title}</>;
      }
      if (title === "DAO Operators") {
        return <>🚜 {title}</>;
      }
      if (title === "Developers") {
        return <>⚒️ {title}</>;
      }
      if (title === "v3 Upgrade") {
        return <>🚀 {title}</>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
  },
  feedback: {
    content: null,
  },
  footer: {
    text: "DAOhaus v3 Docs",
  },
  head: (
    <>
      <title>DAOhaus v3 Docs</title>
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
    </>
  ),
};

export default config;
