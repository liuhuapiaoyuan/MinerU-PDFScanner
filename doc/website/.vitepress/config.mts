import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'vitepress-carbon'
import baseConfig from 'vitepress-carbon/config'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  title: "MinerU-PDFScanner",
  description: "高效 PDF 文档扫描和提取工具",
  srcDir: 'src',
  base:"/MinerU-PDFScanner/" , 
  //base: '/vitepress-carbon-template/', if running on github-pages, set repository name here
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
    ],

    search: {
      provider: 'local'
    },
    
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/MinerU-PDFScanner' }
    ]
  }
})
