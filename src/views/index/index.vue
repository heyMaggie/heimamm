<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse" :class="{rotate:isCollapse}"></i>
        <img src="../../assets/hmlogo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img src="../../assets/touxiang.jpg" alt />
        <span>我淡然,您好</span>
        <el-button type="primary" size="mini">退出</el-button>
      </div>
    </el-header>

    <!-- 左侧 -->
    <el-container class="subContainer">
      <el-aside width=auto class="aside">
        <el-menu :collapse="isCollapse" default-active="5" class="el-menu-vertical-demo" router>
          <el-menu-item index="date">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="userlist">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="item">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    name:"index",
    data() {
        return {
            isCollapse: false,
        }
    },
};
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
    // background-color: aqua;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 30px;
        margin-right: 22px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span {
        font-style: 14px;
        margin-right: 38px;
      }
    }
  }
  .subContainer {
    .aside {
      //   background-color: pink;
    }
    .main {
      background-color: red;
    }
  }
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .el-icon-s-fold{
            font-size: 40px;
            transition: .5s;
        }
        .rotate {
            transform: rotate(-90deg);
        }
</style>>