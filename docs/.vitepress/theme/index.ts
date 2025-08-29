import DefaultTheme from 'vitepress/theme'
import './custom.css'
import RecentList from './recent-list.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // @ts-ignore
    DefaultTheme.enhanceApp?.({ app })
    app.component('RecentList', RecentList)
  }
}


