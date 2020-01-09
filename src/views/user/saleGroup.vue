<template>
  <div class="app-container">
    <div class="filter-wrap">
      <el-button
        v-permission="['canEditGroup']"
        type="primary"
        size="small"
        @click="handleNew()">新建销售组</el-button>
    </div>

    <group-table
      :groupList="list"
      groupType="sale"
      v-loading="listLoading"
      @editRow="handleEdit"
      @deleteRow="handleDelete"
      ></group-table>

    <add-sale-group-dialog
      :dialogFormVisible.sync="dialogFormVisible"
      :isGroupCreate="isGroupCreate"
      :groupForm="groupForm"
      @submit="submitForm"
      ></add-sale-group-dialog>

  </div>
</template>

<script>
import { getUserGroups, createUserGroup, updateUserGroup, deleteUserGroup } from '@/api/user'

const GroupTable = () => import('./components/GroupTable')
const AddSaleGroupDialog = () => import('./components/AddSaleGroupDialog')

export default {
  name: 'saleGroup',
  metaInfo: {
    title: '销售组'
  },

  components: {
    AddSaleGroupDialog,
    GroupTable
  },

  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      isGroupCreate: false,
      editGroupId: null,
      groupForm: {
        name: '',
        description: '',
        ownerIds: '',
        saleIds: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = { groupType: 'sale' }
      getUserGroups(params).then(res => {
        const data = res
        this.list = data.userGroups
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.getList()
    },

    handleNew() {
      this.groupForm = {
        name: '',
        description: '',
        ownerIds: [],
        saleIds: [],
        lowerPoint: '',
        higherPoint: '',
        utmOptions: []
      }
      this.dialogFormVisible = true
      this.isGroupCreate = true
      this.editGroupId = ''
    },
    handleEdit(row) {
      this.groupForm.name = row.name
      this.groupForm.description = row.description
      this.groupForm.ownerIds = row.owners.map(({ id }) => id)
      this.groupForm.saleIds = row.sales.map(({ id }) => id)

      this.dialogFormVisible = true
      this.isGroupCreate = false
      this.editGroupId = row.id
    },

    handleDelete({ id, name }) {
      this.$confirm(`此操作将删除销售组（${name}）, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserGroup(id).then(res => {
          const groupIndex = this.list.map(({ id }) => id).indexOf(id)
          this.list.splice(groupIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    submitForm(formData) {
      this.groupForm = formData
      if (this.isGroupCreate) {
        this.groupForm.groupType = 'sale'
        createUserGroup(this.groupForm).then(res => {
          const data = res
          this.list.unshift(data.userGroup)
          this.$message({
            message: '销售组创建成功',
            type: 'success'
          })
          this.dialogFormVisible = false
        })
      } else {
        updateUserGroup(this.editGroupId, this.groupForm).then(res => {
          const data = res
          const groupIndex = this.list.map(({ id }) => id).indexOf(this.editGroupId)
          this.list.splice(groupIndex, 1, data.userGroup)
          this.$message({
            message: '销售组更新成功',
            type: 'success'
          })
          this.dialogFormVisible = false
        })
      }
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
</style>
