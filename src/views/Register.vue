<template>
  <div class="register-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="logo">
        <span class="logo-web3">WEB3</span>
        <span class="logo-text">LOGO</span>
      </div>
      <div class="header-right">
        <img :src="kfuIcon" class="service-icon" alt="客服" />
        <img
          :src="globeIcon"
          class="globe-icon"
          alt="语言"
          @click="showLanguageDialog = true"
        />
      </div>
    </div>

    <!-- 标题 -->
    <div class="title">
      <span>注册账户</span>
      <div class="login-link-top" @click="goToLogin">去登录</div>
    </div>

    <!-- 注册方式标签 -->
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'phone' }"
        @click="activeTab = 'phone'"
      >
        手机注册
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'email' }"
        @click="activeTab = 'email'"
      >
        邮箱注册
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'account' }"
        @click="activeTab = 'account'"
      >
        账号注册
      </div>
    </div>

    <!-- 手机注册表单 -->
    <div v-if="activeTab === 'phone'" class="form-container">
      <div class="input-group">
        <div class="country-selector" @click="showCountryPicker = true">
          <span class="country-code">+{{ selectedCountry.code }}</span>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
        <van-field
          v-model="phoneNumber"
          placeholder="手机"
          class="phone-input"
        />
      </div>

      <div class="verification-wrapper">
        <div
          class="input-group verification-group"
          :class="{ 'error-state': verificationError }"
        >
          <van-field
            v-model="verificationCode"
            placeholder=""
            class="verification-input"
            :class="{ error: verificationError }"
            @input="handleVerificationInput"
          />
          <div v-if="verificationError" class="error-message">
            *您的验证码错误请重试
          </div>
        </div>
        <button
          class="send-btn-separate"
          :class="{ disabled: countdown > 0 }"
          @click="handleSendCode"
          :disabled="countdown > 0"
        >
          {{ countdown > 0 ? `${countdown}S` : "发送" }}
        </button>
      </div>

      <div class="input-group">
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showPassword = !showPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group">
        <van-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="请再次输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showConfirmPassword = !showConfirmPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group invitation-group">
        <label class="invitation-label">
          <span>邀请码</span>
          <img :src="allowTopIcon" class="arrow-up-icon" alt="arrow-up" />
        </label>
        <van-field
          v-model="invitationCode"
          placeholder="输入邀请码 (选填)"
          class="invitation-input"
        />
      </div>
    </div>

    <!-- 邮箱注册表单 -->
    <div v-if="activeTab === 'email'" class="form-container">
      <div class="input-group" :class="{ 'error-state': emailError }">
        <van-field
          v-model="email"
          placeholder="请输入邮箱"
          class="email-input"
          @input="handleEmailInput"
        >
          <template #right-icon>
            <van-icon
              v-if="email"
              name="cross"
              class="clear-icon"
              @click="email = ''"
            />
          </template>
        </van-field>
        <div v-if="emailError" class="error-message">*请输入有效的邮箱号</div>
      </div>

      <div class="verification-wrapper">
        <div class="input-group verification-group">
          <van-field
            v-model="verificationCode"
            placeholder="请输入验证码"
            class="verification-input"
            @input="handleVerificationInput"
          />
        </div>
        <div class="captcha-image" @click="refreshCaptcha">
          <img :src="captchaImageUrl" alt="验证码" />
        </div>
      </div>

      <div class="input-group">
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showPassword = !showPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group">
        <van-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="请再次输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showConfirmPassword = !showConfirmPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group invitation-group">
        <label class="invitation-label">
          <span>邀请码</span>
          <img :src="allowTopIcon" class="arrow-up-icon" alt="arrow-up" />
        </label>
        <van-field
          v-model="invitationCode"
          placeholder="输入邀请码 (选填)"
          class="invitation-input"
        />
      </div>
    </div>

    <!-- 账号注册表单 -->
    <div v-if="activeTab === 'account'" class="form-container">
      <div class="input-group" :class="{ 'error-state': accountError }">
        <van-field
          v-model="account"
          placeholder="请输入账号"
          class="account-input"
          @input="handleAccountInput"
        />
        <div v-if="accountError" class="error-message">
          *请输入不低于8位的数字加字母
        </div>
      </div>

      <div class="verification-wrapper">
        <div class="input-group verification-group">
          <van-field
            v-model="verificationCode"
            placeholder="请输入验证码"
            class="verification-input"
            @input="handleVerificationInput"
          />
        </div>
        <div class="captcha-image" @click="refreshCaptcha">
          <img :src="captchaImageUrl" alt="验证码" />
        </div>
      </div>

      <div class="input-group">
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showPassword = !showPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group">
        <van-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="请再次输入密码"
          class="password-input"
        >
          <template #right-icon>
            <img
              :src="passwordIcon"
              @click="showConfirmPassword = !showConfirmPassword"
              class="eye-icon"
              alt="password"
            />
          </template>
        </van-field>
      </div>

      <div class="input-group invitation-group">
        <label class="invitation-label">
          <span>邀请码</span>
          <img :src="allowTopIcon" class="arrow-up-icon" alt="arrow-up" />
        </label>
        <van-field
          v-model="invitationCode"
          placeholder="输入邀请码 (选填)"
          class="invitation-input"
        />
      </div>
    </div>

    <!-- 协议同意 -->
    <div class="agreement">
      <van-checkbox v-model="agreed" shape="square" />
      <div class="agreement-text">
        请确保您的账户安全,当您确定注册并登录时,即表示您同意使用我们的
        <span class="link" @click="openTerms">《服务条款》</span>
        <span class="link" @click="openPrivacy">《隐私协议》</span>
        和
        <span class="link" @click="openAntiMoneyLaundering"
          >《反洗钱协议》</span
        >
      </div>
    </div>

    <!-- 注册按钮 -->
    <div class="button-group">
      <van-button
        type="primary"
        block
        class="register-btn"
        @click="handleRegister"
      >
        立即注册
      </van-button>
    </div>

    <!-- 国家选择器 -->
    <van-popup
      v-model:show="showCountryPicker"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="country-picker">
        <div class="picker-header">
          <div class="picker-title">选择国家/地区</div>
          <van-icon
            name="cross"
            class="close-icon"
            @click="showCountryPicker = false"
          />
        </div>
        <div class="country-list">
          <div
            v-for="country in countries"
            :key="country.code"
            class="country-item"
            :class="{ active: selectedCountry.code === country.code }"
            @click="selectCountry(country)"
          >
            <span class="country-name">{{ country.name }}</span>
            <span class="country-code-text">({{ country.code }})</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 语言选择对话框 -->
    <van-popup
      v-model:show="showLanguageDialog"
      position="right"
      :style="{ width: '100%', height: '100%', overflow: 'visible' }"
      class="language-popup"
    >
      <div class="language-dialog">
        <div class="dialog-header">
          <div class="tabs-container">
            <div
              class="tab-item"
              :class="{ active: languageTab === 'language' }"
              @click="languageTab = 'language'"
            >
              <span class="tab-text">语言和地区</span>
              <div
                class="tab-indicator"
                v-if="languageTab === 'language'"
              ></div>
            </div>
            <div
              class="tab-item"
              :class="{ active: languageTab === 'exchange' }"
              @click="languageTab = 'exchange'"
            >
              <span class="tab-text">汇率</span>
              <div
                class="tab-indicator"
                v-if="languageTab === 'exchange'"
              ></div>
            </div>
          </div>
          <div class="close-btn" @click="showLanguageDialog = false">
            <img :src="closeIcon" class="close-icon" alt="close" />
          </div>
        </div>
        <div class="dialog-content">
          <div v-if="languageTab === 'language'" class="language-list">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="language-item"
              :class="{ active: currentLang === lang.code }"
              @click="selectLanguage(lang.code)"
            >
              <img :src="lang.flag" class="flag-icon" alt="" />
              <span class="language-name">{{ lang.name }}</span>
              <van-icon
                v-if="currentLang === lang.code"
                name="success"
                class="check-icon"
              />
            </div>
          </div>
          <div v-else class="exchange-content">
            <div class="exchange-placeholder">汇率内容</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import kfuIcon from "@/assets/images/kfu.svg";
