<template>
  <div>
    <div class="formList">
      <el-table :data="languageForm" style="width: 100%">
        <el-table-column prop="key" label="变量名">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.key"
              placeholder="请输入变量名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zh" label="中文">
          <template slot-scope="scope">
            <el-input
              @blur="transLate(scope.row)"
              v-model="scope.row.zh"
              placeholder="请输入中文"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="en" label="英文">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.en"
              placeholder="请输入英文"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="deleteItem(scope.$index)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button
        @click="addNewRow"
        type="success"
        icon="el-icon-plus"
        circle
      ></el-button>
      <div>
        <el-button type="primary" @click="copyJson">复制json</el-button>
        <el-button type="primary" @click="submit">导出json</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkEmptyForm,
  trannformArrToObject,
  exportObjectToJSONFile,
  updateArray,
} from "../utils/common";
import { translateAPI } from "../utils/translate";

export default {
  name: "addList",
  props: ["uploadedFile"],
  data() {
    return {
      languageForm: [],
    };
  },
  watch: {
    languageForm(newV) {
      // console.log(newV);
    },
  },
  methods: {
    // 提交
    submit() {
      if (checkEmptyForm(this.languageForm)) {
        return this.$message.error("表单没填完噢");
      }
      // 拼接导出
      exportObjectToJSONFile(
        trannformArrToObject(
          updateArray([...this.uploadedFile, ...this.languageForm])
        ),
        "language.json"
      );
    },
    addNewRow() {
      this.languageForm.push({
        key: "",
        zh: "",
        en: "",
      });
    },
    // 复制
    copy(text) {
      const input = document.createElement("textarea");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this.$message({
        showClose: true,
        message: "复制成功",
        type: "success",
      });
    },
    copyJson() {
      this.copy(
        JSON.stringify(
          trannformArrToObject(
            updateArray([...this.uploadedFile, ...this.languageForm])
          )
        )
      );
    },
    deleteItem(index) {
      this.languageForm.splice(index, 1);
    },
    async transLate(item) {
      !item.en && (item.en = await translateAPI(item.zh));
      !item.key && (item.key = item.en.substring(0, 3));
    },
  },
};
</script>
