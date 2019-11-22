<template>
  <div class="login-container">
    <!-- 左侧form -->
    <div class="left-form">
      <div class="title">
        <img class="login-logo" src="../../assets/login_icon.png" alt />
        <span class="hm-wrod">黑马面面</span>
        <span class="line">|</span>
        <span class="log-wrod">用户登录</span>
      </div>
      <!-- 用户输入框 Elui-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <!-- 手机号 -->
        <el-form-item label prop="password">
          <el-input
            class="inpu-phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="input2"
          ></el-input>
          <!-- 密码 -->
          <el-form-item label prop="password">
            <el-input
              class="inpu-password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="input2"
            ></el-input>
          </el-form-item>

          <!-- 验证码 -->
        </el-form-item>
        <el-form-item label prop="captcha">
          <el-row class="inpu-captcha">
            <el-col :span="16">
              <el-input
                class="capVal"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="input2"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img class="capImg" src="../../assets/captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 复选框+文字连接 Elui-->
        <el-checkbox class="checkbox">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 按钮 -->
        <el-button class="login-btn" type="primary">登录</el-button>
        <el-button class="zc-btn" type="primary">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img class="banner" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login-container {
  display: flex; /*弹性布局*/
  align-items: center; /* 上下居中 */
  justify-content: space-around; /* 盒子左右的距离平分 */
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .left-form {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 48px 42px;

    .title {
      .login-logo {
        width: 22px;
        height: 22px;
        margin-right: 12px;
      }

      .line {
        color: #c7c7c7;
        font-size: 28px;
        margin-right: 12px;
      }

      .hm-wrod {
        font-size: 24px;
        margin-right: 12px;
      }

      .log-wrod {
        font-size: 22px;
      }
    }
    .inpu-phone {
      margin-top: 30px;
    }
    .inpu-password {
      margin-top: 25px;
    }
    .inpu-captcha {
      margin-top: 25px;
      .capImg {
        width: 100%;
        height: 42px;
      }
    }
    .checkbox {
      color: #999999;
      font-size: 14px;
      display: flex;
      align-items: center; //垂直居中
      margin-top: 32px;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .el-button.el-button--primary {
      display: block;
      width: 100%;
      margin: 27px 0;
    }
  }

  .banner {
    width: 633px;
    height: 435px;
  }
}
</style>>