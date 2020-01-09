<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <span class="title-text">字段信息</span>
    </el-col>
    <el-col :span="24" class="column-title">
      <el-row :gutter="24">
        <el-col :span="3"><span>字段名称</span></el-col>
        <el-col :span="2"><span>数据类型</span></el-col>
        <el-col :span="3"><span>注释</span></el-col>
        <el-col :span="2"><span>字段属性</span></el-col>
        <el-col :span="3"><span>关键值及任务</span></el-col>
        <el-col :span="3"><span>更新时间</span></el-col>
        <el-col :span="2"><span>使用状态</span></el-col>
        <el-col :span="2"><span>更新人</span></el-col>
        <el-col :span="2"><span>备注</span></el-col>
      </el-row>
    </el-col>
    <el-row class="column-row" v-for="(column, index) in columns" :key="index">
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" :content="column.name" placement="top-start">
            <el-input :readonly="true" style="width: 90%" size="small" v-model="column.name" placeholder="字段名称"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="2">
          <el-tooltip class="item" effect="dark" :content="column.type" placement="top-start">
            <el-input :readonly="true" style="width: 90%" size="small" v-model="column.type" placeholder="数据类型"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" :content="column.comment" placement="top-start">
            <el-input :readonly="true" style="width: 90%" size="small" v-model="column.comment" placeholder="注释"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="2">
          <el-tooltip class="item" effect="dark" :content="column.attribute" placement="top-start">
            <el-select :disabled="true" style="width: 80px" size="small" v-model="column.attribute" placeholder="字段属性">
              <el-option label="主键" value="primary key"></el-option>
              <el-option label="外键" value="1"></el-option>
              <el-option label="关键字段" value="important field"></el-option>
              <el-option label="普通字段" value="general field"></el-option>
            </el-select>
          </el-tooltip>

        </el-col>
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" :content="column.keyValuesTask" placement="top-start">
            <el-input :readonly="true" style="width: 90%" size="small" v-model="column.keyValuesTask" placeholder="关键值及任务"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" :content="column.updatedAt" placement="top-start">
            <el-date-picker
              :readonly="true"
              style="width: 90%"
              size="small"
              v-model="column.updatedAt"
              type="datetime"
              placeholder="更新时间">
            </el-date-picker>
          </el-tooltip>
        </el-col>
        <el-col :span="2">
          <el-select :disabled="true" style="width: 90%" size="small" v-model="column.isActive" placeholder="使用状态">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input :readonly="true" style="width: 90%" size="small" v-model="column.lastModifiedName" placeholder="更新人"></el-input>
        </el-col>
        <el-col :span="2">
          <el-tooltip class="item" effect="dark" :content="column.remark" placement="top-start">
            <el-input :readonly="true" style="width: 90%" size="small" v-model="column.remark" placeholder="备注"></el-input>
          </el-tooltip>
        </el-col>
      </el-row>
  </el-row>
</template>

<script>

export default {
  name: 'ColumnShow',
  metaInfo: {
    title: '数据字典'
  },
  props: ['tableData'],
  data() {
    return {
      columns: [{
        name: '',
        type: '',
        comment: '',
        attribute: '',
        keyValuesTask: '',
        lastModifiedBy: '',
        isActive: 1,
        updator: '',
        remark: ''
      }]
    }
  },
  created() {
    this.columns = this.tableData.column
  },
  methods: {
    addColumn() {
      this.columns.push({
        tableName: this.tableName,
        name: '',
        type: '',
        comment: '',
        attribute: '',
        keyValuesTask: '',
        lastModifiedBy: '',
        isActive: 1,
        updator: '',
        remark: ''
      })
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler(nv, ov) {
        this.columns = nv.column
      }
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
.column-title {
  margin-bottom: 10px;
  font-weight: 500;
}
.column-body {
  max-height: 400px;
  overflow: scroll;
}
.column-row {
  margin-top: 10px;
}
</style>
