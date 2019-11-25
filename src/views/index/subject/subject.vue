<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内表单 -->
      <el-form :model="fromInline">
        <el-form-item label="学科编号">
          <el-input v-model="fromInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="fromInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="fromInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <el-select v-model="formInline.status" placeholder="请选择默认状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clearClick">清除</el-button>
        <el-button type="primary" @click="addFormVisible=true" el-icon-plus>新增学科</el-button>
      </el-form>
    </el-card>

    <!-- 主体内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width:100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="学科编号" prop="rid"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="short-name"></el-table-column>
        <el-table-column label="创建者" prop="creater"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">禁用</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增对话框 -->
    <el-dialog title="新增学科" :visible.sync="addFormVisible" class="add-dialog">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="addForm.intro" autocomplete="off" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible=false">取消</el-button>
        <el-button @click="addSubmit" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
        <el-dialog title="编辑学科" :visible.sync="editFormVisible" class="add-dialog">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="editForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="editForm.intro" autocomplete="off" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible=false">取消</el-button>
        <el-button @click="editSubmit" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
//导入接口
import { subject } from "../../../utils/api.js";
export default {
  name: "subject",
  data() {
    return {
      //头部表单
      fromInline: {},
      //主体表格
      tableData: [],
      // 主体分页
      page: 1,
      limit: 10,
      pageSizes: [5, 10, 15, 20],
      total: 0,
      // 显示新增弹出框
      addFormVisible: false,
      editFormVisible: false,
      // 文字与输入框在同一行 设置输入框的宽度
      formLabelWidth: "100px",
      //获取新增表单数据
      addForm: {},
      editForm: {},
      //写新增表单规则
      addRules: {
        rid: [{ require: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ require: true, message: "学科名字不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    //axios请求查询页面-调用接口
    subject
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        //赋值给主体表格
        this.tableData = rs.data.data.items;
        this.total = res.dat.data.pagination.total;
      });
  },
  methods: {
    //封装 获取数据的逻辑
    getList() {
      subject
        .list({
          page: this.page,
          limit: this.limit,
          ...this.formInline
        })
        .then(res => {
          this.tableData = res.data.data.items;
          this.total = res.dat.data.pagination.total;
        });
    },
    //搜索的点击事件
    search() {
      this.page = 1;
      this.getList();
    },
    //分页的点击事件
    handleSizeChange(size) {
      this.limit=size;
      this.page=1;
      this.getList();
    },
    handleCurrentChange(current) {
      this.page = current;
      this.getList();
    },
    //取消表单输入框内容
    clearClick() {
      this.fromInline = "";
    },
    //添加数据
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //成功
          //调用接口
          subject.add(this.addForm).then(res => {
            if (res.data.code == 200) {
              this.addFormVisible = false;
              this.getList();
            }
          });
        } else {
          this.$message.warning("老铁数据不太对哦");
          return false;
        }
      });
    },
    // 删除数据
    remove(data) {
      this.$comfirm("此操作将永久删除该学科", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          // 接口调用
          subject
            .remove({
              id: data.id
            })
            .then(res => {
              if (res.data.code == 200) {
                //重新获取数据
                this.getList();
              }
            });

          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击编辑按钮
    showEdit(data) {
      //弹框
      this.editFormVisible=true;
      //为了不联动 改为深拷贝
      this.editForm = JSON.parse(JSON.stringify(data));
    },
    //
    status() {
      this.$refs.editForm.validate(valid=>{
        if (valid) {
          subject.edit(this.editForm).then(res=>{
            if (res.data.code==200) {
              this.editFormVisible=false;
              this.getList();
            }
          });
        }else{
          this.$message.warning("老铁数据不太对哦");
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less">
.subject-container {
  //头部表单
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }

  //主体表格
  .main-card {
    margin-top: 20px;
    .red {
      color: red;
    }
    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
  }

  //新增--弹出框样式
  .add-dialog {
    .el-dialog__header {
      background-color: blue;
      text-align: center;
      .el-dialog__title {
        color: white;
      }
    }
    .el-input__inner {
      width: 100%;
    }
    .dialog-footer {
      margin-top: 30px;
      margin: 0 auto;
    }
  }
}
</style>>