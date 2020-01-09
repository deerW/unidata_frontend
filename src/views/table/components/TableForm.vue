<template>
    <el-row :gutter="24">
      <el-col :span="24">
        <span class="title-text">库表信息</span>
      </el-col>
        <el-col :span="12">
        <el-form-item prop="databaseName" label="库名称" required>
            <el-input v-model="tableForm.databaseName" placeholder="库名称"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="name" label="表名称" required>
            <el-input v-model="tableForm.name" placeholder="表名称"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="comment" label="表说明" required>
            <el-input type="textarea" v-model="tableForm.comment" placeholder="表说明"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="amountOfData"
            label="数据量"
            :rules="[
              { type: 'number', message: '数据量必须为数字值'}
            ]"
          >
            <el-input v-model.number="tableForm.amountOfData" placeholder="数据量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="moduleId" label="归属模块" required>
            <el-cascader
              expand-trigger="hover"
              :options="modules"
              v-model="tableForm.moduleId">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="involvedFunctions" label="涉及功能" required>
            <el-input v-model="tableForm.involvedFunctions" placeholder="涉及功能"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="entranceOfPages" label="页面入口">
            <el-input v-model="tableForm.entranceOfPages" placeholder="页面入口"></el-input>
        </el-form-item>
        </el-col>
        
        <el-col :span="12">
        <el-form-item prop="isActive" label="使用状态" required>
            <el-select v-model="tableForm.isActive" placeholder="使用状态">
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="contacts" label="表联系人" required>
            <el-input v-model="tableForm.contacts" placeholder="表联系人" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="updatedAt" label="更新时间">
          <el-date-picker
            :disabled="true"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="tableForm.updatedAt"
            type="datetime"
            placeholder="更新时间">
            </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="创建时间" prop="createdAt">
          <el-date-picker
            :disabled="true"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="tableForm.createdAt"
            type="datetime"
            placeholder="创建时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="创建人">
            <el-input disabled v-model="tableForm.createdName" placeholder="创建人" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="备注">
            <el-input type="textarea" v-model="tableForm.remark" placeholder="备注" />
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
  props: ['tableForm'],
  data() {
    return {
      modules: []
    }
  },
  created() {
    this.$store.dispatch('GetModules')
    this.modules = this.allModules.filter(item => item.id)
  },
  methods: {
  },
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
