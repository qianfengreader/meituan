
<template>


  <div style="width: 1291px">
    <div style="margin-top: 20px;text-align: left; width: 1291px">
      <h1>门店管理</h1>

    </div>
    <div >
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left">
        <el-form-item >
          <el-input v-model="formInline.user" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item style="width: 800px">
          <el-button type="primary" icon="el-icon-search" @click="findBySearch()">查询</el-button>
        </el-form-item>
        <!--<el-button type="warning" plain style="margin-right: 20px" @click="addshop">添加</el-button>-->
      </el-form>

    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="250">
      <el-table-column
        prop="name"
        label="店名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pname"
        label="所属品牌"
        width="120">
      </el-table-column>
      <el-table-column
        prop="region"
        label="所属业态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="详细地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="mname"
        label="门店负责人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="门店状态"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">

        <template slot-scope="scope">
          <el-button @click="updatestate(scope.row.name,scope.row.state)" type="text" size="small">
            <div v-if="scope.row.state=='正常'">停业</div>
            <div v-if="scope.row.state=='停业'">开业</div></el-button>
          <!--<el-button @click="updateshop" type="text" size="small">编辑</el-button>-->
          <el-button type="text" @click="dialog = true,findByName(scope.row.name)"  size="small">编辑</el-button>
          <el-button @click="deleteByName(scope.row.name)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="修改SHOPR"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" style="text-align: left">
          <el-form-item label="店铺名称" :label-width="formLabelWidth">
            <el-input v-model="form.mname" autocomplete="off"   style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="所属品牌" :label-width="formLabelWidth">
            <el-select v-model="form.pname" placeholder="请选择活动区域">
              <el-option label="海底捞" value="海底捞"></el-option>
              <el-option label="麦当劳" value="麦当劳"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="门店联系人" :label-width="formLabelWidth">
            <el-input v-model="form.dname" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="门店电话" :label-width="formLabelWidth">
            <el-input v-model="form.landline" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        formInline: {
          user: '',
        },
        tableData: [],
        dialog: false,
        loading: false,
        form: {},
        formLabelWidth: '100px',
        timer: null,
      };

    },

    methods: {
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {

            this.loading = true;
            axios.post("http://localhost:7000/weichat-shop/shop/updateShop",this.form).then(res=>{
              if (res.data.code==200){
                this.timer = setTimeout(() => {
                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);
                this.$router.push("/menu/menu_stores")
              }else {
                  alert("失败");
              }
            })
          })
          .catch(_ => {
          });
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },

      findByName:function(name){
          axios.post("http://localhost:7000/weichat-shop/shop/findByName",{name:name}).then(res=>{
            if (res.data.code==200){
                this.form=res.data.data;
            }
          })
      },

      findBySearch:function(){

      },
      addshop:function(){

      },
      updatestate:function(name,state){
          axios.post("http://localhost:7000/weichat-shop/shop/updatestate",{name:name,state:state}).then(res=>{
            if (res.data.code==200){
              this.findAll();
            }
          })
      },
      deleteByName:function(name){
          if (confirm("确定删除?")) {
            axios.post("http://localhost:7000/weichat-shop/shop/deleteByName",{name:name}).then(res=>{
              if (res.data.code == 200) {
                this.findAll();
              }
            })
          }
      },
      updateshop:function(){

      },
      findAll:function () {
        axios.get("http://localhost:7000/weichat-shop/shop/findAll").then(res=>{
          if (res.data.code==200){
            this.tableData=res.data.data;
          }
        })
      },
    },
    mounted(){
      this.findAll();
    }
  }
</script>