import globeIcon from "@/assets/images/diqiu.svg";
import passwordIcon from "@/assets/image/password.svg";
import allowTopIcon from "@/assets/image/allow_top.svg";
import closeIcon from "@/assets/image/close.svg";

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();

const activeTab = ref("phone");
const phoneNumber = ref("");
const email = ref("");
const account = ref("");
const verificationCode = ref("");
const password = ref("");
const confirmPassword = ref("");
const invitationCode = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const agreed = ref(false);
const showCountryPicker = ref(false);
const showLanguageDialog = ref(false);
const languageTab = ref("language");
const verificationError = ref(false);
const emailError = ref(false);
const accountError = ref(false);
const countdown = ref(0);
let countdownTimer = null;

// 验证码图片URL（这里使用模拟数据，实际应该从API获取）
const captchaImageUrl = ref(
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40'%3E%3Crect width='120' height='40' fill='%233c404b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23fff'%3E5131%3C/text%3E%3C/svg%3E"
);

const refreshCaptcha = () => {
  // TODO: 刷新验证码图片
  console.log("刷新验证码");
};

// 国家列表
const countries = ref([
  { code: "1", name: "美国" },
  { code: "7", name: "俄罗斯" },
  { code: "20", name: "埃及" },
  { code: "27", name: "南非" },
  { code: "30", name: "希腊" },
  { code: "31", name: "荷兰" },
  { code: "32", name: "比利时" },
  { code: "33", name: "法国" },
  { code: "34", name: "西班牙" },
  { code: "36", name: "匈牙利" },
  { code: "39", name: "意大利" },
  { code: "40", name: "罗马尼亚" },
  { code: "41", name: "瑞士" },
  { code: "44", name: "英国" },
  { code: "49", name: "德国" },
  { code: "52", name: "墨西哥" },
  { code: "55", name: "巴西" },
  { code: "60", name: "马来西亚" },
  { code: "61", name: "澳大利亚" },
  { code: "62", name: "印度尼西亚" },
  { code: "63", name: "菲律宾" },
  { code: "64", name: "新西兰" },
  { code: "65", name: "新加坡" },
  { code: "66", name: "泰国" },
  { code: "81", name: "日本" },
  { code: "82", name: "韩国" },
  { code: "84", name: "越南" },
  { code: "86", name: "中国" },
  { code: "90", name: "土耳其" },
  { code: "91", name: "印度" },
  { code: "92", name: "巴基斯坦" },
  { code: "93", name: "阿富汗" },
  { code: "94", name: "斯里兰卡" },
  { code: "95", name: "缅甸" },
  { code: "98", name: "伊朗" },
  { code: "212", name: "摩洛哥" },
  { code: "213", name: "阿尔及利亚" },
  { code: "216", name: "突尼斯" },
  { code: "218", name: "利比亚" },
  { code: "220", name: "冈比亚" },
  { code: "221", name: "塞内加尔" },
  { code: "222", name: "毛里塔尼亚" },
  { code: "223", name: "马里" },
  { code: "224", name: "几内亚" },
  { code: "225", name: "科特迪瓦" },
  { code: "226", name: "布基纳法索" },
  { code: "227", name: "尼日尔" },
  { code: "228", name: "多哥" },
  { code: "229", name: "贝宁" },
  { code: "230", name: "毛里求斯" },
  { code: "231", name: "利比里亚" },
  { code: "232", name: "塞拉利昂" },
  { code: "233", name: "加纳" },
  { code: "234", name: "尼日利亚" },
  { code: "235", name: "乍得" },
  { code: "236", name: "中非共和国" },
  { code: "237", name: "喀麦隆" },
  { code: "238", name: "佛得角" },
  { code: "243", name: "刚果民主共和国" },
  { code: "244", name: "安哥拉" },
  { code: "245", name: "几内亚比绍" },
  { code: "246", name: "英属印度洋领地" },
  { code: "247", name: "阿森松岛" },
  { code: "248", name: "塞舌尔" },
  { code: "249", name: "苏丹" },
  { code: "250", name: "卢旺达" },
  { code: "251", name: "埃塞俄比亚" },
  { code: "252", name: "索马里" },
  { code: "253", name: "吉布提" },
  { code: "254", name: "肯尼亚" },
  { code: "255", name: "坦桑尼亚" },
  { code: "256", name: "乌干达" },
  { code: "257", name: "布隆迪" },
  { code: "258", name: "莫桑比克" },
  { code: "260", name: "赞比亚" },
  { code: "261", name: "马达加斯加" },
  { code: "262", name: "留尼汪" },
  { code: "263", name: "津巴布韦" },
  { code: "264", name: "纳米比亚" },
  { code: "265", name: "马拉维" },
  { code: "266", name: "莱索托" },
  { code: "267", name: "博茨瓦纳" },
  { code: "268", name: "斯威士兰" },
  { code: "269", name: "科摩罗" },
  { code: "290", name: "圣赫勒拿" },
  { code: "291", name: "厄立特里亚" },
  { code: "297", name: "阿鲁巴" },
  { code: "298", name: "法罗群岛" },
  { code: "299", name: "格陵兰" },
  { code: "350", name: "直布罗陀" },
  { code: "351", name: "葡萄牙" },
  { code: "352", name: "卢森堡" },
  { code: "353", name: "爱尔兰" },
  { code: "354", name: "冰岛" },
  { code: "355", name: "阿尔巴尼亚" },
  { code: "356", name: "马耳他" },
  { code: "357", name: "塞浦路斯" },
  { code: "358", name: "芬兰" },
  { code: "359", name: "保加利亚" },
  { code: "370", name: "立陶宛" },
  { code: "371", name: "拉脱维亚" },
  { code: "372", name: "爱沙尼亚" },
  { code: "373", name: "摩尔多瓦" },
  { code: "374", name: "亚美尼亚" },
  { code: "375", name: "白俄罗斯" },
  { code: "376", name: "安道尔" },
  { code: "377", name: "摩纳哥" },
  { code: "378", name: "圣马力诺" },
  { code: "379", name: "梵蒂冈" },
  { code: "380", name: "乌克兰" },
  { code: "381", name: "塞尔维亚" },
  { code: "382", name: "黑山" },
  { code: "383", name: "科索沃" },
  { code: "385", name: "克罗地亚" },
  { code: "386", name: "斯洛文尼亚" },
  { code: "387", name: "波斯尼亚和黑塞哥维那" },
  { code: "389", name: "北马其顿" },
  { code: "420", name: "捷克" },
  { code: "421", name: "斯洛伐克" },
  { code: "423", name: "列支敦士登" },
  { code: "431", name: "科威特" },
  { code: "432", name: "巴林" },
  { code: "433", name: "卡塔尔" },
  { code: "434", name: "也门" },
  { code: "436", name: "奥地利" },
  { code: "437", name: "塞浦路斯北部" },
  { code: "441", name: "英国" },
  { code: "442", name: "英国" },
  { code: "443", name: "英国" },
  { code: "444", name: "英国" },
  { code: "446", name: "英国" },
  { code: "447", name: "英国" },
  { code: "449", name: "英国" },
  { code: "450", name: "韩国" },
  { code: "451", name: "新加坡" },
  { code: "852", name: "香港" },
  { code: "853", name: "澳门" },
  { code: "855", name: "柬埔寨" },
  { code: "856", name: "老挝" },
  { code: "960", name: "马尔代夫" },
  { code: "961", name: "黎巴嫩" },
  { code: "962", name: "约旦" },
  { code: "963", name: "叙利亚" },
  { code: "971", name: "阿联酋" },
  { code: "972", name: "以色列" },
]);

