<template>
  <div class="home-page-order-list">
    <el-table
      :data="list"
      v-loading="loading"
      element-loading-text="给我一点时间"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="编码" prop="id" width="60">
        <template slot-scope="scope">
          <a class="deal-link" @click="handleTableDetail(scope.row.id)">{{scope.row.id}}</a>
        </template>
      </el-table-column>
      <el-table-column label="库名称" prop="databaseName"></el-table-column>
      <el-table-column label="表名称" prop="name"></el-table-column>
      <el-table-column label="使用状态" prop="isActive" width="100">
        <template slot-scope="scope">
          {{ scope.row.isActive ? '开启' : '关闭'}} 
        </template>
      </el-table-column>
      <el-table-column label="表说明" width="300" prop="comment"></el-table-column>
      <el-table-column label="归属模块" prop="moduleName" width="150"></el-table-column>
      <el-table-column label="涉及的功能" width="200" prop="involvedFunctions"></el-table-column>
      <el-table-column label="联系人" prop="contacts"></el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="goUpdate(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'OrderList',
  data() {
    return {
      // listLoading: false
    }
  },
  props: ['list', 'loading'],
  created() {},
  methods: {
    tableRowClassName({ row }) {
      const filterColumns = row.column.filter(item => !item.comment)
      if (filterColumns && filterColumns.length) return 'warning-row'
    },
    handleTableDetail(id) {
      this.$router.push({
        name: 'tableShow',
        params: {
          id
        }
      })
    },
    goUpdate(id) {
      console.log(id)
      this.$router.push({
        name: 'tableUpdate',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.home-page-order-list {
  display: flex;
  flex-direction: column;
  background: #fff;

  .list-title {
    width: 120px;
    height: 30px;
    font-family: PingFang-SC;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: #303133;
  }
  .deal-link {
    color: #30bfbf;
    font-weight: 500;
    cursor: pointer;
  }
  .el-table .warning-row {
    background: #fdcccc;
  }
}

</style>
