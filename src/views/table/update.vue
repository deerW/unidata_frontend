<template>
  <div class="app-container database">
    <el-card class="database-container">
      <el-form size="small" :rules="rules" :model="tableForm" ref="tableForm" label-width="100px" class="filter-form-inline">
      <table-form :tableForm="tableForm" />
      <column-form :tableForm="tableForm" />
        <div :gutter="24" class="operation-container">
          <el-button size="small" type="primary" :disabled="isSubmiting" :loading="isSubmiting" @click="submitForm('tableForm')">{{ isSubmiting ? '保存中' : '立即保存' }}</el-button>
          <el-button size="small" @click="onBack" icon="el-icon-back">返回列表页</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>是否保存修改内容?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="noAction">否</el-button>
        <el-button size="small" type="primary" @click="yesAction">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { updateTable, getTable, updateColumn, getColumns } from '@/api/database'
import TableForm from './components/TableForm'
import ColumnForm from './components/ColumnForm'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '数据字典'
  },

  components: {
    TableForm,
    ColumnForm
  },
  data() {
    return {
      isSubmiting: false,
      baseNameLoading: false,
      dialogVisible: false,
      tableForm: {
        databaseName: '',
        tableName: '',
        comment: '',
        moduleId: [],
        involvedFunctions: '',
        contacts: '',
        lastModifiedBy: ''
      },
      rules: {
        databaseName: [{ required: true, message: '请输入库名称' }],
        name: [{ required: true, message: '请输入表名称' }],
        comment: [{ required: true, message: '请输入表说明' }],
        moduleId: [{ required: true, message: '请输入库归属模块' }],
        involvedFunctions: [{ required: true, message: '请输入涉及功能' }],
        contacts: [{ required: true, message: '请输入表联系人' }]
      }
    }
  },
  created() {
    this.getTableDetails()
  },
  methods: {
    noAction() {
      this.dialogVisible = false
      this.$router.push({
        name: 'tableIndex'
      })
    },
    yesAction() {
      this.submitForm('tableForm')
      this.dialogVisible = false
    },
    onBack() {
      this.dialogVisible = true
    },
    getTableDetails() {
      if (!this.$route.params.id) return false
      const id = this.$route.params.id
      getTable(id).then(data => {
        this.tableForm = data.data
        this.tableForm.isActive = String(data.data.isActive)
        this.tableForm.moduleId = [data.data.moduleId]
        getColumns(this.tableForm.id).then(column => {
          this.tableForm.column = column.data
        }).catch(err => {
          this.$message.error('获取表字段信息失败')
          console.log(err)
        })
      }).catch(err => {
        this.$message.error('获取表信息失败')
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isSubmiting = true
          const tableForm = JSON.parse(JSON.stringify(this.tableForm))
          tableForm.moduleId = tableForm.moduleId[tableForm.moduleId.length - 1]
          updateTable(tableForm).then((res) => {
            this.updateColumns()
          }).catch(() => {
            this.$message({
              message: '保存库表信息失败',
              type: 'warning'
            })
            this.isSubmiting = false
          })
        } else {
          return false
        }
      })
    },
    updateColumns() {
      this.isSubmiting = true
      const params = this.tableForm.column
      updateColumn(this.tableForm.id, params).then((res) => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$router.push({
          name: 'tableShow',
          params: {
            id: this.tableForm.id
          }
        })
        this.isSubmiting = false
      }).catch(() => {
        this.$message({
          message: '保存参数信息失败',
          type: 'warning'
        })
        this.isSubmiting = false
      })
    }
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
.operation-container {
  border-top: 2px solid #eee;
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