// 默认选择香港
const selectedCountry = ref(
  countries.value.find((c) => c.code === "852") || countries.value[0]
);

const selectCountry = (country) => {
  selectedCountry.value = country;
  showCountryPicker.value = false;
};

const handleSendCode = () => {
  if (countdown.value > 0) return;

  // 验证手机号或邮箱
  if (activeTab.value === "phone" && !phoneNumber.value) {
    return;
  }
  if (activeTab.value === "email" && !email.value) {
    return;
  }

  // TODO: 发送验证码API调用
  console.log("发送验证码", {
    type: activeTab.value,
    phone: phoneNumber.value,
    email: email.value,
  });

  // 开始倒计时
  countdown.value = 59;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }, 1000);
};

const handleVerificationInput = () => {
  // 清除错误状态
  if (verificationError.value) {
    verificationError.value = false;
  }
};

const handleEmailInput = () => {
  // 清除邮箱错误状态
  if (emailError.value) {
    emailError.value = false;
  }
  // 简单的邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = true;
  }
};

const handleAccountInput = () => {
  // 清除账号错误状态
  if (accountError.value) {
    accountError.value = false;
  }
  // 验证账号：不低于8位的数字加字母
  const accountRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
  if (account.value && !accountRegex.test(account.value)) {
    accountError.value = true;
  }
};

