<template>
  <div >
    <el-container style="height: 702px; border: 1px solid #8A2BE2">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>集团管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="pingpai">品牌管理</el-menu-item>
              <el-menu-item index="1-2" @click="mendian">门店管理</el-menu-item>
              <el-menu-item index="1-2" @click="director">店长管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>

        <router-view></router-view>

      </el-container>
    </el-container>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {

      }
    },
    methods:{
      pingpai:function () {
        this.$router.push({
          path:"/menu/menu_brand",
          name:"menu_brand",
        })
      },
      mendian:function () {
        this.$router.push({
          path:"/menu/menu_stores",
          name:"menu_stores",
        })
      },
      director:function () {
        this.$router.push({
          path:"/menu/menu_director",
          name:"menu_director",
        })
      },
    },
  };
</script>
<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #909399;
    text-align: center;
    line-height: 200px;
  }
</style>
