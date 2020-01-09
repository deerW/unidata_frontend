<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <span class="title-text">库表信息</span>
      </el-col>
        <el-col :span="12">
        <el-form-item prop="databaseName" label="库名称" required>
          <span>{{ tableData.databaseName }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="tableName" label="表名称" required>
          <span>{{ tableData.name }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="comment" label="表说明" required>
          <span>{{ tableData.comment }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="amountOfData" label="数据量">
          <span>{{ tableData.amountOfData }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="moduleId" label="归属模块" required>
          <span>{{ tableData.moduleName }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="involvedFunctions" label="涉及功能" required>
          <span>{{ tableData.involvedFunctions }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="entranceOfPages" label="页面入口">
          <span>{{ tableData.entranceOfPages }}</span>
        </el-form-item>
        </el-col>
        
        <el-col :span="12">
        <el-form-item prop="isActive" label="使用状态" required>
          <span>{{ tableData.isActive ? '关闭' : '开启' }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="contacts" label="表联系人" required>
          <span>{{ tableData.contacts }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="updatedAt" label="更新时间" required>
          <span>{{ tableData.updatedAt }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="创建时间">
          <span>{{ tableData.createdAt }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="创建人">
          <span>{{ tableData.createdName }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="备注">
          <span>{{ tableData.remark }}</span>
        </el-form-item>
      </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'tableShow',
  metaInfo: {
    title: '新建库表'
  },
  props: ['tableData'],
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    handleModuleChange() {

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
