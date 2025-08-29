import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  base,
  title: 'ToolBook',
  description: '命令速查小册 · pm2 / docker / nvm 等常用工具命令与实践',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'ToolBook',
    nav: [
      { text: '首页', link: '/' },
      { text: '技术选型', link: '/guide/stack' },
      { text: 'PM2', link: '/tools/pm2' },
      { text: 'Docker', link: '/tools/docker' },
      { text: 'NVM', link: '/tools/nvm' },
      { text: 'Git', link: '/tools/git' },
      { text: 'PNPM', link: '/tools/pnpm' }
    ],
    sidebar: {
      '/tools/': [
        { text: 'PM2', link: '/tools/pm2' },
        { text: 'Docker', link: '/tools/docker' },
        { text: 'NVM', link: '/tools/nvm' },
        { text: 'Git', link: '/tools/git' },
        { text: 'PNPM', link: '/tools/pnpm' }
      ],
      '/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/' },
            { text: '技术选型', link: '/guide/stack' }
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    },
    outline: 'deep',
    footer: {
      message: 'Released under MIT License',
      copyright: '© 2025 ToolBook'
    },
    editLink: {
      pattern: 'https://github.com/dbsgwc/toolbook/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbsgwc/toolbook' }
    ]
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
})


