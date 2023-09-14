<template>
  <div id="app">
    <div style="text-align: left">
      <input
        style="display: none"
        ref="fileUpdate"
        type="file"
        @change="handleFileUpload"
      />
      <el-button @click="uploadFile" type="primary"
        >上传语言包<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>

    <div class="title">语言包配置</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="完整列表" name="first">
        <NewList :uploadedFile="uploadedFile"></NewList>
      </el-tab-pane>
      <el-tab-pane label="新增数据" name="third">
        <AddList :uploadedFile="uploadedFile"></AddList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AddList from "./components/addList.vue";
import NewList from "./components/newList.vue";
import { transformObjectToArr } from "./utils/common";
export default {
  data() {
    return {
      activeName: "first",
      uploadedFile: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          this.uploadedFile = transformObjectToArr(JSON.parse(contents));
        } catch (error) {
          this.$message({
            message: "非语言包json文件!",
            type: "error",
          });
        }
      };

      reader.readAsText(file);
    },
    uploadFile() {
      this.$refs.fileUpdate.click();
    },
  },
  components: { AddList, NewList },
  watch: {
    uploadedFile(newVal) {
      console.log(newVal);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  border: 1px solid #ccc;
  width: 60%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > div {
    width: 100%;
  }
  .formList {
    width: 100%;
  }
  .btn {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
