<template>
  <div class="login-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="logo">
        <span class="logo-web3">WEB3</span>
        <span class="logo-text">LOGO</span>
      </div>
      <div class="header-icons">
        <img :src="kfuIcon" class="service-icon" alt="客服" />
        <img
          :src="globeIcon"
          class="globe-icon"
          alt="语言"
          @click="showLanguageDialog = true"
        />
      </div>
    </div>

    <!-- 欢迎标题区域 -->
    <div class="welcome-section">
      <div class="welcome-title">
        <div class="welcome-text">
          <span class="welcome-text-title">
            {{ t("welcomeToWeb3") }}
          </span>
          <span class="welcome-text-prompt">
            {{ t("pleaseLogin") }}
          </span>
        </div>
      </div>
      <div class="register-link-top" @click="goToRegister">
        {{ t("goToRegister") }}
      </div>
    </div>

    <!-- 徽章 -->
    <!-- <div class="badge">1749</div> -->

    <!-- 登录方式标签 -->
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'phone' }"
        @click="activeTab = 'phone'"
      >
        {{ t("phone") }}
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'email' }"
        @click="activeTab = 'email'"
      >
        {{ t("emailAccount") }}
      </div>
    </div>

    <!-- 手机登录表单 -->
    <div v-if="activeTab === 'phone'" class="form-container">
      <div class="input-group">
        <div class="country-selector" @click="showCountryPicker = true">
          <span class="country-code">+{{ selectedCountry.code }}</span>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
        <van-field
          v-model="phoneNumber"
          :placeholder="t('phone')"
          class="phone-input"
        />
      </div>

      <div class="input-group">
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="t('enterPassword')"
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

      <div class="forgot-password">
        <span @click="handleForgotPassword">{{ t("forgotPassword") }}</span>
      </div>
    </div>

    <!-- 邮箱登录表单 -->
    <div v-if="activeTab === 'email'" class="form-container">
      <div class="input-group">
        <van-field
          v-model="emailOrAccount"
          :placeholder="t('enterEmailAccount')"
          class="email-input"
        />
      </div>

      <div class="input-group">
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="t('enterPassword')"
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

      <div class="forgot-password">
        <span @click="handleForgotPassword">{{ t("forgotPassword") }}</span>
      </div>
    </div>

    <!-- 登录按钮 -->
    <div class="button-group">
      <van-button type="primary" block class="login-btn" @click="handleLogin">
        {{ t("loginNow") }}
      </van-button>
    </div>

    <!-- 钱包登录分隔线 -->
    <div class="wallet-divider">
      <span class="divider-text">{{ t("orConnectWallet") }}</span>
    </div>

    <!-- 钱包连接列表 -->
    <div class="wallet-list">
      <div
        v-for="wallet in wallets"
        :key="wallet.id"
        class="wallet-item"
        :class="{ active: selectedWallet === wallet.id }"
        @click="handleWalletSelect(wallet.id)"
      >
        <img :src="wallet.icon" :alt="wallet.name" class="wallet-icon" />
        <span class="wallet-name">{{ wallet.name }}</span>
        <van-icon
          name="link"
          class="wallet-link-icon"
          v-if="wallet.id === 'coinbase'"
        />
      </div>
      <div class="wallet-item more-wallets" @click="handleMoreWallets">
        <van-icon name="link" class="wallet-link-icon" />
        <span class="wallet-name">{{ t("connectMoreWallets") }}</span>
      </div>
    </div>

    <!-- 国家选择器 -->
    <van-popup
      v-model:show="showCountryPicker"
      position="center"
      :style="{
        width: '90%',
        maxWidth: '589px',
        borderRadius: '10px',
        backgroundColor: '#181a1e',
      }"
      round
    >
      <div class="country-picker">
        <div class="picker-header">
          <div class="picker-title">选择区号</div>
          <img
            :src="closeIcon"
            class="close-icon"
            alt="关闭"
            @click="showCountryPicker = false"
          />
        </div>
        <div class="search-box">
          <div class="search-input-wrapper">
            <img :src="searchIcon" class="search-icon" alt="搜索" />
            <input
              v-model="countrySearchText"
              type="text"
              placeholder="搜索"
              class="search-input"
            />
          </div>
        </div>
        <div class="country-list">
          <div
            v-for="country in filteredCountries"
            :key="country.code"
            class="country-item"
            :class="{ active: selectedCountry.code === country.code }"
            @click="selectCountry(country)"
          >
            <span class="country-name">{{ country.name }}</span>
            <span class="country-code-text">+{{ country.code }}</span>
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

    <!-- 更多钱包弹窗 -->
    <van-popup
      v-model:show="showMoreWalletsDialog"
      position="center"
      :style="{
        width: '90%',
        maxWidth: '589px',
        borderRadius: '10px',
        backgroundColor: '#181a1e',
      }"
      round
    >
      <div class="more-wallets-dialog">
        <div class="dialog-header">
          <div class="dialog-title">{{ t("moreWallets") }}</div>
          <img
            :src="closeIcon"
            class="close-icon"
            alt="关闭"
            @click="showMoreWalletsDialog = false"
          />
        </div>
        <div class="dialog-description">
          {{ t("moreWalletsInstruction") }}
        </div>
        <div class="more-wallets-grid">
          <div
            v-for="wallet in moreWallets"
            :key="wallet.id"
            class="more-wallet-item"
            @click="handleMoreWalletSelect(wallet.id)"
          >
            <img
              :src="wallet.icon"
              :alt="wallet.name"
              class="more-wallet-icon"
            />
            <span class="more-wallet-name">{{ wallet.name }}</span>
          </div>
        </div>
        <div class="more-wallets-footer">
          <span class="more-wallets-footer-text">{{
            t("moreWalletsJoining")
          }}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import kfuIcon from "@/assets/images/kfu.svg";
