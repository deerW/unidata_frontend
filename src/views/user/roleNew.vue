<template>
  <div>
    <el-form :model="roleForm" :rules="rules" ref="roleForm" class="role-form" label-width="110px">


      <div class="name-desc">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </div>

      <div class="model-header">
        <h3>个人模块</h3>
      </div>
      <el-form-item label="页面权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showDashboard">销售面板</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="model-header">
        <h3>交易模块</h3>
      </div>
      <el-form-item label="页面权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showDistributionDeals">查看未分配交易页面</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="操作权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canUpdateUtm">修改渠道</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canUpdateCooperationSales">修改协助人</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canUpdateSecretary">修改小秘书</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canQuerySales">筛选客户经理</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="数据权限">
        <el-row>
          <el-col :span="8">
            <el-tooltip content="两项都不选时，默认可查看自己所属交易" placement="bottom-start">
              <el-checkbox @change="$event === true ? roleForm.permissions.showAllDeals=!$event : {}" v-model="roleForm.permissions.showDealsInGroup">查看组内交易</el-checkbox>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <el-tooltip content="两项都不选时，默认可查看自己所属交易" placement="bottom-start">
              <el-checkbox @change="$event === true ? roleForm.permissions.showDealsInGroup=!$event : {}" v-model="roleForm.permissions.showAllDeals">查看全部交易</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="model-header">
        <h3>员工模块</h3>
      </div>
      <el-form-item label="页面权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showUserList">查看员工列表页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showUserGroup">查看分单，销售组页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showSalesArrangements">查看排班页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showUserRoles">查看角色列表页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showReceiveDeals">查看接单列表页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showScoreWeight">查看权重配置页面</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showAssignedConfig">查看分单设置页面</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="操作权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canEditUser">编辑员工</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.canEditGroup">编辑分单，销售组</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="数据权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showAllUsers">查看全部员工</el-checkbox>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showAllGroups">查看全部分单, 销售组</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="model-header">
        <h3>客户模块</h3>
      </div>
      <el-form-item label="数据权限">
        </el-row>
          <el-col :span="8">
            <el-tooltip content="两项都不选时默认可查看本人所属客户" placement="bottom-start" visible-arrow="false">
              <el-checkbox @change="$event === true ? roleForm.permissions.showAllCustomers=!$event : {}" v-model="roleForm.permissions.showGroupCustomers">查看组内客户</el-checkbox>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <el-tooltip content="两项都不选时默认可查看本人所属客户" placement="bottom-start">
              <el-checkbox @change="$event === true ? roleForm.permissions.showGroupCustomers=!$event : {}" v-model="roleForm.permissions.showAllCustomers">查看全部客户</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="model-header">
        <h3>小秘书模块</h3>
      </div>
      <el-form-item label="页面权限">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="roleForm.permissions.showWechatyConfig">查看小秘书管理页面</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>


  </el-form>
  <div class="submit-button">
    <el-button type="primary" :loading="isSubmiting" @click="onSubmit('roleForm')">保存角色</el-button>
    <el-button @click="cancel" :disabled="isSubmiting">取消</el-button>
  </div>
  </div>
</template>

<script>
import { getRole, createRole, updateRole } from '@/api/user'

const defaultRoleForm = {
  id: undefined,
  name: '',
  description: '',
  permissions: {
    showDistributionDeals: false,
    canQuerySales: false,
    canUpdateUtm: false,
    canUpdateCooperationSales: false,
    canUpdateSecretary: false,
    showAllDeals: false,
    showDealsInGroup: false,
    showUserList: false,
    showUserGroup: false,
    showSalesArrangements: false,
    showUserRoles: false,
    showReceiveDeals: false,
    showScoreWeight: false,
    canEditUser: false,
    canEditGroup: false,
    showAllUsers: false,
    showAllGroups: false,
    showAllCustomers: false,
    showGroupCustomers: false,
    showDashboard: false
  }
}
const rules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在3到20个字符之间', trigger: 'blur' }
  ]
}
export default {
  name: 'roleNew',
  metaInfo() {
    return {
      title: this.isNew ? '新建角色' : '编辑角色'
    }
  },
  data() {
    return {
      isNew: false,
      roleForm: defaultRoleForm,
      rules: rules,
      isSubmiting: false
    }
  },
  methods: {
    createRole() {
      return createRole({ role: this.roleForm }).then((res) => {
        this.$message({
          message: '创建角色成功',
          type: 'success'
        })
        return res
      })
    },
    updateRole() {
      return updateRole(this.roleForm.id, { role: this.roleForm }).then((res) => {
        this.$message({
          message: '编辑角色成功',
          type: 'success'
        })
        return res
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isSubmiting = true;
          (this.isNew ? this.createRole() : this.updateRole()).then(res => {
            this.isSubmiting = false
            this.$router.push({
              name: 'userRoles'
            })
            window.location.reload()
          }).catch(() => {
            this.isSubmiting = false
          })
        }
      })
    },
    cancel() {
      this.$confirm('是否取消本次编辑选择离开', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.go(-1)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.path.includes('new')) {
      next(vm => {
        vm.isNew = true
      })
    } else {
      getRole(to.params.id).then(res => {
        next(vm => { vm.roleForm = res })
      }).catch(err => {
        console.log(err)
        next(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .role-form {
    margin-top: 40px;
    margin-left:10px;

      .name-desc {
        margin-bottom:40px;
        .el-form-item {
          margin-bottom: 20px;
        }
      }
      .model-header {
        font-size:1em;
        margin-top:45px;
        padding-left:20px;;
        padding-bottom:20px;
      }

      .el-form-item {
        width: 97%;
        margin-bottom:5px;
      }
      .el-input {
        width: 80%;
      }
  }
  .submit-button {
    margin-left: 25px;
    margin-top: 25px;
    display: flex;
    justify-content: flex-start;
  }
</style>
