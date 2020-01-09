<template>
  <el-dialog title="编辑员工" :visible.sync="isShowDialog" width="500px">
    <el-form :model="userForm" :rules="rules" ref="userForm" size="small">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="userForm.name" auto-complete="off" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="wechatId" :label-width="formLabelWidth">
        <el-input v-model="userForm.wechatId" auto-complete="off" placeholder="请输入员工微信"></el-input>
      </el-form-item>
      <el-form-item label="分单组" prop="groupIds" :label-width="formLabelWidth">
        <el-select v-model="userForm.groupIds" multiple filterable clearable placeholder="请选择分单组">
          <el-option
            v-for="item in assignDealGroup"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售组" prop="saleGroupId" :label-width="formLabelWidth">
        <el-select v-model="userForm.saleGroupId" filterable clearable placeholder="请选择销售组">
          <el-option
            v-for="item in saleGroup"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工角色" :label-width="formLabelWidth">
        <el-select v-model="userForm.roleIds" multiple filterable clearable placeholder="请选择员工角色">
          <el-option
            v-for="item in userRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最大接单量" prop="maxCount" :label-width="formLabelWidth">
        <el-input-number v-model="userForm.maxCount" size="mini" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="参与销售" :label-width="formLabelWidth">
        <el-switch v-model="userForm.isParticipateDistribution"></el-switch>
      </el-form-item>

      <el-form-item v-if="userForm.isParticipateDistribution" label="销售星级" :label-width="formLabelWidth">
        <el-select v-model="userForm.star" filterable clearable placeholder="请选择销售星级">
          <el-option
            v-for="item in saleStars"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('userForm')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('userForm')" size="small">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateUser } from '@/api/user'

export default {
  name: 'UserEditDialog',

  data() {
    return {
      formLabelWidth: '100px',
      saleStars: [
        { id: 0, name: '请选择' },
        { id: 1, name: '一星销售' },
        { id: 2, name: '二星销售' },
        { id: 3, name: '三星销售' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        wechatId: [
          { required: true, message: '请输入员工微信', trigger: 'blur' }
        ],
        groupIds: [
          { required: true, message: '请选择分单组', trigger: 'change' }
        ],
        saleGroupId: [
          { required: true, message: '请选择销售组', trigger: 'change' }
        ]
      }
    }
  },

  props: {
    userForm: {
      type: Object,
      required: true
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },

    assignDealGroup: {
      type: Array,
      required: true
    },

    saleGroup: {
      type: Array,
      required: true
    },

    userRoles: {
      type: Array,
      required: true
    }
  },

  computed: {
    isShowDialog: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        this.$emit('update:dialogFormVisible', val)
      }
    }
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.isShowDialog = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(this.userForm.id, this.userForm).then(res => {
            return this.$emit('changeMaxCount', this.userForm, this.userForm.maxCount)
          }).then(res => {
            this.$message({
              message: '员工修改成功',
              type: 'success'
            })
            this.isShowDialog = false
            this.$emit('changeSuccess')
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