import globeIcon from "@/assets/images/diqiu.svg";
// 钱包图标 - 使用占位符或实际图标
import okxIcon from "@/assets/image/okx.svg";
import passwordIcon from "@/assets/image/password.svg";
import closeIcon from "@/assets/image/close.svg";
import searchIcon from "@/assets/image/search.png";
// 更多钱包图标
import imtokenIcon from "@/assets/image/imtoken.svg";
import pocketIcon from "@/assets/image/pocket.svg";
import bitwalletIcon from "@/assets/image/bitwallet.svg";
import web3walletIcon from "@/assets/image/web3wallet.svg";
import rainbowIcon from "@/assets/image/rainbow.svg";
import safeIcon from "@/assets/image/safe.svg";

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();

const activeTab = ref("phone");
const phoneNumber = ref("");
const emailOrAccount = ref("");
const password = ref("");
const showPassword = ref(false);
const agreed = ref(false);
const showCountryPicker = ref(false);
const showLanguageDialog = ref(false);
const showMoreWalletsDialog = ref(false);
const languageTab = ref("language");
const countrySearchText = ref("");

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

// 过滤后的国家列表
const filteredCountries = computed(() => {
  if (!countrySearchText.value) {
    return countries.value;
  }
  const searchText = countrySearchText.value.toLowerCase();
  return countries.value.filter(
    (country) =>
      country.name.toLowerCase().includes(searchText) ||
      country.code.includes(searchText)
  );
});

const selectCountry = (country) => {
  selectedCountry.value = country;
  showCountryPicker.value = false;
  countrySearchText.value = "";
};

// 监听弹窗关闭，清空搜索文本
watch(showCountryPicker, (newVal) => {
  if (!newVal) {
    countrySearchText.value = "";
  }
});

// 钱包列表
const wallets = ref([
  {
    id: "coinbase",
    name: "Coinbase",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230052FF' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'/%3E%3Cpath fill='%23fff' d='M8 8h8v8H8z'/%3E%3C/svg%3E",
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23F6851B' d='M12 0L2.4 8.4l1.2 9.6L12 24l8.4-6 1.2-9.6L12 0z'/%3E%3Cpath fill='%23fff' d='M12 4.8l-6 4.8v9.6l6 3.6 6-3.6V9.6l-6-4.8z'/%3E%3C/svg%3E",
  },
  {
    id: "okx",
    name: "OKX Wallet",
    icon: okxIcon,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23337BD2' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z'/%3E%3Cpath fill='%23fff' d='M12 4l-2 2-2-2-2 2 2 2-2 2 2 2 2-2 2 2 2-2-2-2 2-2-2-2z'/%3E%3C/svg%3E",
  },
  {
    id: "tronlink",
    name: "Tronlink Wallet",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF0018' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z'/%3E%3Cpath fill='%23fff' d='M12 6l-3 3 3 3 3-3-3-3z'/%3E%3C/svg%3E",
  },
]);

