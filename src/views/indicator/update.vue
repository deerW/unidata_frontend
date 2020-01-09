<template>
  <div class="app-container database">
    <el-card class="database-container">
      <el-form size="small" :rules="rules" :model="indicatorForm" ref="indicatorForm" label-width="120px" class="filter-form-inline">
        <indicator-form :indicatorForm="indicatorForm" />
        <div class="operation-container">
          <el-button size="small" type="primary" :disabled="isSubmiting" :loading="isSubmiting" @click="submitForm('indicatorForm')">{{ isSubmiting ? '保存中' : '立即保存' }}</el-button>
          <el-button size="small" @click="onBack" icon="el-icon-back">返回列表</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%" center>
      <span>是否保存修改信息?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="noAction">否</el-button>
        <el-button size="small" type="primary" @click="yesAction">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { updateIndicator, getIndicator } from '@/api/indicator'
import IndicatorForm from './components/IndicatorForm'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '数据字典'
  },

  components: {
    IndicatorForm
  },
  data() {
    return {
      dialogVisible: false,
      isSubmiting: false,
      baseNameLoading: false,
      indicatorForm: {
        numericType: '',
        databaseName: '',
        tableName: '',
        comment: '',
        moduleId: [],
        involvedFunctions: '',
        contacts: '',
        lastModifiedBy: ''
      },
      rules: {
        name: [{ required: true, message: '请输入指标名称' }],
        type: [{ required: true, message: '请输入指标类型' }],
        numericType: [{ required: true, message: '请输入数据类型' }],
        moduleId: [{ required: true, message: '请输入归属模块' }],
        businessDefinition: [{ required: true, message: '请输入业务口径标识' }],
        databaseTableInformation: [{ required: true, message: '请输入库表信息' }],
        dataUpdateAging: [{ required: true, message: '请输入数据更新时效' }]
      }
    }
  },
  created() {
    this.getIndicatorDetails()
    if (!this.allModules.length) this.$store.dispatch('GetModules')
  },
  methods: {
    getIndicatorDetails() {
      if (!this.$route.params.id) return false
      const id = this.$route.params.id
      getIndicator(id).then(data => {
        this.indicatorForm = data.data
        this.indicatorForm.isActive = String(data.data.isActive)
        this.indicatorForm.moduleId = [this.indicatorForm.moduleId]
      }).catch(err => {
        this.$message.error('获取表信息失败')
        console.log(err)
      })
    },
    noAction() {
      this.dialogVisible = false
      this.$router.push({
        name: 'indicatorIndex'
      })
    },
    yesAction() {
      this.submitForm('indicatorForm')
      this.dialogVisible = false
    },
    onBack() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isSubmiting = true
          // const indicatorForm = Object.assign(this.indicatorForm, {})
          const indicatorForm = JSON.parse(JSON.stringify(this.indicatorForm))
          indicatorForm.moduleId = this.indicatorForm.moduleId[this.indicatorForm.moduleId.length - 1]
          if (!indicatorForm.remark) delete indicatorForm.remark
          delete indicatorForm.moduleName
          updateIndicator(indicatorForm).then((res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({
              name: 'indicatorShow',
              params: {
                id: res.data.id
              }
            })
            this.isSubmiting = false
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
      'userId',
      'allModules'
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
