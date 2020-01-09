<template>
  <el-row :gutter="24" v-if="tableForm.id">
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
    <el-col :span="24" class="column-body">
      <el-row class="column-row" v-for="(column, index) in columns" :key="index">
        <el-col :span="3">
          <el-input style="width: 90%" size="small" v-model="column.name" placeholder="字段名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input style="width: 90%" size="small" v-model="column.type" placeholder="数据类型"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input style="width: 90%" size="small" v-model="column.comment" placeholder="注释"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select style="width: 80px" size="small" v-model="column.attribute" placeholder="字段属性">
            <el-option label="主键" value="primary key"></el-option>
            <el-option label="外键" value="foreign key"></el-option>
            <el-option label="关键字段" value="important field"></el-option>
            <el-option label="普通字段" value="general field"></el-option>
          </el-select>

        </el-col>
        <el-col :span="3">
          <el-input style="width: 90%" size="small" v-model="column.keyValuesTask" placeholder="关键值及任务"></el-input>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 90%"
            size="small"
            v-model="column.updatedAt"
            type="datetime"
            placeholder="更新时间">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-select style="width: 90%" size="small" v-model="column.isActive" placeholder="使用状态">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input disabled style="width: 90%" size="small" v-model="column.lastModifiedName" placeholder="更新人"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input style="width: 90%" size="small" v-model="column.remark" placeholder="备注"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            v-if="index !== 0"
            @click="removeColumn(index)"
            size="mini"
            type="danger"
            icon="el-icon-minus"
            circle></el-button>
          <el-button
            v-if="index + 1 === columns.length"
            @click="addColumn"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            circle></el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'ColumnForm',
  metaInfo: {
    title: '数据字典'
  },
  props: ['tableForm'],
  data() {
    return {
      baseNameLoading: false,
      columns: [{
        name: '',
        type: '',
        comment: '',
        attribute: 'primary key',
        keyValuesTask: '',
        lastModifiedBy: '',
        isActive: 1,
        remark: ''
      }]
    }
  },
  created() {
    this.iniColumns()
  },
  methods: {
    iniColumns() {
      if(!this.columns || !this.columns.length) {
        this.columns = [{
          tableName: this.tableForm.tableName,
          name: '',
          type: '',
          comment: '',
          attribute: 'primary key',
          keyValuesTask: '',
          lastModifiedBy: '',
          isActive: 1,
          updator: '',
          remark: ''
        }]
      }
    },
    addColumn() {
      this.columns.push({
        tableName: this.tableName,
        name: '',
        type: '',
        comment: '',
        attribute: 'primary key',
        keyValuesTask: '',
        lastModifiedBy: '',
        isActive: 1,
        updator: '',
        remark: ''
      })
    },
    removeColumn(index) {
      if (this.columns.length !== 1) this.columns.splice(index, 1)
    }
  },
  watch: {
    tableForm: {
      deep: true,
      handler(nv, ov) {
        this.columns = nv.column
        this.iniColumns()
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
  span:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.column-body {
  max-height: 400px;
  overflow: scroll;
}
.column-row {
  margin-top: 10px;
}
</style>
