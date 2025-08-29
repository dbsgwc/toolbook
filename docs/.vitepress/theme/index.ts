import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import RecentList from './recent-list.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h('div', { class: 'friend-links' }, [
        h('span', { class: 'friend-label' }, '友情链接：'),
        h('a', { href: 'https://cv.wat.ink/', target: '_blank', rel: 'noopener' }, 'CV')
      ])
    })
  },
  enhanceApp({ app }) {
    // @ts-ignore
    DefaultTheme.enhanceApp?.({ app })
    app.component('RecentList', RecentList)
  }
}


