<template>
  <div class="login-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <img :src="leftArrowIcon" class="back-icon" @click="goBack" alt="返回" />
      <img :src="kfuIcon" class="service-icon" alt="客服" />
    </div>

    <!-- 标题 -->
    <div class="title">{{ t("loginWeb3") }}</div>

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
          <span class="country-code">{{ selectedCountry.code }}</span>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
        <van-field
          v-model="phoneNumber"
          :placeholder="t('enterPhoneNumber')"
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
            <van-icon
              :name="showPassword ? 'eye-o' : 'closed-eye'"
              @click="showPassword = !showPassword"
              class="eye-icon"
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
            <van-icon
              :name="showPassword ? 'eye-o' : 'closed-eye'"
              @click="showPassword = !showPassword"
              class="eye-icon"
            />
          </template>
        </van-field>
      </div>

      <div class="forgot-password">
        <span @click="handleForgotPassword">{{ t("forgotPassword") }}</span>
      </div>
    </div>

    <!-- 协议同意 -->
    <div class="agreement">
      <van-checkbox v-model="agreed" shape="square" />
      <div class="agreement-text">
        {{ t("agreementText") }}
        <span class="link" @click="openTerms">{{ t("termsOfService") }}</span>
        <span class="link" @click="openPrivacy">{{ t("privacyPolicy") }}</span>
        {{ t("and") }}
        <span class="link" @click="openAntiMoneyLaundering">{{
          t("antiMoneyLaundering")
        }}</span>
      </div>
    </div>

    <!-- 登录按钮 -->
    <div class="button-group">
      <van-button type="primary" block class="login-btn" @click="handleLogin">
        {{ t("login") }}
      </van-button>
      <van-button block class="wallet-login-btn" @click="handleWalletLogin">
        {{ t("walletLogin") }}
      </van-button>
    </div>

    <!-- 注册链接 -->
    <div class="register-link">
      <span>{{ t("noAccount") }}</span>
      <span class="link" @click="goToRegister">{{ t("registerNow") }}</span>
    </div>

    <!-- 国家选择器 -->
    <van-popup
      v-model:show="showCountryPicker"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="country-picker">
        <div class="picker-header">
          <div class="picker-title">{{ t("selectCountry") }}</div>
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import leftArrowIcon from "@/assets/images/left_arrow.svg";
import kfuIcon from "@/assets/images/kfu.svg";

const router = useRouter();
const { t } = useI18n();

const activeTab = ref("phone");
const phoneNumber = ref("");
const emailOrAccount = ref("");
const password = ref("");
const showPassword = ref(false);
const agreed = ref(false);
const showCountryPicker = ref(false);

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

const selectedCountry = ref(countries.value[0]);

const selectCountry = (country) => {
  selectedCountry.value = country;
  showCountryPicker.value = false;
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

const handleWalletLogin = () => {
  // TODO: 实现钱包登录逻辑
  console.log("钱包登录");
};

const handleForgotPassword = () => {
  // TODO: 跳转到忘记密码页面
  console.log("忘记密码");
};

const goToRegister = () => {
  // TODO: 跳转到注册页面
  console.log("跳转到注册");
};

const openTerms = () => {
  router.push("/terms-of-service");
};

const openPrivacy = () => {
  // TODO: 打开隐私协议
  console.log("隐私协议");
};

const openAntiMoneyLaundering = () => {
  // TODO: 打开反洗钱协议
  console.log("反洗钱协议");
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #fff;
  padding: 0 16px;
  padding-bottom: 40px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  .back-icon {
    width: 20.8px;
    height: 20.8px;
    cursor: pointer;
    display: block;
  }

  .service-icon {
    width: 20.8px;
    height: 20.8px;
    font-size: 20px;
    color: #323233;
    cursor: pointer;
  }
}

.title {
  font-size: 6.4vw;
  font-weight: 700;
  color: #000;
  margin-top: 8px;
}

.tabs {
  display: flex;
  gap: 32px;
  margin-top: 44px;
  border-bottom: 1px solid #ebedf0;

  .tab {
    padding-bottom: 12px;
    color: #909090;
    font-size: 4.26667vw;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
    padding: 0 5.33333vw;
    height: 46.8px;
    line-height: 46.8px;

    &.active {
      color: #323233;
      font-weight: 500;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #323233;
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
  margin-bottom: 30px;
  margin-top: 40px;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;

  .country-selector {
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-right: 1px solid #ebedf05d;
    cursor: pointer;
    min-width: 60px;

    .country-code {
      font-size: 16px;
      color: #040303;
      margin-right: 4px;
      padding-left: 20px;
    }

    .arrow-icon {
      font-size: 16px;
      color: #040303;
    }
  }

  :deep(.van-field) {
    padding: 12px 16px;
    background-color: #fff;

    .van-field__control {
      font-size: 14px;
      color: #323233;

      &::placeholder {
        font-size: 4vw;
        color: #909090;
      }

      &::-webkit-input-placeholder {
        font-size: 4vw;
        color: #909090;
      }

      &::-moz-placeholder {
        font-size: 4vw;
        color: #909090;
      }

      &:-ms-input-placeholder {
        font-size: 4vw;
        color: #909090;
      }
    }

    .van-field__placeholder {
      font-size: 4vw;
      color: #909090;
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
      font-size: 18px;
      color: #969799;
      cursor: pointer;
    }
  }
}

.forgot-password {
  text-align: right;
  margin-bottom: 24px;

  span {
    font-size: 14px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }
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

  .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.33333vw;
    margin: 0 auto;
    width: 91.46667vw;
    height: 12.8vw;
    background-color: #000;
    border-radius: 266.4vw;
    font-size: 4vw;
    color: #fff;
    border: none;

    &:disabled {
      // background-color: #c8c9cc;
      color: #fff;
    }
  }

  .wallet-login-btn {
    width: 91.46667vw;
    height: 12.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5.33333vw auto 0;
    border-radius: 6.4vw;
    background: #fff;
    color: #000;
    border: 1px solid #000;
    font-size: 4vw;
    cursor: pointer;
    font-weight: 400;
    box-sizing: border-box;
  }
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #040303;

  .link {
    color: #000;
    font-weight: 700;
    cursor: pointer;
    margin-left: 4px;
  }
}

.country-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebedf0;

    .picker-title {
      font-size: 16px;
      font-weight: 500;
      color: #323233;
    }

    .close-icon {
      font-size: 18px;
      color: #969799;
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
      border-bottom: 1px solid #ebedf0;
      cursor: pointer;
      transition: background-color 0.2s;

      &:active {
        background-color: #f7f8fa;
      }

      &.active {
        background-color: #323233;
        color: #fff;

        .country-code-text {
          color: #fff;
        }
        .country-name {
          color: #fff;
        }
      }

      .country-name {
        font-size: 14px;
        color: #323233;
      }

      .country-code-text {
        font-size: 14px;
        color: #969799;
      }
    }
  }
}
</style>
