<template>
  <div class="login-container">
    <!-- 左侧form -->
    <div class="left-form">
      <div class="title">
        <img src alt />
        <span>黑马面面</span>
        <span>|</span>
        <span>用户登录</span>
      </div>
      <input type="text" />
      <input type="text" />
      <input type="text" />
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

<style>
.login-container {
  display: flex;/*弹性布局*/
  align-items: center;/* 上下居中 */
  justify-content: space-around; /* 盒子左右的距离平分 */
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1)
  );
}

.left-form {
  width: 478px;
  height: 550px;
  background-color: #f5f5f5;
}

.banner {
  width: 633px;
  height: 435px;
}
</style>>