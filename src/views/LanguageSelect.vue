<template>
  <div class="language-select">
    <van-nav-bar 
      :title="currentLangName" 
      left-arrow 
      @click-left="goBack" 
      fixed 
      placeholder 
    />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell
          v-for="lang in languages"
          :key="lang.code"
          :title="lang.name"
          :is-link="currentLang !== lang.code"
          @click="selectLanguage(lang.code)"
        >
          <template #icon>
            <span class="flag-icon">{{ lang.flag }}</span>
          </template>
          <template #right-icon>
            <van-icon 
              v-if="currentLang === lang.code" 
              name="success" 
              color="#1989fa" 
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n, languages } from '@/i18n'

const router = useRouter()
const { currentLang, setLanguage } = useI18n()

const currentLangName = computed(() => {
  const lang = languages.find(l => l.code === currentLang.value)
  return lang?.name || '繁體中文'
})

const selectLanguage = (code) => {
  setLanguage(code)
  router.back()
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.language-select {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 16px;
}

.flag-icon {
  font-size: 24px;
  margin-right: 12px;
  display: inline-block;
}
</style>

