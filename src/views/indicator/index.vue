<template>
  <div class="app-container datafield">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
      <div class="">
        <div class="filter-container">
          <el-form size="small" ref="filterForm" :inline="true" :model="filterForm" class="filter-form-inline">
            <el-form-item label="指标名称">
              <el-input size="small" v-model="filterForm.name" placeholder="指标名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="listLoading" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
              <el-button :loading="listLoading" @click="onClear('filterForm')" icon="el-icon-error">清除</el-button>
              <el-button plain type="primary" @click="onCreate" icon="el-icon-circle-plus">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="header-achievements-current">
          <div class="header-achievements-current-left">
            <h3>归属模块</h3>
            <el-tree :current-node-key="filterForm.moduleId" :data="allModules" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
          <div class="header-achievements-current-right">
            <indicator-list :loading="listLoading" :list="list" />
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="meta.pagination.currentPage"
                :page-sizes="[10, 30, 50]"
                :page-size="meta.pagination.perPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="meta.pagination.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      </el-tab-pane>
      <el-tab-pane label="指标信息" name="second">
        <indicator-show :hiddenOperation="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getIndicators } from '@/api/indicator'
import IndicatorList from './components/IndicatorList'
import IndicatorShow from './show'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '数据字典'
  },

  components: {
    IndicatorList,
    IndicatorShow
  },
  data() {
    return {
      list: [],
      meta: {
        pagination: {
          currentPage: 1,
          total: 0
        }
      },
      activeName: 'first',
      listLoading: false,
      filterForm: {
        name: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
    this.$store.dispatch('GetModules')
  },
  methods: {
    handleSizeChange(val) {
      this.getList(Object.assign(this.filterForm, { pageSize: val }))
    },
    handleCurrentChange(val) {
      this.getList(Object.assign(this.filterForm, { page: val }))
    },
    handleClick(e) {
      console.log('点击了tab')
    },
    handleNodeClick(data) {
      this.filterForm.moduleId = data.id
      this.getList(Object.assign(this.filterForm))
    },
    onSubmit() {
      this.getList()
    },
    onCreate() {
      this.$router.push({
        name: 'indicatorNew'
      })
    },
    onClear(formName) {
      this.filterForm = {
        name: ''
      }
      this.$refs[formName].resetFields()
      this.getList()
    },
    getList() {
      this.listLoading = true

      getIndicators(this.filterForm).then(data => {
        this.list = data.data
        this.meta = data.meta
        this.listLoading = false
      }).catch(err => {
        this.$message.error('获取指标列表失败')
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters([
      'allModules'
    ])
  }
}
</script>

<style lang="scss" scoped>
.datafield {
  background: #fff;
  padding: 20px 40px;
  padding-bottom: 40px;
  height: calc(100vh - 50px);
  // overflow: scroll;
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
}
.pagination {
  text-align: right;
  margin-top: 10px;
  padding-bottom: 10px;
}
</style>