const selectedWallet = ref(null);

const handleWalletSelect = (walletId) => {
  selectedWallet.value = walletId;
  handleWalletLogin(walletId);
};

const handleMoreWallets = () => {
  showMoreWalletsDialog.value = true;
};

// 更多钱包列表
const moreWallets = ref([
  {
    id: "imtoken",
    name: "ImToken",
    icon: imtokenIcon,
  },
  {
    id: "tokenpocket",
    name: "TokenPocket",
    icon: pocketIcon,
  },
  {
    id: "bitget",
    name: "Bitget Wallet",
    icon: bitwalletIcon,
  },
  {
    id: "binance",
    name: "Binance Web3 Wallet",
    icon: web3walletIcon,
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: rainbowIcon,
  },
  {
    id: "safe",
    name: "Safe",
    icon: safeIcon,
  },
]);

const handleMoreWalletSelect = (walletId) => {
  console.log("选择钱包", walletId);
  // TODO: 实现钱包连接逻辑
  showMoreWalletsDialog.value = false;
};

const canLogin = computed(() => {
  if (!agreed.value) return false;
  if (activeTab.value === "phone") {
    return phoneNumber.value && password.value;
  } else {
    return emailOrAccount.value && password.value;
  }
});

const goBack = () => {
  router.back();
};

const handleLogin = () => {
  if (!canLogin.value) return;
  // TODO: 实现登录逻辑
  console.log("登录", {
    type: activeTab.value,
    phone: phoneNumber.value,
    email: emailOrAccount.value,
    password: password.value,
    countryCode: selectedCountry.value.code,
  });
};

const handleWalletLogin = (walletId) => {
  // TODO: 实现钱包登录逻辑
  console.log("钱包登录", walletId);
};

const handleForgotPassword = () => {
  router.push("/forgot-password");
};

const goToRegister = () => {
  router.push("/register");
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
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: #070210;
  padding: 0 32px;
  padding-bottom: 40px;
  color: #f3f4f6;
  font-family: "PT Sans Caption";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
    }

    .logo-text {
      color: #fff;
    }
  }

  .header-icons {
    display: flex;
    align-items: center;
    gap: 16px;
  }

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

