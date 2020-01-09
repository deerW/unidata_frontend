<template>
  <div>
    <el-card header="库表信息">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="name" label="指标名称" required>
            <span>{{ indicatorData.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="databaseTableInformation" label="库表信息" required>
            <span>{{ indicatorData.databaseTableInformation }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" label="指标类型" required>
            <span>{{ indicatorData.type }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="dataUpdateAging" label="数据更新时效" required>
            <span>{{ indicatorData.dataUpdateAging }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="indicator-card" header="模型信息">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="name" label="指标名称" required>
            <span>{{ indicatorData.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="搜索引擎">
            <span>mysql</span>
          </el-form-item>
        </el-col>
          
        <el-col :span="24">
          <el-form-item prop="sqlInformation" label="SQL预览">
            <span>{{ indicatorData.sqlInformation }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="calculationLogic" label="计算逻辑">
            <span>{{ indicatorData.calculationLogic }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="supportDimension" label="支持维度">
            <span>{{ indicatorData.supportDimension }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="analysisDimension" label="分析维度">
            <span>{{ indicatorData.analysisDimension }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <span>{{ indicatorData.remark }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作人">
            <span>{{ indicatorData.lastModifiedName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间">
            <span>{{ indicatorData.updatedAt }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tableNew',
  metaInfo: {
    title: '新建库表'
  },
  props: ['indicatorData'],
  data() {
    return {}
  },
  created() {
  },
  methods: {},
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
.indicator-card {
  margin-top: 10px;
}

</style>
