<template>
  <el-dialog
    :title="isGroupCreate ? '创建销售组' : '修改销售组'" 
    :visible.sync="isDialogShow" 
    width="500px">

    <el-form
      :label-width="formLabelWidth"
      :model="formData"
      :rules="rules"
      ref="groupForm" 
      size="small">

      <el-form-item label="销售组名称" prop="name">
        <el-input
          v-model="formData.name"
          auto-complete="off"
          placeholder="请输入销售组名称"></el-input>
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
          v-model="formData.saleIds"
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
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm" size="small">{{ isGroupCreate ? '创 建' : '修 改'  }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUsers } from '@/api/user'

export default {
  name: 'AddUserGroupDialog',

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
        saleIds: []
      },
      rules: {
        name: [
          { required: true, message: '请输入销售组名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入销售组描述', trigger: 'blur' }
        ],
        ownerIds: [
          { required: true, message: '请选择组长', trigger: 'change' }
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
