import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'vitepress-carbon'
import baseConfig from 'vitepress-carbon/config'
import mdItCustomAttrs from 'markdown-it-custom-attrs'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': "gallery"
      })
    }
  },
  head: [
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
  ],
  extends: baseConfig,
  title: "MinerU-PDFScanner",
  description: "高效 PDF 文档扫描和提取工具",
  srcDir: 'src',
  base: "/MinerU-PDFScanner/",
  //base: '/vitepress-carbon-template/', if running on github-pages, set repository name here
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '更新日志', link: '/changelogs' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: '更新日志',
        items: [
          { text: '更新日志', link: '/changelogs' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/MinerU-PDFScanner' }
    ]
  }
})