const handleRegister = () => {
  if (!agreed.value) {
    // TODO: 显示提示
    return;
  }

  // 验证表单
  if (activeTab.value === "phone" && !phoneNumber.value) {
    return;
  }
  if (activeTab.value === "email" && !email.value) {
    return;
  }
  if (activeTab.value === "account" && !account.value) {
    return;
  }
  if (!password.value || !confirmPassword.value) {
    return;
  }
  if (password.value !== confirmPassword.value) {
    return;
  }

  // TODO: 实现注册逻辑
  console.log("注册", {
    type: activeTab.value,
    phone: phoneNumber.value,
    email: email.value,
    account: account.value,
    password: password.value,
    invitationCode: invitationCode.value,
    countryCode: selectedCountry.value.code,
  });
};

const goToLogin = () => {
  router.push("/login");
};

const openTerms = () => {
  router.push("/terms-of-service");
};

const openPrivacy = () => {
  router.push("/privacy-policy");
};

const openAntiMoneyLaundering = () => {
  router.push("/anti-money-laundering");
};

const currentLangName = computed(() => {
  const lang = languages.find((l) => l.code === currentLang.value);
  return (
    lang?.name || languages.find((l) => l.code === "zh-TW")?.name || "繁體中文"
  );
});

const selectLanguage = (code) => {
  setLanguage(code);
  showLanguageDialog.value = false;
};

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  background: #070210;
  padding: 0 32px;
  padding-bottom: 40px;
  color: #f3f4f6;
  font-family: "PT Sans Caption";
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 26px;

  .logo {
    display: flex;
    align-items: center;

    .logo-web3 {
      color: #00ff88;
      font-size: 40px;
      font-weight: 700;
    }

    .logo-text {
      color: #fff;
      font-size: 40px;
      font-weight: 700;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .service-icon {
      width: 28px;
      height: 32px;
      cursor: pointer;
      filter: brightness(0) invert(1);
    }

    .globe-icon {
      width: 30px;
      height: 30px;
      cursor: pointer;
      filter: brightness(0) invert(1);
    }
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 68px;
  margin-bottom: 24px;
  color: #fff;
  font-family: "PingFang SC";
  font-size: 40px;
  font-weight: 600;
  line-height: normal;

  .login-link-top {
    color: #1df388;
    font-family: "PingFang SC";
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
  }
}

.tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 73px;

  .tab {
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
    padding: 0 16px;
    height: 46.8px;
    line-height: 46.8px;
    color: #6a6a6a;
    font-family: "PingFang SC";
    font-size: 28px;
    font-weight: 500;

    &.active {
      color: #fff;
      font-weight: 500;

      &::after {
        content: "";
        position: absolute;
        bottom: -13px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 6px;
        background-color: #00ff88;
      }
    }
  }
}

