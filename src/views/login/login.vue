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
        <el-button class="zc-btn" type="primary" @click="dialogFormVisible=true">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img class="banner" src="../../assets/login_banner_ele.png" alt />

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <!-- 注册表单 -->
      <el-form :model="registerForm">
        <!-- 上传头像 -->
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <!-- 侧偏移 -->
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="captcha" :src="regCaptcha" @click="changeRegCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
          <el-row class="inpu-captcha">
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getMessage" type="primary" :disabled="isDisabled">{{btnTxt}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {setToken} from '../../utils/token.js'
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
      //登录验证规则
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
      //验证码地址
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      //是否勾选
      checked: true,
      // 是否显示注册框
      dialogFormVisible: false,
      //注册的表单数据
      registerForm: {
        avatar: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        rcode: "",
        code: ""
      },
      // 文字宽度
      formLabelWidth: "67px",
      // 图片地址
      imageUrl: "",
      //图形验证码的地址
      regCaptcha: "http://183.237.67.218:3002/captcha?type=sendsms",
      // 短信验证码按钮文本
      btnTxt: "获取短信验证码",
      //按钮是否禁用
      isDisabled: false
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
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },
            withCredentials: true
          }).then(res => {
<<<<<<< HEAD
            window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("登录成功");
            } else {
              this.$message.warning("登录失败");
=======
            console.log(res);
            if (res.data.code===200) {
              this.$message.success('登录成功')
              //跳转
              this.$router.push('/index');
              setToken(res.data.data.token)
            }else{
              this.$message.warning('登录失败')
>>>>>>> checklogin
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerForm.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeRegCaptcha() {
      this.regCaptcha = `http://183.237.67.218:3002/captcha?type=sendsms&${Date.now()}`;
    },
    getMessage() {
      if (this.registerForm.phone.trim() == "") {
        this.$message.warning("请输入手机号");
        return;
      }
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        this.$message.warning("请输入正确的手机号");
        return;
      }
      axios({
        method: "post",
        url: "http://183.237.67.218:3002/sendsms",
        data: {
          code: this.registerForm.code,
          phone: this.registerForm.phone
        },
        //跨域携带COOKIE
        withCredentials: true
      }).then(res => {
        window.console.log(res);
      });
      let time = 60;
      this.isDisabled = true;
      const interId = setInterval(() => {
        time--;
        this.btnTxt = `${time}S后再次获取`;
        if (time == 0) {
          clearInterval(interId);
          this.isDisabled = false;
        }
      }, 100);
    },
    //用户注册
    registerUser() {
      axios({
        method: "post",
        url: '"http://183.237.67.218:3002/register',
        data: {
          avatar: this.registerForm.avatar,
          email: this.registerForm.email,
          name: this.registerForm.name,
          password: this.registerForm.password,
          phone: this.registerForm.phone,
          rcode: this.registerForm.rcode
        },
        withCredentials: true
      }).then(res => {
        window.console.log(res);
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
    box-sizing: border-box;

    .title {
      display: flex;
      align-items: center;
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
    //协议
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

// 对话框中的 样式
.captcha {
  height: 41px;
  width: 100%;
}
.captcha-btn {
  width: 100%;
}
// 对话框
.reg-dialog .el-dialog {
  width: 602px;
}
.reg-dialog {
  // 头部
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c5fa, #1394fa);
    .el-dialog__title {
      color: white;
    }
  }
  // 底部
  .dialog-footer {
    text-align: center;
  }
}

// 头像组件样式
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.login-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>