.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 68px;
  margin-bottom: 16px;

  .welcome-title {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .welcome-text {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 40px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .login-prompt {
      font-size: 16px;
      color: #fff;
    }
  }

  .register-link-top {
    color: #1df388;
    font-family: "PingFang SC";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

.badge {
  display: inline-block;
  background-color: #ff6b35;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 32px;
  margin-top: 24px;
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
    font-style: normal;
    font-weight: 500;
    line-height: normal;

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
  margin-bottom: 20px;
  margin-top: 60px;
  overflow: hidden;
  width: 686px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid #3c404b;
  background: #181a1e;

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
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-right: 4px;
    }

    .arrow-icon {
      font-size: 14px;
      color: #fff;
    }
  }

  :deep(.van-field) {
    padding: 12px 16px;
    background-color: transparent;

    .van-field__control {
      color: #6c6c6c;
      font-family: "PingFang SC";
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &::placeholder {
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &::-webkit-input-placeholder {
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &::-moz-placeholder {
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &:-ms-input-placeholder {
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .van-field__placeholder {
      color: #6c6c6c;
      font-family: "PingFang SC";
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .phone-input {
    flex: 1;
  }

  .email-input {
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
}

.forgot-password {
  text-align: right;
  margin-bottom: 24px;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #6c6c6c;
}

.agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 8px;
  margin: 0 20px;
  margin-bottom: 40px;

  :deep(.van-checkbox) {
    margin-top: 2px;
    border: 1px solid #000;
    border-radius: 1.06667vw;
  }

  .agreement-text {
    flex: 1;
    font-size: 12px;
    color: #040303 !important;
    line-height: 1.5;
    padding: 0 15px 0 0;
    // font-weight: 500;

    .link {
      color: #000000 !important;
      cursor: pointer;
      font-weight: 700;
    }
  }
}

.button-group {
  margin-bottom: 24px;
  margin-top: 32px;

  .login-btn {
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
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    // margin-bottom: 60px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.wallet-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0;
  position: relative;
  color: #a0a0a0;
  font-family: "PingFang SC";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  .divider-text {
    position: relative;
    background: linear-gradient(180deg, #1a0d2e 0%, #0d0519 100%);
    padding: 0 16px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
}

.wallet-list {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .wallet-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 686px;
    height: 90px;
    border-radius: 10px;
    border: 1px solid #3a404e;
    background: #0f1014;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &.active {
      border-color: #00ff88;
      background-color: rgba(0, 255, 136, 0.1);
    }

    .wallet-icon {
      width: 50px;
      height: 50px;
      margin-right: 13px;
      margin-left: 233px;
    }

    .wallet-name {
      color: #e3e3e3;
      font-family: Inter;
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .wallet-link-icon {
      font-size: 18px;
      color: #00ff88;
    }

    &.more-wallets {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ededed;
      font-family: "PingFang SC";
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      .wallet-link-icon {
        margin-right: 12px;
      }
    }
  }
}

.country-picker {
  display: flex;
  flex-direction: column;
  background: #181a1e;
  border-radius: 10px;
  max-height: 80vh;
  overflow: hidden;

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;

    .picker-title {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 38px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .close-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    flex-shrink: 0;

    .search-input-wrapper {
      display: flex;
      align-items: center;
      width: 560px;
      height: 90px;
      border-radius: 10px;
      border: 1px solid #22262f;
      background: #0f1014;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 33px;
      .search-icon {
        width: 30.092px;
        height: 30px;
        margin-right: 24px;
        flex-shrink: 0;
      }

      .search-input {
        flex: 1;
        height: 100%;
        border: none;
        background: transparent;
        color: #6c6c6c;
        font-family: "PingFang SC";
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        &::placeholder {
          color: #6c6c6c;
          font-family: "PingFang SC";
          font-size: 28px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }

  .country-list {
    flex: 1;
    overflow-y: auto;
    max-height: 50vh;
    padding: 0;

    .country-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background-color: rgba(0, 255, 136, 0.1);

        .country-code-text {
          color: #00ff88;
        }
        .country-name {
          color: #fff;
        }
      }

      .country-name {
        font-size: 28px;
        color: #fff;
        font-family: "PingFang SC";
        font-weight: 400;
      }

      .country-code-text {
        font-size: 28px;
        color: #fff;
        font-family: "PingFang SC";
        font-weight: 400;
      }
    }
  }
}

// 更多钱包弹窗
.more-wallets-dialog {
  display: flex;
  flex-direction: column;
  background: #181a1e;
  border-radius: 10px;
  padding: 35px 31.57px 43px;
  max-height: 80vh;
  overflow: hidden;

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    .dialog-title {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 38px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding-left: 233px;
    }

    .close-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .dialog-description {
    color: #929292;
    font-family: "PingFang SC";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 43px;
    padding-left: 10px;
  }

  .more-wallets-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 32px;
    margin: 0 auto;

    .more-wallet-item {
      width: 274px;
      height: 120px;
      border-radius: 10px;
      border: 1px solid #22262f;
      background: #0f1014;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 35px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        // border-color: rgba(255, 255, 255, 0.2);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.12);
      }

      .more-wallet-icon {
        width: 50px;
        height: 50px;
        margin-right: 16px;
        flex-shrink: 0;
      }

      .more-wallet-name {
        color: #ececec;
        font-family: "PingFang SC";
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        max-width: 124px;
      }
    }
  }

  .more-wallets-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-top: 20px;
    text-align: left;
    // border-top: 1px solid rgba(255, 255, 255, 0.1);

    .more-wallets-footer-text {
      color: #929292;
      font-family: "PingFang SC";
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .more-wallets-footer-button {
      width: 100%;
      height: 90px;
      border-radius: 10px;
      background: #1df388;
      color: #121212;
      font-family: "PingFang SC";
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;

      .wallet-link-icon {
        margin-right: 12px;
        font-size: 30px;
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
