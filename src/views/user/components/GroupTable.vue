<template>
  <pagination-table
    :tData="groupList"
    v-bind="pageConfig"
    style="width: 100%"
    fit
    border
    highlight-current-row
    element-loading-text="给我一点时间">

    <template slot="tbody">
      <el-table-column width="120" align="center" :label="`${ groupName }组编号`">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="`${groupName}组名称`">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="组长">
        <template slot-scope="scope">
          {{ scope.row.owners.map(({ name }) => name).toString() }}
        </template>
      </el-table-column>
      <el-table-column v-if="groupType === 'assignment'" align="center" label="员工数">
        <template slot-scope="scope">
          {{ scope.row.users.length }}
        </template>
      </el-table-column>
      <el-table-column v-if="groupType === 'sale'" align="center" label="员工数">
        <template slot-scope="scope">
          {{ scope.row.sales.length }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" v-if="$permission('canEditGroup')" >
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </pagination-table>
</template>

<script>
const PaginationTable = () => import('./PaginationTable')

export default {
  name: 'GroupTable',

  components: {
    PaginationTable
  },

  props: {
    groupList: {
      type: Array,
      default() {
        return []
      }
    },
    groupType: String
  },

  data() {
    return {
      pageConfig: {
        pageSize: 10,
        pageSizes: [20, 40, 60]
      }
    }
  },
  computed: {
    groupName() {
      if (this.groupType === 'sale') {
        return '销售'
      } else if (this.groupType === 'assignment') {
        return '分单'
      }
    }
  },

  methods: {
    handleEdit(row) {
      this.$emit('editRow', row)
    },
    handleDelete(row) {
      this.$emit('deleteRow', row)
    }
  }
}
</script>
