<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <span class="title-text">基础信息</span>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="name" label="指标名称" required>
        <el-input v-model="indicatorForm.name" placeholder="指标名称"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="type" label="指标类型" required>
          <el-input v-model="indicatorForm.type" placeholder="指标类型"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="moduleId" label="归属模块" required>
        <el-cascader
          expand-trigger="hover"
          :options="modules"
          v-model="indicatorForm.moduleId">
            </el-cascader>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="businessDefinition" label="业务口径定义" required>
        <el-input v-model="indicatorForm.businessDefinition" placeholder="业务口径定义"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="unit" label="单位">
        <el-input v-model="indicatorForm.unit" placeholder="单位"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="filterBy" label="筛选条件">
        <el-input v-model="indicatorForm.filterBy" placeholder="筛选条件"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="isActive" label="使用状态">
        <el-select v-model="indicatorForm.isActive" placeholder="使用状态">
        <el-option label="开启" value="1"></el-option>
        <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="locationFrom" label="沉淀位置">
        <el-input v-model="indicatorForm.locationFrom" placeholder="沉淀位置"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <span class="title-text">技术信息</span>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="databaseTableInformation" label="库表信息" required>
        <el-input v-model="indicatorForm.databaseTableInformation" placeholder="库表信息"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="dataUpdateAging" label="数据更新时效" required>
        <el-input v-model="indicatorForm.dataUpdateAging" placeholder="数据更新时效"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="numericType" label="数据类型" required>
        <el-input v-model="indicatorForm.numericType" placeholder="数据类型"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="sqlInformation" label="SQL信息">
        <el-input :rows="6" type="textarea" v-model="indicatorForm.sqlInformation" placeholder="SQL信息"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="calculationLogic" label="计算逻辑">
        <el-input v-model="indicatorForm.calculationLogic" placeholder="计算逻辑"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="supportDimension" label="支持维度">
        <el-input v-model="indicatorForm.supportDimension" placeholder="支持维度"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item prop="analysisDimension" label="分析维度">
        <el-input v-model="indicatorForm.analysisDimension" placeholder="分析维度"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" v-model="indicatorForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tableNew',
  metaInfo: {
    title: '新建库表'
  },
  props: ['indicatorForm'],
  data() {
    return {
      modules: []
    }
  },
  created() {
    this.$store.dispatch('GetModules')
    this.modules = this.allModules.filter(item => item.id)
  },
  methods: {},
  computed: {
    ...mapGetters([
      'allModules'
    ])
  },
  watch: {
    allModules(val) {
      this.modules = val.filter(item => item.id)
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
