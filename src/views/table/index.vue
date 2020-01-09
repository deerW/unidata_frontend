<template>
  <div class="app-container datafield">
    <div class="filter-container">
      <el-form
        size="small"
        ref="filterForm"
        :inline="true"
        :model="filterForm"
        class="filter-form-inline"
      >
        <el-form-item label="库名称">
          <el-select
            v-model="filterForm.databaseId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteBaseNameMethod"
            :loading="databaseNameLoading"
          >
            <el-option
              v-for="item in databaseNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表名称">
          <el-select
            v-model="filterForm.ids"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteTableNameMethod"
            :loading="tableNameLoading"
          >
            <el-option
              v-for="item in tableNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-select v-model="filterForm.isActive" placeholder="使用状态">
            <el-option label="请选择" value></el-option>
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及功能">
          <el-input v-model="filterForm.involvedFunctions" placeholder="涉及功能" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="listLoading"
            type="primary"
            @click="onSubmit"
            icon="el-icon-search"
          >查询</el-button>
          <el-button :loading="listLoading" @click="onClear('filterForm')" icon="el-icon-error">清除</el-button>
          <el-button plain type="primary" @click="onCreate" icon="el-icon-circle-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="header-achievements-current">
      <div class="header-achievements-current-left">
        <h3>归属模块</h3>
        <el-tree
          :current-node-key="filterForm.moduleId"
          :data="allModules"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="header-achievements-current-right">
        <table-list :loading="listLoading" :list="list" />
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="meta.pagination.currentPage"
            :page-sizes="[10, 30, 50]"
            :page-size="meta.pagination.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="meta.pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  getTables,
  getSelectTables,
  getSelectInvolvedFunctions,
  getSelectDatabases
} from "@/api/database";

import TableList from "./components/TableList";

export default {
  name: "dashboard",
  metaInfo: {
    title: "数据字典"
  },

  components: {
    TableList
  },
  data() {
    return {
      listLoading: false,
      databaseNameLoading: false,
      tableNameLoading: false,
      involvedFunctionLoading: false,
      filterForm: {
        databaseId: "",
        ids: [],
        name: [],
        isActive: "",
        involvedFunctionIds: [],
        moduleId: "",
        page: 1,
        pageSize: 30
      },
      databaseNames: [],
      tableNames: [],
      involvedFunctions: [],
      modules: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      list: [],
      meta: {
        pagination: {
          currentPage: 1,
          total: 0
        }
      }
    };
  },
  created() {
    this.getList();
    this.remoteBaseNameMethod("", "create");
    this.remoteTableNameMethod("", "create");
    this.$store.dispatch("GetModules");
  },
  methods: {
    handleSizeChange(val) {
      this.getList(Object.assign(this.filterForm, { pageSize: val }));
    },
    handleCurrentChange(val) {
      this.getList(Object.assign(this.filterForm, { page: val }));
    },
    onSubmit() {
      this.getList();
    },
    onCreate() {
      this.$router.push({
        name: "tableNew"
      });
    },
    onClear(formName) {
      this.filterForm = {
        databaseId: "",
        name: [],
        ids: [],
        isActive: "",
        involvedFunctions: '',
        moduleId: "",
        page: 1,
        pageSize: 30
      };
      this.$refs[formName].resetFields();
      this.getList();
    },
    handleNodeClick(data) {
      this.filterForm.moduleId = data.id;
      this.getList(Object.assign(this.filterForm));
    },
    remoteBaseNameMethod(query, type) {
      if (query !== "" || type === "create") {
        this.databaseNameLoading = true;
        setTimeout(
          () => {
            this.databaseNameLoading = false;
            getSelectDatabases({ name: query })
              .then(data => {
                this.databaseNames = data.data.map(item => {
                  return {
                    value: item.id,
                    label: item.cnName
                  };
                });
              })
              .catch(err => {
                this.databaseNameLoading = false;
                console.log(err);
              });
          },
          type === "create" ? 0 : 200
        );
      } else {
        this.options = [];
      }
    },
    remoteTableNameMethod(query, type) {
      if (query !== "" || type === "create") {
        this.tableNameLoading = true;
        setTimeout(
          () => {
            this.tableNameLoading = false;
            getSelectTables({ name: query })
              .then(data => {
                this.tableNames = data.data.map(item => {
                  return {
                    value: item.id,
                    label: item.name
                  };
                });
              })
              .catch(err => {
                this.tableNameLoading = false;
                console.log(err);
              });
          },
          type === "create" ? 0 : 200
        );
      } else {
        this.options = [];
      }
    },
    remoteInvolvedFunctionMethod(query) {
      console.log(query);
      if (query !== "") {
        this.involvedFunctionLoading = true;
        setTimeout(() => {
          this.involvedFunctionLoading = false;
          getSelectInvolvedFunctions({ involvedFunction: query })
            .then(data => {
              console.log("功能s", data);
              this.involvedFunctions = data.data.map(item => {
                return {
                  value: item.id,
                  label: item.involvedFunctions
                };
              });
            })
            .catch(err => {
              this.involvedFunctionLoading = false;
              console.log(err);
            });
        }, 200);
      } else {
        this.options = [];
      }
    },
    getList() {
      this.listLoading = true;

      getTables(this.filterForm)
        .then(data => {
          this.list = data.data;
          this.meta = data.meta;
          this.listLoading = false;
        })
        .catch(err => {
          this.$message.error("获取数据字典列表失败");
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["allModules"])
  }
};
</script>

<style lang="scss" scoped>
.datafield {
  background: #fff;
  padding: 20px 40px;
  padding-bottom: 40px;
  height: calc(100vh - 50px);
  overflow: scroll;
}

.filter-container {
  border-bottom: 2px solid #eee;
}
.filter-left {
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 5px solid #eee;
}
.filter-right {
  width: calc(100vw - 400px);
  padding-left: 10px;
}

.header-achievements-current {
  display: flex;
}
.header-achievements-current-left {
  padding: 10px 0;
  width: 190px;
  border-right: 5px solid #eee;
  h3 {
    margin-bottom: 10px;
  }
}
.header-achievements-current-right {
  width: calc(100vw - 400px);
  overflow: scroll;
}
.pagination {
  text-align: right;
  margin-top: 10px;
  padding-bottom: 10px;
}
</style>
