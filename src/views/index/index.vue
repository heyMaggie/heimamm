<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container class="subContainer">
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
}
.container {
  height: 100%;
  .header {
    background-color: aqua;
  }
  .subContainer {
    .aside {
      background-color: pink;
    }
    .main {
      background-color: red;
    }
  }
}
</style>>