<template>
  <div class="app-container database">
    <el-card class="database-container">
      <el-form size="small" :rules="rules" :model="tableForm" ref="tableForm" label-width="100px" class="filter-form-inline">
      <table-form :tableForm="tableForm" />
      <column-form :tableForm="tableForm" />
        <div :gutter="24" class="operation-container">
          <el-button size="small" type="primary" :disabled="isSubmiting" :loading="isSubmiting" @click="submitForm('tableForm')">{{ isSubmiting ? '创建中' : '创建' }}</el-button>
          <el-button size="small" @click="onBack" icon="el-icon-back">返回列表页</el-button>
        </div>
      </el-form>

    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%" center>
      <span>是否新建库表?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="noAction">否</el-button>
        <el-button size="small" type="primary" @click="yesAction">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { createTable } from '@/api/database'
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
        name: '',
        comment: '',
        moduleId: [],
        involvedFunctions: '',
        createdBy: '',
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
  created() {},
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
    submitForm(formName) {
      console.log(formName, this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isSubmiting = true
          const tableForm = Object.assign(this.tableForm, {})
          tableForm.createdBy = tableForm.createdBy || this.userId
          tableForm.lastModifiedBy = this.userId
          tableForm.moduleId = tableForm.moduleId[tableForm.moduleId.length - 1]
          createTable(tableForm).then((res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.isSubmiting = false
            this.$router.push({
              name: 'tableUpdate',
              params: {
                id: res.data.id
              }
            })
          }).catch(() => {
            this.$message({
              message: '保存失败',
              type: 'warning'
            })
            this.isSubmiting = false
          })
        } else {
          return false
        }
      })
    },
    remoteBaseNameMethod(query) {
      if (query !== '') {
        this.baseNameLoading = true
        setTimeout(() => {
          this.baseNameLoading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
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
.operation-container {
  border-top: 2px solid #eee;
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
