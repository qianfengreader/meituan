<template>
  <div>
    <div style="margin-top: 20px;margin-left: 10px; width: 1291px">品牌
      <el-button type="warning" icon="el-icon-plus" circle @click="add"></el-button>
    </div>


    <el-row>
      <el-col :span="4" v-for="(o, index) in foods" :key="index" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '20px' }">
            <img :src="o.pic" class="image" style="width: 180px;height: 150px">
          <div style="padding: 14px;">
            <span>{{o.bname}}</span>
            <div class="bottom clearfix">
              <span>{{o.sname}}</span>
              <!--<time class="time">{{ currentDate }}</time>-->
            <!--  <el-button type="text" class="button">操作按钮</el-button>-->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials=true
    export default {
      data() {
        return {
          foods: [],
          currentDate: new Date(),
          pic:''
        };
      },
      methods:{
        findAll:function () {
          axios.get("http://localhost:7000/weichat-brand/brand/findAll").then(res=>{
            if (res.data.code==200){
              this.foods=res.data.data;
              this.pic=res.data.data.pic;
            }
          })
        },
        add:function () {
          this.$router.push("/menu/add_brand")
        }
      },
      mounted(){
        this.findAll();
      }
    }
</script>

<style scoped>

</style>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
