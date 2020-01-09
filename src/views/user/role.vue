<template>
  <div class="app-container">

    <el-row>
      <el-button type="primary" size="small" @click.native="handleNewRole()">新增角色</el-button>
    </el-row>

    <el-table
      :data="roles"
      border
      highlight-current-row
      v-loading="tabLoading" >
      <el-table-column label="角色编号" align="center" width="120" prop="id"></el-table-column>
      <el-table-column label="角色名称" align="center" prop="name"></el-table-column>
      <el-table-column label="描述" align="center" prop="description"></el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-row>
            <el-button size="small" @click.native="handleEditRole(scope.row)">编辑</el-button>
            <el-button size="small" @click.native="handleEditRoleUser(scope.row)">设置人员</el-button>
            <el-button size="small" @click.native="handleDeleteRole(scope.row)" type="danger">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination -->
      <!-- @current-change="handleCurrentChange" -->
      <!-- :current-page.sync="currentPage" -->
      <!-- :page-size="listQuery.limit" -->
      <!-- layout="total, prev, pager, next" -->
      <!-- :total="totalCount" > -->
    <!-- </el-pagination> -->

    <el-dialog title="配置角色员工" :visible.sync="dialogFormVisible" width="60%">
      <el-row>角色名称: {{ roleForm.name }}</el-row>
      <el-form :modle="roleForm" size="small">
        <el-form-item label="选择员工">
          <el-select v-model="roleForm.userIds"
            multiple filterable
            no-match-text="无匹配员工">
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, deleteRole, getUsers, updateRoleUser } from '@/api/user'

const roleForm = {
  id: '',
  name: '',
  userIds: []
}
export default {
  name: 'userRoles',
  metaInfo: {
    title: '角色管理'
  },
  data() {
    return {
      tabLoading: false,
      roles: [],
      users: [],
      listQuery: {
        page: 1,
        limit: 100
      },
      currentPage: 1,
      totalCount: 0,
      dialogFormVisible: false,
      roleForm: roleForm
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      this.tabLoading = true
      getRoles(this.listQuery).then(res => {
        const data = res
        this.roles = data.roles
        this.totalCount = data.pagination.totalCount
        this.tabLoading = false
      }).catch(() => {
        this.tabLoading = false
      })
      getUsers().then(res => {
        const data = res
        this.users = data.users
      })
    },
    handleNewRole() {
      this.$router.push({
        path: '/sales/roles/new'
      })
    },
    handleEditRole(row) {
      this.$router.push({
        path: `/sales/roles/${row.id}`
      })
    },
    handleEditRoleUser(row) {
      this.roleForm.id = row.id
      this.roleForm.name = row.name
      this.roleForm.userIds = row.users ? row.users.map(({ id }) => id) : []
      this.dialogFormVisible = true
    },
    handleDeleteRole(row) {
      this.$confirm(`此操作将永久删除角色${row.name},是否继续`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteRole(row.id)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        const index = this.roles.findIndex(({ id }) => id === row.id)
        this.roles.splice(index, 1)
      }
      ).catch((err) => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: '已取消删除'
        })
      })
    },
    handleSubmit() {
      updateRoleUser(this.roleForm.id, this.roleForm).then(res => {
        this.$message({
          message: '更新角色下员工成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getRoles()
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getRoles()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-pagination {
    text-align: center;
  }
  .el-select {
    width: 80%;
  }
</style>
