<script setup lang="ts">
import { ref, onMounted } from 'vue'

const length = ref(16)
const useUppercase = ref(true)
const useLowercase = ref(true)
const useNumbers = ref(true)
const useSymbols = ref(false)
const password = ref('')
const copied = ref(false)

const generatePassword = () => {
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  }

  let chars = ''
  if (useUppercase.value) chars += charset.uppercase
  if (useLowercase.value) chars += charset.lowercase
  if (useNumbers.value) chars += charset.numbers
  if (useSymbols.value) chars += charset.symbols

  if (chars === '') {
    password.value = ''
    return
  }

  let result = ''
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  password.value = result
  copied.value = false
}

const copyToClipboard = async () => {
  if (!password.value) return
  try {
    await navigator.clipboard.writeText(password.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // 降级处理
    const textarea = document.createElement('textarea')
    textarea.value = password.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

onMounted(() => {
  generatePassword()
})
</script>

<template>
  <div class="password-generator">
    <div class="output-container">
      <input type="text" :value="password" readonly class="password-output" />
      <button @click="copyToClipboard" class="copy-btn" :class="{ 'copied': copied }">
        {{ copied ? '已复制!' : '复制' }}
      </button>
    </div>

    <div class="controls">
      <div class="control-group length-control">
        <label>密码长度: <span>{{ length }}</span></label>
        <input type="range" v-model="length" min="4" max="64" />
      </div>

      <div class="options">
        <label class="checkbox-label">
          <input type="checkbox" v-model="useUppercase" /> 包含大写字母 (A-Z)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="useLowercase" /> 包含小写字母 (a-z)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="useNumbers" /> 包含数字 (0-9)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="useSymbols" /> 包含特殊符号 (!@#$)
        </label>
      </div>

      <button @click="generatePassword" class="generate-btn">
        重新生成密码
      </button>
    </div>
  </div>
</template>

<style scoped>
.password-generator {
  max-width: 500px;
  margin: 20px 0;
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.output-container {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.password-output {
  flex: 1;
  padding: 12px 16px;
  font-size: 1.2rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  outline: none;
  width: 100%;
}

.copy-btn {
  padding: 0 20px;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.copy-btn:hover {
  background-color: var(--vp-c-brand-2);
}

.copy-btn.copied {
  background-color: var(--vp-c-success-1, #10b981);
  color: white;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.control-group input[type="range"] {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.95rem;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
}

.generate-btn {
  width: 100%;
  padding: 14px;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.generate-btn:hover {
  background-color: var(--vp-c-brand-2);
}
</style>
