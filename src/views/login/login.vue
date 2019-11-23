<template>
  <div class="login-container">
    <!-- 左侧form -->
    <div class="left-form">
      <!-- 标题 -->
      <div class="title">
        <img class="login-logo" src="../../assets/login_icon.png" alt />
        <span class="hm-wrod">黑马面面</span>
        <span class="line">|</span>
        <span class="log-wrod">用户登录</span>
      </div>
      <!-- 用户输入框 Elui-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <!-- 手机号 -->
        <el-form-item label prop="phone">
          <el-input
            class="inpu-phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label prop="password">
          <el-input
            class="inpu-password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <el-row class="inpu-captcha">
            <el-col :span="16">
              <el-input
                class="capVal"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="loginForm.captcha"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img class="capImg" :src="captchaSrc" @click="changeCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 协议-->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 按钮 -->
        <el-button class="login-btn" type="primary" @click="submitClick('loginForm')">登录</el-button>
        <el-button class="zc-btn" type="primary">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img class="banner" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    const checkPhone = (rules, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号码格式不对哦"));
        }
      }
    };
    return {
      //登录大表单
      loginForm: {
        phone: "",
        password: "",
        captcha: ""
      },
      loginRules: {
        phone: [{ validator: checkPhone }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码强度不够" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "请输入4位验证码" }
        ]
      },
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      checked: true
    };
  },
  methods: {
    changeCaptcha() {
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
      //点击登录
    },
    submitClick(loginForm) {
      if (!this.checked) {
        this.$message.warning("请勾选用户协议");
        return;
      }
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "http://183.237.67.218:3002/login",
            data: {
              phone:this.loginForm.phone,
              password:this.loginForm.password,
              code:this.loginForm.captcha
            },
            withCredentials:true
          }).then(res => {
            console.log(res);
            if (res.data.code===200) {
              this.$message.success('登录成功')
            }else{
              this.$message.warning('登录失败')
            }
          });
        }else{
          return false;
        }
      });
    }
  }
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