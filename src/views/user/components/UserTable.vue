<template>
  <div>
    <pagination-table
      :tData="list"
      v-bind="pageConfig"
      fit
      border
      style="width: 100%"
      highlight-current-row
      v-loading="isLoading"
      @cell-click="$event.id !== editId ? editId = '' : ''"
      element-loading-text="给我一点时间">

      <template slot="tbody">
        <el-table-column width="80" align="center" label="员工号" prop="id"></el-table-column>
        <el-table-column width="100" align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="微信 ID" prop="wechatId"></el-table-column>

        <el-table-column width="150" label="最大接单量" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.id !== editId">
              <span> {{ scope.row.maxCount }} </span>
              <i @click.stop.self="editId = scope.row.id" class="el-icon-edit edit-sourceurl"></i>
            </template>
            <template v-else>
              <el-input-number 
                size="mini" 
                :min="1"
                v-model="scope.row.maxCount" 
                @change="handleOrderLimitChange(scope.row,$event)"></el-input-number>
            </template>
          </template>
        </el-table-column>

        <el-table-column align="center" label="分单组">
          <template slot-scope="scope">
            <span>{{ scope.row.groups ? scope.row.groups.map(({ name }) => name).join('、') : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="销售组">
          <template slot-scope="{ row }">
            <span>{{ row.saleGroup ? row.saleGroup.name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            <span>{{ scope.row.roles ? scope.row.roles.map(({ name }) => name).join('、') : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="操作" v-if="$permission('canEditUser')">
          <template slot-scope="scope" >
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </pagination-table>

    <user-edit-dialog
      @changeSuccess="$emit('changeSuccess')"
      @changeMaxCount="handleOrderLimitChange"
      :dialogFormVisible.sync="dialogFormVisible"
      :assignDealGroup="assignDealGroup"
      :saleGroup="saleGroup"
      :userRoles="userRoles"
      :userForm="userForm"></user-edit-dialog>
  </div>
</template>

<script>
const PaginationTable = () => import('./PaginationTable')
const UserEditDialog = () => import('./UserEditDialog')

import { updateUserMaxCount } from '@/api/user'

export default {
  name: 'userTable',

  components: {
    UserEditDialog,
    PaginationTable
  },

  data() {
    return {
      editId: '',
      dialogFormVisible: false,
      pageConfig: {
        pageSize: 50,
        pageSizes: [50, 100, 200, 400]
      },
      userForm: {
        id: '',
        name: '',
        wechatId: '',
        isParticipateDistribution: false,
        groupIds: [],
        saleGroupId: '',
        roleIds: [],
        maxCount: 0,
        star: 0
      }
    }
  },

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    isLoading: {
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

  methods: {
    handleEdit(row) {
      this.userForm.id = row.id
      this.userForm.name = row.name
      this.userForm.star = row.star
      this.userForm.wechatId = row.wechatId
      this.userForm.isParticipateDistribution = row.isParticipateDistribution
      this.userForm.groupIds = row.groups ? row.groups.map(({ id }) => id) : []
      this.userForm.roleIds = row.groups ? row.roles.map(({ id }) => id) : []
      this.userForm.saleGroupId = row.saleGroup ? row.saleGroup.id : ''
      this.userForm.maxCount = row.maxCount

      this.dialogFormVisible = true
    },

    handleOrderLimitChange(row, e) {
      const data = { id: row.id, maxCount: e }
      updateUserMaxCount(data).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixin.scss';

.edit-sourceurl {
  color: $main-color;
  cursor: pointer;
}
</style>
