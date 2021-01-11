<template>
    <div>

      <div style="width: 1291px">
        <div style="margin-top: 20px;text-align: left; width: 1291px">
          <h1>店长管理</h1>

        </div>
        <div >
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left">
            <el-form-item >
              <el-input v-model="formInline.user" placeholder="请输入门店老板名称"></el-input>
            </el-form-item>
            <el-form-item style="width: 800px">
              <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
            <!--<el-button type="warning" plain style="margin-right: 20px" @click="">添加</el-button>-->
          </el-form>

        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="250">
          <el-table-column
            prop="name"
            label="店长姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系方式"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="所属店面"
            width="500">
          </el-table-column>
          <el-table-column
            prop="state"
            label="账号状态"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">

              <el-button type="text" @click="dialog = true,findByName(scope.row.name)"  size="small">编辑</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!--完整功能的分页 , 要放在Table表格外边-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-sizes="params.pageSizes"
          :page-size="params.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="text-align: center">
        </el-pagination>

        <el-drawer
          title="修改老板局部信息"
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="ltr"
          custom-class="demo-drawer"
          ref="drawer"
        >
          <div class="demo-drawer__content">
            <el-form :model="form" style="text-align: left">
              <el-form-item label="账号状态" :label-width="formLabelWidth">
                <el-input v-model="form.state" autocomplete="off" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.tel" autocomplete="off" style="width: 200px"></el-input>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        params:{
          size:1,
          page:1,
          pageSizes:[1,2,3,4]
        },
        total:100,
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.size=val;
        this.findAll();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page=val;
        this.findAll();
      },



      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {

            this.loading = true;
            axios.post("http://localhost:7000/weichat-brand/director/updateDir",this.form).then(res=>{
              if (res.data.code==200){
                this.timer = setTimeout(() => {

                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);

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
        axios.post("http://localhost:7000/weichat-brand/director/findByName",{name:name}).then(res=>{
          if (res.data.code==200){
            this.form=res.data.data;
          }
        })
      },

      findBySearch:function(){

      },

      findAll:function () {
        axios.get("http://localhost:7000/weichat-brand/director/findAll/"+this.params.page+"/"+this.params.size).then(res=>{
          if (res.data.code==200){
            this.tableData=res.data.data;
            this.total=res.data.total;
          }
        })
              },
    },
    mounted(){
      this.findAll();
    }
  }
</script>
