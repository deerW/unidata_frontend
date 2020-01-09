<template>
  <div>
    <div class="table">
      <el-table
        :data="tableData"
        v-bind="$attrs"
        v-on="$listeners"
        >
        <slot name="tbody"></slot>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
      layout="total,sizes,prev,pager,next"
      @size-change="handleSizeChange"
      :page-sizes="pageSizes"
      :total="total"
      :current-page.sync="currentPageNumber"
      :page-size="size">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    // 表格总数据
    tData: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },

    pageSize: {
      type: Number,
      require: true,
      default() {
        return 5
      }
    },

    pageSizes: {
      type: Array,
      default() {
        return [10, 50, 100]
      }
    }
  },

  data() {
    return {
      currentPageNumber: 1,
      size: this.pageSize
    }
  },

  computed: {
    tableData() {
      const nowIndex = this.size * (this.currentPageNumber - 1)
      return this.tData.slice(nowIndex, nowIndex + this.size)
    },
    total() {
      return this.tData.length
    }
  },

  methods: {
    handleSizeChange(newSize) {
      this.size = newSize
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
</style>
