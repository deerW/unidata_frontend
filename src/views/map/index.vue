<template>
  <div class="app-container datafield">
    <el-card header="基础信息" class="filter-container">
      <el-form size="small"
        label-position="right"
        label-width="80px"
        ref="filterForm"
        :rules="rules"
        :model="filterForm"
        class="filter-form-inline"
      >
        <el-form-item label="数据库" prop="databaseId" required>
          <el-select
            v-model="filterForm.databaseId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteBaseNameMethod"
            :loading="databaseNameLoading"
            @change="setTableOptions"
          >
            <el-option
              v-for="item in databaseNames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据表" prop="id" required>
          <el-select
            filterable
            :loading="tableNameLoading"
            :disabled="!filterForm.databaseId"
            v-model="filterForm.id"
            placeholder="请输入关键词"
            @change="setColumnOptions"
          >
            <el-option
              v-for="item in tableNames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段筛选" prop="columnId" required>
          <el-select
            :disabled="!filterForm.id"
            v-model="filterForm.columnId"
            placeholder="请输入关键词"
            filterable
            @change="setRemark"
            >
            <el-option
              v-for="item in columns"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          {{remark}}
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="onSubmit('filterForm')" icon="el-icon-search">查询</el-button>
          <!-- <el-button :loading="loading" @click="onClear('filterForm')" icon="el-icon-error">清除</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <table-list
        :tableNames="tableNames"
        :filterForm="filterForm"
        :masterColumns="columns"
        :loading="loading"
        :list="list" />
    </div>
    <div>
      <relation-chart :loading="loading" :chartData="chartData" :list="list" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getDataLineage, getSelectDatabases, getSelectTables, getTables, getColumns } from '@/api/database'
import TableList from './components/TableList'
import RelationChart from './components/RelationChart'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '血缘地图'
  },

  components: {
    TableList,
    RelationChart
  },
  data() {
    return {
      loading: false,
      list: [],
      chartData: [],
      databaseNameLoading: false,
      tableNameLoading: false,
      filterForm: {
        databaseId: '',
        id: '',
        columnId: '',
        remark: ''
      },
      remark: '',
      databaseNames: [],
      tableNames: [],
      columns: [],
      rules: {
        databaseId: [{ required: true, message: '请选择库名称' }],
        id: [{ required: true, message: '请选择表名称' }],
        columnId: [{ required: true, message: '请选择字段' }]
      }
    }
  },
  created() {
    this.remoteBaseNameMethod('', 'create')
  },
  methods: {
    setRemark(e) {
      this.remark = this.columns.filter(({value}) => value === e)['remark']
    },
    setColumnOptions(e) {
      console.log(e)
      this.filterForm.columnId = ''
      this.columns = []
      getColumns(e).then(data => {
        this.columns = data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
            remark: item.remark
          }
        })
      })
    },
    setTableOptions(e) {
      this.filterForm.id = ''
      this.tableNames = []
      this.tableNames = ''
      this.tableNameLoading = true
      getSelectTables({ databaseId: e, pageSize: 1000 }).then(data => {
        this.tableNames = data.data.map(item => {
          return {
            id: Number(item.id),
            value: Number(item.id),
            label: item.name
          }
        })
        this.tableNameLoading = false
      }).catch(err => {
        this.tableNameLoading = false
        console.log(err)
      })
    },
    onSubmit(formName) {
      this.list = []
      this.chartData = []
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getDataLineage()
        }
      })
    },
    onCreate() {
      this.$router.push({
        name: 'mapNew'
      })
    },
    onClear(formName) {
      this.filterForm = {
        baseName: [],
        tableName: [],
        isActive: '',
        involvedFunctions: ''
      }
      this.$refs[formName].resetFields()
    },
    remoteBaseNameMethod(query, type) {
      if (query !== '' || type === 'create') {
        this.databaseNameLoading = true
        setTimeout(() => {
          this.databaseNameLoading = false
          getSelectDatabases({ query }).then(data => {
            this.databaseNames = data.data.map(item => {
              return {
                value: Number(item.id),
                label: item.cnName
              }
            })
          }).catch(err => {
            this.databaseNameLoading = false
            console.log(err)
          })
        }, type === 'create' ? 0 : 200)
      } else {
        this.options = []
      }
    },
    getDataLineage() {
      // this.loading = true
      
      getDataLineage(this.filterForm.columnId).then(data => {
        console.log(data)
        const list = data.data
        this.list = list
        let chartData = []
        let filterChartData = []
        for (const iterator of list) {
          console.log('iterator', iterator)
          console.log(filterChartData.indexOf(iterator.slaveColumnId))
          if(filterChartData.indexOf(iterator.slaveColumnId) === -1) {
            chartData.push({
              tableId: iterator.slaveColumnTableId,
              tableName: iterator.slaveColumnTableName,
              type: 'master',
              columns: [{
                id: iterator.slaveColumnId,
                name: iterator.slaveColumnName,
                slaveColumnId: iterator.masterColumnId,
                type: iterator.type
              }]
            })
            
            filterChartData.push(iterator.slaveColumnId)
          }
          chartData.push({
            tableId: iterator.masterColumnTableId,
            tableName: iterator.masterColumnTableName,
            type: 'master',
            columns: [{
              id: iterator.masterColumnId,
              name: iterator.masterColumnName,
              type: iterator.type
            }]
          })
        }
        this.chartData = chartData
        console.log('forof', chartData)
      }).catch(err => {
        this.$message.error('获取关系配置失败')
        console.log(err)
      })
       
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}
</script>

<style lang="scss" scoped>
.datafield {
  background: #fff;
  padding: 20px 40px;
  padding-bottom: 40px;
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

</style>
