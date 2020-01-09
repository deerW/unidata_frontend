<template>
  <div class="app-container database">
    <el-form size="small" :model="indicatorData" :inline="true"  ref="indicatorForm" label-width="120px" class="filter-form-inline">
      <el-card style="margin-bottom: 10px">
        <el-form-item label="指标名称">
          <el-select
            v-model="indicatorData.id"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteindicatorNameMethod"
            :loading="indicatorNameLoading"
            >
            <el-option
              v-for="item in indicatorNames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="isSubmiting" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-card>
      <indicator-show :indicatorData="indicatorData" />
      <div v-if="!hiddenOperation" class="operation-container">
        <el-button size="small" type="primary" @click="goUpdate()">编辑</el-button>
        <el-button size="small" @click="onBack" icon="el-icon-back">返回列表</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getIndicator, getSelectIndicators } from '@/api/indicator'
import IndicatorShow from './components/IndicatorShow'

export default {
  name: 'dashboard',
  metaInfo: {
    title: '数据字典'
  },
  props: {
    hiddenOperation: {
      default: false,
      type: Boolean
    }
  },
  components: {
    IndicatorShow
  },
  data() {
    return {
      isSubmiting: false,
      indicatorNameLoading: false,
      indicatorNames: [],
      indicatorData: {
        databaseName: '',
        tableName: '',
        comment: '',
        moduleId: [],
        involvedFunctions: '',
        contacts: '',
        lastModifiedBy: ''
      }
    }
  },
  created() {
    this.remoteindicatorNameMethod('', 'list')
    this.getIndicatorDetails(this.$route.params.id)
  },
  methods: {
    onSubmit() {
      this.getIndicatorDetails(this.indicatorData.id)
    },
    remoteindicatorNameMethod(query, type) {
      if (query !== '' || type === 'list') {
        this.indicatorNameLoading = true
        setTimeout(() => {
          this.indicatorNameLoading = false
          getSelectIndicators({ name: query }).then(data => {
            this.indicatorNames = data.data.map(item => {
              return {
                value: item.id,
                label: item.name
              }
            })
          }).catch(err => {
            this.indicatorNameLoading = false
            console.log(err)
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    goUpdate() {
      this.$router.push({
        name: 'indicatorUpdate',
        params: {
          id: this.indicatorData.id || this.$route.params.id
        }
      })
    },
    getIndicatorDetails(id) {
      if (!id) return false
      getIndicator(id).then(data => {
        this.indicatorData = data.data
      }).catch(err => {
        this.$message.error('获取表信息失败')
        console.log(err)
      })
    },
    onBack() {
      this.$router.push({
        name: 'indicatorIndex'
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

.operation-container {
  border-top: 2px solid #eee;
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
