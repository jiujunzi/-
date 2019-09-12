<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/tutu.jpg" alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router 
        >
          <!-- 一级菜单 -->
          <!-- index 只接受字符串，不接受字数值，+ 拼接一个空，隐式转换成字符串 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.id + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <!-- 二级餐单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    this.getMenulist();
  },
  data() {
    return {
      // 左侧菜单栏数据
      menulist: [],
      // 一级菜单图标对象
      // 前面的数字是一级菜单对应的ID

      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },

      // 默认不折叠
      isCollapse: false
    };
  },
  methods: {
    // 退出
    logout() {
      // 清除token
      window.sessionStorage.clear();
      // 跳转到login页面
      this.$router.push("/login");
    },
    // 获取左侧菜单栏数据
    async getMenulist() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      this.menulist = res.data;

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      return this.$message.success(res.meta.msg);
    },
    // 折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang='less' scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  // 两侧对其
  justify-content: space-between;
  // logo左边有间隙
  padding-left: 0;
  // 垂直居中
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: none;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>