.form-container {
  margin-top: 24px;
}

.input-group {
  display: flex;
  align-items: center;
  // margin-bottom: 20px;
  margin-top: 98px;
  overflow: hidden;
  width: 686px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid #3c404b;
  background: #181a1e;
  position: relative;

  .country-selector {
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    min-width: 80px;
    background-color: transparent;

    .country-code {
      color: #f3f4f6;
      text-align: right;
      font-family: "PingFang SC";
      font-size: 24px;
      font-weight: 500;
      margin-right: 4px;
    }

    .arrow-icon {
      font-size: 14px;
      color: #fff;
    }
  }

  &.verification-group {
    .verification-input {
      flex: 1;
    }

    .error-message {
      position: absolute;
      bottom: -30px;
      left: 0;
      color: #ff4444;
      font-size: 20px;
      font-family: "PingFang SC";
    }

    &.error-state {
      border-color: #ff4444;
    }

    .verification-input.error {
      :deep(.van-field__control) {
        color: #fff !important;
      }
    }
  }

  .error-message {
    position: absolute;
    bottom: -30px;
    left: 0;
    color: #ff4444;
    font-size: 20px;
    font-family: "PingFang SC";
  }

  &.error-state {
    border-color: #ff4444;
  }

  .clear-icon {
    font-size: 20px;
    color: #6c6c6c;
    cursor: pointer;
    padding: 4px;
  }

  &.invitation-group {
    margin-top: 130px;
    overflow: visible;
  }

  .invitation-label {
    position: absolute;
    top: -75px;
    left: 0;
    color: #fff;
    font-family: "PingFang SC";
    font-size: 24px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 1;

    .arrow-up-icon {
      width: 14px;
      height: 8px;
      display: inline-block;
    }
  }

  :deep(.van-field) {
    padding: 12px 16px;
    background-color: transparent;
    flex: 1;

    .van-field__control {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 28px;
      font-weight: 400;

      &::placeholder {
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-weight: 400;
      }
    }
  }

  .phone-input {
    flex: 1;
  }

  .password-input {
    flex: 1;

    .eye-icon {
      cursor: pointer;
      width: 36px;
      height: 22px;
    }
  }

  .invitation-input {
    flex: 1;
  }
}

