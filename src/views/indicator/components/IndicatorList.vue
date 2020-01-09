<template>
  <div class="home-page-order-list">
    <el-table
      :data="list"
      v-loading="loading"
      element-loading-text="给我一点时间"
      style="width: 100%">
      <el-table-column label="指标名称" prop="id">
        <template slot-scope="scope">
          <a class="link" @click="handleIndicatorDetail(scope.row.id)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column label="指标类型" prop="type"></el-table-column>
      <el-table-column label="归属模块" prop="moduleName"></el-table-column>
      <el-table-column label="业务口径定义" prop="businessDefinition"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="筛选条件" prop="filterBy"></el-table-column>
      <el-table-column label="使用状态" prop="isActive">
        <template slot-scope="scope">
          {{scope.row.isActive ? '开启' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="沉淀位置" prop="locationFrom"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button @click="goUpdate(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'indicatorList',
  data() {
    return {
      // listLoading: false
    }
  },
  props: ['list', 'loading'],
  created() {},
  methods: {
    handleIndicatorDetail(id) {
      this.$router.push({
        name: 'indicatorShow',
        params: {
          id
        }
      })
    },
    goUpdate(id) {
      console.log(id)
      this.$router.push({
        name: 'indicatorUpdate',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page-order-list {
  .link {
    color: #30bfbf;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
