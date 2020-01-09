<template>
  <el-card class="home-page-order-list">
    <div slot="header" class="clearfix">
      <span>关联配置</span>
      <el-button v-if="!isEditing && filterForm.id" @click="toggleEdit" class="right-button" type="text">编辑</el-button>
      <el-button v-if="isEditing" @click="cancel" class="right-button cancel" type="text">取消</el-button>
      <el-button v-if="isEditing" @click="save" class="right-button" type="text">保存</el-button>
    </div>
    
    <el-table
      v-if="!isEditing"
      :data="data"
      v-loading="loading"
      element-loading-text="给我一点时间"
      style="width: 100%">
      <el-table-column label="主数据表" prop="masterColumnTableName"></el-table-column>
      <el-table-column label="主数据字段" prop="masterColumnName"></el-table-column>
      <el-table-column label="字段说明" prop="masterColumnComment" />
      <el-table-column label="关联数据表" prop="slaveColumnTableName"></el-table-column>
      <el-table-column label="关联数据字段" prop="slaveColumnName"></el-table-column>
      <el-table-column label="建议关联方式" prop="type"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
    <el-row :gutter="24" v-if="isEditing">
      <el-col :span="24" class="column-title">
        <el-row :gutter="24">
          <el-col :span="3"><span>主数据表</span></el-col>
          <el-col :span="3"><span>主数据字段</span></el-col>
          <el-col :span="3"><span>字段说明</span></el-col>
          <el-col :span="3"><span>关联数据表</span></el-col>
          <el-col :span="3"><span>关联数据字段</span></el-col>
          <el-col :span="3"><span>建议关联方式</span></el-col>
          <el-col :span="3"><span>备注</span></el-col>
          <el-col :span="3"><span>操作</span></el-col>
        </el-row>
      </el-col>
      <el-col :span="24" class="column-body">
        <el-row class="column-row" v-for="(item, index) in formData" :key="index">
          <el-col :span="3">
            <el-select
              size="small"
              style="width: 90%"
              disabled
              v-model="filterForm.id"
              >
              <el-option
                v-for="item in tableNames"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input style="width: 90%" size="small" v-model="item.masterColumnTableName" placeholder="主数据表"></el-input> -->
          </el-col>
          <el-col :span="3">
            <el-select
              size="small"
              style="width: 90%"
              v-model="item.columnId"
              placeholder="主数据字段"
              >
              <el-option
                v-for="item in masterColumns"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input style="width: 90%" size="small" v-model="item.masterColumnName" placeholder="主数据字段"></el-input> -->
          </el-col>
          <el-col :span="3">
            <el-input style="width: 90%" size="small" v-model="item.masterColumnComment" placeholder="字段说明"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select
              size="small"
              style="width: 90%"
              v-model="item.slaveColumnTableId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteTableNameMethod"
              :loading="tableNameLoading"
              @change="setTableOptions"
            >
              <el-option
                v-for="item in slaveTableNames"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select
              size="small"
              style="width: 90%"
              v-model="item.slaveColumnId"
              placeholder="关联数据字段"
              >
              <el-option
                v-for="item in slaveColumns"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input style="width: 90%" size="small" v-model="item.type" placeholder="关联数据字段"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input style="width: 90%" size="small" v-model="item.remark" placeholder="备注"></el-input>
          </el-col>
          <el-col :span="3" class="opareation">
            <el-button
              v-if="index !== 0"
              @click="removeDataLineage(index)"
              size="mini"
              type="danger"
              icon="el-icon-minus"
              circle></el-button>
            <el-button
              v-if="index + 1 === formData.length"
              @click="addDataLineage"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              circle></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { updateDataLineage, getSelectTables, getDataLineage } from '@/api/database'
export default {
  name: 'OrderList',
  data() {
    return {
      isEditing: false,
      data: [],
      formData: [],
      tableNameLoading: false,
      slaveTableNames: [],
      slaveColumns: []
    }
  },
  props: ['list', 'loading', 'filterForm', 'tableNames', 'masterColumns'],
  created() {
    this.data = this.list
    this.addDataLineage()
  },
  methods: {
    setTableOptions(e) {
      // this.filterForm.columnId = ''
      this.slaveColumns = []
      const selectedTable = this.slaveTableNames.filter(item => Number(e) === Number(item.id))
      this.remark = selectedTable ? selectedTable[0].remark : ''
      const slaveColumns = selectedTable ? selectedTable[0].column : []
      if (slaveColumns.length) {
        this.slaveColumns = slaveColumns.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    remoteTableNameMethod(query, type) {
      if (query !== '' || type === 'create') {
        this.databaseNameLoading = true
        setTimeout(() => {
          this.databaseNameLoading = false
          getSelectTables({ name: query }).then(data => {
            this.slaveTableNames = data.data.map(item => {
              return {
                id: Number(item.id),
                value: Number(item.id),
                column: item.column,
                label: item.name,
                remark: item.remark
              }
            })
          }).catch(err => {
            this.databaseNameLoading = false
            console.log(err)
          })
        }, type === 'create' ? 0 : 200)
      } else {
        this.options = []
      }
    },
    addDataLineage() {
      this.formData.push({
        masterColumnTableName: this.filterForm.id,
        masterColumnName: '',
        masterColumnId: '',
        masterColumnComment: '',
        slaveColumnName: '',
        slaveColumnId: '',
        slaveColumnTableName: '',
        type: '',
        remark: ''
      })
    },
    removeDataLineage(index) {
      if (this.formData.length !== 1) this.formData.splice(index, 1)
    },
    toggleEdit() {
      this.isEditing = true
      this.formData = JSON.parse(JSON.stringify(this.data))
      if(!this.formData.length) this.addDataLineage()
    },
    save() {
      console.log(this.formData)
      const data = this.formData
      let createArr = []
      createArr = data.filter(item => {
        return !item.id
      })
      let updateArr = []
      updateArr = data.filter(item => {
        return item.id
      })
      console.log('updateArr', updateArr)
      updateDataLineage({columnId: this.filterForm.columnId, data: updateArr}).then(_ => {
        getDataLineage(this.filterForm.columnId).then(res => {
          this.data = res.data
        })
      })
      this.isEditing = false
    },
    cancel() {
      this.isEditing = false
    }
  },
  watch: {
    list(val) {
      this.data = val
    },
    filterForm (val) {
      this.isEditing = false
    }
  },
}
</script>

<style lang="scss" scoped>
.home-page-order-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 10px;
  // padding: 20px 10px;
  overflow: scroll;

  .list-title {
    width: 120px;
    height: 30px;
    font-family: PingFang-SC;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: #303133;
  }
  .deal-link {
    color: #30bfbf;
    font-weight: 500;
    cursor: pointer;
  }
  .right-button {
    float: right;
    padding: 3px 0;
    margin-right: 5px;
  }
  .right-button.cancel {
    float: right;
    padding: 3px 0;
    color: #999;
  }
  .opareation {
    padding-left: 10px;
  }
  .column-row {
    margin-top: 10px;
  }
}
</style>