.verification-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 60px;
  margin-bottom: 20px;

  .input-group {
    margin-top: 0;
    flex: 1;
  }

  .send-btn-separate {
    width: 222px;
    height: 90px;
    background: #181a1e;
    border-radius: 10px;
    border: 1px solid #5c5c5c;
    color: #eee;
    font-family: "PingFang SC";
    font-size: 28px;
    font-style: normal;
    font-weight: 500;

    &.disabled {
      color: #6c6c6c;
      cursor: not-allowed;
    }
  }

  .captcha-image {
    width: 120px;
    height: 90px;
    border-radius: 10px;
    border: 1px solid #3c404b;
    background: #181a1e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.agreement {
  display: flex;
  align-items: flex-start;
  margin-top: 57px;
  margin-bottom: 60px;
  gap: 8px;

  :deep(.van-checkbox) {
    margin-top: 2px;
    width: 40px;
    height: 40px;
  }

  :deep(.van-checkbox__icon) {
    width: 40px;
    height: 40px;
    border-color: #00ff88;
    background-color: transparent;
  }

  :deep(.van-checkbox__icon--checked) {
    background-color: #00ff88;
    border-color: #00ff88;
  }

  .agreement-text {
    flex: 1;
    color: #919191;
    font-family: "PingFang SC";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    .link {
      color: #e8e8e8;
      cursor: pointer;
    }
  }
}

.button-group {
  margin-top: 32px;
  margin-bottom: 24px;

  .register-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 686px;
    height: 90px;
    border-radius: 10px;
    background: #1df388;
    color: #121212;
    font-family: "PingFang SC";
    font-size: 30px;
    font-weight: 500;
    border: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.country-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a0d2e 0%, #0d0519 100%);

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .picker-title {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 38px;
      font-style: normal;
      font-weight: 500;
    }

    .close-icon {
      width: 30px;
      height: 30px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .country-list {
    flex: 1;
    overflow-y: auto;

    .country-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      transition: background-color 0.2s;

      &:active {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background-color: rgba(0, 255, 136, 0.2);
        color: #fff;

        .country-code-text {
          color: #00ff88;
        }
        .country-name {
          color: #fff;
        }
      }

      .country-name {
        font-size: 14px;
        color: #fff;
      }

      .country-code-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}

// 语言选择对话框
.language-popup {
  overflow: visible !important;

  :deep(.van-popup) {
    overflow: visible !important;
  }

  :deep(.van-popup__content) {
    overflow: visible !important;
    animation: slideInFromRight 0.3s ease-out;
    will-change: transform;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.language-dialog {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #17181a;
  position: relative;
  overflow: visible;

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #17181a;
    border-bottom: 1px solid #3b414e;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    padding: 70px 32px 0 32px;
    width: 686px;
    margin: 0 auto;
    .tabs-container {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 60px;
      flex: 1;

      .tab-item {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 72px;
        // padding-bottom: 8px;

        .tab-text {
          transition: color 0.3s;
          color: #fff;
          font-family: "PingFang SC";
          font-size: 28px;
          font-style: normal;
          font-weight: 500;
          line-height: 1;
        }

        &.active .tab-text {
          color: #ffffff;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 6px;
          background-color: #1df388;
        }
      }
    }

    .close-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;

      .close-icon {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
  }

  .dialog-content {
    flex: 1;
    overflow-y: auto;
    padding: 52px 32px 0 32px;
    position: relative;
    z-index: 1;
    background: #17181a;

    .language-list {
      padding: 0;

      .language-item {
        display: flex;
        align-items: center;
        padding: 26px 16px;
        // border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        transition: background-color 0.2s;
        background-color: transparent;

        &:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        &.active {
          width: 686px;
          height: 90px;
          border-radius: 6px;
          background: #212327;
        }

        .flag-icon {
          width: 34px;
          height: 26px;
          flex-shrink: 0;
          margin-right: 13px;
          display: block;
          object-fit: cover;
        }

        .language-name {
          flex: 1;
          color: #fff;
          font-family: "PingFang SC";
          font-size: 28px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .check-icon {
          font-size: 40px;
          color: #00ff88;
          flex-shrink: 0;
        }
      }
    }

    .exchange-content {
      padding: 24px 16px;
      color: #ffffff;
      text-align: center;

      .exchange-placeholder {
        color: #888888;
        font-size: 16px;
      }
    }
  }
}
</style>
