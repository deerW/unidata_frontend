<template>
  <div class="app-container database">
    <el-card class="database-container">
      <el-form size="small" :model="tableData" ref="tableForm" label-width="100px" class="filter-form-inline">
      <table-show :tableData="tableData" />
      <column-show :tableData="tableData" />
         <div :gutter="24" class="operation-container">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="goUpdate()">去编辑</el-button>
          <el-button size="small" @click="onBack" icon="el-icon-back">返回</el-button>
         </div>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getTable, getColumns } from '@/api/database'
import TableShow from './components/TableShow'
import ColumnShow from './components/ColumnShow'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '数据字典'
  },

  components: {
    TableShow,
    ColumnShow
  },
  data() {
    return {
      isSubmiting: false,
      baseNameLoading: false,
      tableData: {
        databaseName: '',
        tableName: '',
        comment: '',
        moduleId: [],
        involvedFunctions: '',
        contacts: '',
        lastModifiedBy: '',
        column: []
      }
    }
  },
  created() {
    this.getTableDetails()
  },
  methods: {
    goUpdate() {
      this.$router.push({
        name: 'tableUpdate',
        params: {
          id: this.$route.params.id
        }
      })
    },
    getTableDetails() {
      if (!this.$route.params.id) return false
      const id = this.$route.params.id
      getTable(id).then(data => {
        this.tableData = data.data
        getColumns(this.tableData.id).then(column => {
          this.tableData.column = column.data
          console.log('aaa', this.tableData.column)
        }).catch(err => {
          this.$message.error('获取表字段信息失败')
          console.log(err)
        })
      }).catch(err => {
        this.$message.error('获取表信息失败')
        console.log(err)
      })
    },
    handleModuleChange() {

    },
    onBack() {
      this.$router.push({
        name: 'tableIndex'
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
.database {
  background: #fff;
  padding-bottom: 40px;
 
}
.title-text {
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
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
.operation-container {
  border-top: 2px solid #eee;
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
