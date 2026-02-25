---
title: 密码生成器
---

<script setup>
import PasswordGenerator from '../components/PasswordGenerator.vue'
</script>

# 密码生成器

随机密码生成器，在本地浏览器生成强密码，不经过服务器，安全可靠。

<PasswordGenerator />

## 为什么需要强密码？

1. **防爆破**：较长的密码（大于12位）能极大地增加暴力破解的难度。
2. **防字典攻击**：混合使用大小写字母、数字和特殊字符，能有效防止黑客使用常见单词字典进行攻击。
3. **不要复用密码**：在不同的网站和应用上使用不同的强密码，这样即使一个网站的数据泄露，其他账号依然安全。建议配合 1Password、Bitwarden、Enpass 等密码管理器使用。
