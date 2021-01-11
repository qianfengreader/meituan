<template>

    <div>
      <div style="height: 100px;width: 1291px ">
        <h1>添加品牌</h1>
      </div>
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="text-align: left">
        <el-form-item label="品牌名称" prop="bname">
          <el-input v-model="ruleForm.bname" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="sname" >
          <el-input v-model="ruleForm.sname" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="食品区域" prop="region" style="width: 300px">
          <el-select v-model="ruleForm.region" placeholder="请选择食品区域">
            <el-option label="日韩料理" value="日韩料理"></el-option>
            <el-option label="小烧烤" value="小烧烤"></el-option>
            <el-option label="美国佬" value="美国佬"></el-option>
            <el-option label="服务至上" value="服务至上"></el-option>
            <el-option label="大牌餐饮" value="大牌餐饮"></el-option>
            <el-option label="辣翻天" value="辣翻天"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel" style="width: 300px">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>

        <el-form-item label="品牌logo" >

          <el-upload
            class="avatar-uploader"
            action="http://localhost:7000/weichat-brand/brand/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img  class="avatar">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item >
          <el-image
          style="width: 100px; height: 100px"
          :src="ruleForm.pic"
          fit="fill" v-if="ruleForm.pic!=null && ruleForm.pic!=''"></el-image>
        </el-form-item>


        <el-form-item >
          <el-button type="primary" @click="submitForm">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          bname: '',
          sname: '',
          tel: '',
          region:'',
          pic: '',
          formLabelWidth: '120px'
        },
        rules: {
          bname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sname: [
            { required: true, message: '请输入负责人名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm:function(){
        axios.post("http://localhost:7000/weichat-brand/brand/addbrand",this.ruleForm).then(res=>{
          if (res.data.code==200){
            this.$router.push("/menu/menu_brand")
          }
        })
      },


      handleAvatarSuccess(res, file) {
        console.log(res)
        this.ruleForm.pic=res.data;
        this.pic = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
