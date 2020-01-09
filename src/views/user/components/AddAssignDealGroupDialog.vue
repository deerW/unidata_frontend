<template>
  <el-dialog
    :title="isGroupCreate ? '创建分单组' : '修改分单组'" 
    :visible.sync="isDialogShow" 
    width="500px">

    <el-form
      :label-width="formLabelWidth"
      :model="formData"
      :rules="rules"
      ref="groupForm" 
      size="small">

      <el-form-item label="分单组名称" prop="name">
        <el-input
          v-model="formData.name"
          auto-complete="off"
          placeholder="请输入分单组名称"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" auto-complete="off" placeholder="请输入描述"></el-input>
      </el-form-item>

      <el-form-item label="组长" prop="ownerIds">
        <el-select
          v-model="formData.ownerIds"
          multiple
          filterable
          placeholder="请选择组长">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择员工" prop="sales">
        <el-select
          v-model="formData.userIds"
          multiple filterable
          placeholder="请选择组员">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最低分数" prop="lowerPoint">
        <el-input
          type="number"
          v-model.number="formData.lowerPoint"></el-input>
      </el-form-item>

      <el-form-item label="最高分数" prop="higherPoint">
        <el-input
          type="number"
          v-model.number="formData.higherPoint"></el-input>
      </el-form-item>

      <el-form-item label="分单来源">
        <utm-select v-model="formData.utmOptions"></utm-select>
      </el-form-item>

      <el-form-item label="分单类型">
        <el-radio-group v-model="formData.assignmentStrategy">
          <el-radio label="regular">智能分单</el-radio>
          <el-radio label="one_by_one">按顺序分单</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm" size="small">{{ isGroupCreate ? '创 建' : '修 改'  }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUsers } from '@/api/user'

const UtmSelect = () => import('./UtmSelect')

export default {
  name: 'AddUserGroupDialog',

  components: {
    UtmSelect
  },

  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },

    isGroupCreate: {
      type: Boolean,
      default: true
    },

    groupForm: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      userList: [],
      formLabelWidth: '100px',
      formData: {
        name: '',
        description: '',
        ownerIds: '',
        userIds: [],
        lowerPoint: 0,
        higherPoint: 0,
        utmOptions: [],
        assignmentStrategy: 'regular'
      },
      rules: {
        name: [
          { required: true, message: '请输入分单组名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入分单组描述', trigger: 'blur' }
        ],
        ownerIds: [
          { required: true, message: '请输选择组长', trigger: 'change' }
        ],
        lowerPoint: [
          { required: true, message: '请输入最低分数', trigger: 'blur' }
        ],
        higherPoint: [
          { required: true, message: '请输入最低分数', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    isDialogShow: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        this.$emit('update:dialogFormVisible', val)
      }
    }
  },

  created() {
    this.handleOpenDialog()
  },

  methods: {
    handleOpenDialog() {
      getUsers().then(res => {
        const data = res
        this.userList = data.users
      }).catch(err => {
        console.log('获取员工列表失败: ', err)
      })
    },

    submitForm() {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'error'
          })
          return false
        }
      })
    },

    resetForm() {
      this.$refs['groupForm'].resetFields()
      this.isDialogShow = false
    }
  },

  watch: {
    groupForm: {
      deep: true,
      handler(val) {
        this.formData = JSON.parse(JSON.stringify(val))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
  .el-cascader {
    width: 300px;
  }
}
</style>
