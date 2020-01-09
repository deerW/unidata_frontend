<template>
  <div class="app-container">
    <div class="filter-wrap">
      <el-row :gutter="10">

        <el-col :span="4">
          <el-select v-model="searchData.queryId" filterable clearable placeholder="搜索员工姓名" class="select-width">
            <el-option
              v-for="item in userNames"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="searchData.queryAssignGroupId"  filterable clearable placeholder="请选择分单组" class="select-width">
            <el-option
              v-for="item of assignDealGroup"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="searchData.querySaleGroupId"  filterable clearable placeholder="请选择销售组" class="select-width">
            <el-option
              v-for="item of saleGroup"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="searchData.queryRoleId"  filterable clearable placeholder="请选择员工角色" class="select-width">
            <el-option
              v-for="item in userRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <user-table
      @changeSuccess="getUsers"
      :list="list"
      :isLoading="listLoading"
      :assignDealGroup="assignDealGroup"
      :saleGroup="saleGroup"
      :userRoles="userRoles"
      ></user-table>

  </div>
</template>

<script>
import { getUsers, getUserGroups, getRoles } from '@/api/user'

const UserTable = () => import('./components/UserTable')

export default {
  name: 'users',
  metaInfo: {
    title: '员工列表'
  },

  components: {
    UserTable
  },

  data() {
    return {
      list: [],
      userNames: [],
      assignDealGroup: [],
      saleGroup: [],
      userRoles: [],
      listLoading: false,
      searchData: {
        queryId: '',
        queryAssignGroupId: '',
        querySaleGroupId: '',
        queryRoleId: ''
      }
    }
  },

  created() {
    this.initPage()
  },

  watch: {
    searchData: {
      handler: function(newVal) {
        this.getUsers().then(res => {
          this.list = this.list.filter(({ id, groups, saleGroup, ownGroups, roles }) => {
            let isSameId = true
            if (newVal.queryId) {
              isSameId = id === newVal.queryId
            }

            let isSameAssignGroup = true
            if (newVal.queryAssignGroupId) {
              groups = Array.isArray(groups) ? groups : []
              ownGroups = Array.isArray(ownGroups) ? ownGroups : []
              const allGroups = groups.concat(ownGroups)
              isSameAssignGroup = allGroups.some(({ id }) => {
                return id === newVal.queryAssignGroupId
              })
            }

            let isSameSaleGroup = true
            if (newVal.querySaleGroupId) {
              const saleGroups = []
              if (saleGroup) saleGroups.push(saleGroup)
              ownGroups = Array.isArray(ownGroups) ? ownGroups : []
              const allGroups = saleGroups.concat(ownGroups)
              isSameSaleGroup = allGroups.some(({ id }) => {
                return id === newVal.querySaleGroupId
              })
            }

            let isSameRoles = true
            if (newVal.queryRoleId) {
              isSameRoles = roles.some(({ id }) => {
                return id === newVal.queryRoleId
              })
            }

            return isSameId && isSameAssignGroup && isSameSaleGroup && isSameRoles
          })
        }
        ).catch((err) => {
          console.log(err)
        })
      },
      deep: true
    }
  },

  methods: {
    async getAssignDealGroups() {
      try {
        const params = { groupType: 'assignment' }
        const res = await getUserGroups(params)
        this.assignDealGroup = res.userGroups
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    },
    async getSaleGroups() {
      try {
        const params = { groupType: 'sale' }
        const res = await getUserGroups(params)
        this.saleGroup = res.userGroups
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    },
    async getRoles() {
      try {
        const res = await getRoles()
        const data = res
        this.userRoles = data.roles
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    },
    async getUsers() {
      try {
        const res = await getUsers()
        const data = res
        this.list = data.users
        this.userNames = data.users.map(({ id, name }) => ({ id, name }))
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    },

    initPage() {
      const initAffairArr = [
        this.getAssignDealGroups(),
        this.getSaleGroups(),
        this.getRoles(),
        this.getUsers()
      ]
      this.listLoading = true
      Promise.all(initAffairArr).then(res => {
        this.listLoading = false
      }).catch((err) => {
        console.log(err)
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-wrap {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: center;
}
.select-width {
  width: 100%;
}
.el-dialog {
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
}
</style>
