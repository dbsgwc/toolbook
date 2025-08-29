<template>
  <div v-if="items.length">
    <ul>
      <li v-for="it in items" :key="it.link">
        <a :href="it.link">{{ it.title }}</a>
        <span class="recent-time">{{ format(it.updatedAt) }}</span>
      </li>
    </ul>
  </div>
  <div v-else>暂无更新记录</div>
  
</template>

<script setup lang="ts">
import recent from '../recent.json'

type Item = { title: string; link: string; updatedAt: string }
const items: Item[] = (recent?.items ?? []) as Item[]

function format(iso: string) {
  try {
    const d = new Date(iso)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch {
    return iso
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}
.recent-time {
  color: var(--vp-c-text-2);
  font-size: 12px;
}
</style>


