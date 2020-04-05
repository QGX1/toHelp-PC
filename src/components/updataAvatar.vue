<template>
  <div id="updataAvatar">
    <el-avatar
      :size="100"
      :src="user_avatar?'http://39.101.193.187:8080/pictures/'+user_avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
    ></el-avatar>
    <el-button
      type="success"
      plain
      class="updataAvataBtn"
      size="mini"
      round
      @click="toggleShow"
    >修改头像</el-button>
    <my-upload
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="100"
      :height="100"
      img-format="jpg"
      :size="size"
      langType="zh"
      :noRotate="false"
    ></my-upload>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
export default {
  props: {
    user_avatar: String
  },
  data() {
    return {
      imgDataUrl: "", //用于存储剪切完图片的base64Data和显示回调图片
      show: false, //剪切框显示和隐藏的flag
      size: 2.1
    };
  },
  components: {
    "my-upload": myUpload
  },
  mounted() {
    console.log("111", this.user_avatar);
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    // 图像裁剪成功，参数（imageDataUrl，字段
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
      console.log(1111, imgDataUrl, field);
      // 上传图片
      let newImgUrl = imgDataUrl.split("base64,")[1];
      this.postRequest("/api/sendImg/uploadImg", { Base64Str: newImgUrl }).then(
        res => {
          if (res.data.code == 0) {
            this.cropUploadSuccess(res.data.imgSrc);
            // imgDataUrl是经过base64编码的图像
            // 裁剪成功修改父组建头像的值
            this.$emit("updataAvatar", {
              imgUrl: imgDataUrl,
              imgUrl2: res.data.imgSrc
            });
          }
        }
      );
    },
    //上传成功回调
    cropUploadSuccess(jsonData) {
      console.log("-------- upload success --------");
      this.imgDataUrl = jsonData;
      // console.log(jsonData);
      // console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    }
  }
};
</script>