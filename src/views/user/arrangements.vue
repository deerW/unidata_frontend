<template>
  <div class="app-container">
    <div style="margin-bottom: 20px" layout layout-align="space-between center">
      <div>
        <el-button type="primary" size="small" icon="el-icon-refresh" :loading="listLoading" @click="refresh()">重新导入</el-button>
        <el-tooltip placement="right">
          <p slot="content" class="pop-wrap">
            有客户经理第一次登录系统时，需点击按钮导入新客户经理的排班数据，原有人员数据不变。
          </p>
          <div class="icon-wrap">
            <i class="el-icon-question icon"></i>
          </div>
        </el-tooltip>
      </div>
      <div layout="column" layout-align="space-between end">
        <span class="max-duty-text">已接单: {{ currentCountNum != null ? currentCountNum : '获取中...' }}</span>
        <span class="max-duty-text">当天接单上限: {{ maxDutyNum !== null ? maxDutyNum : '获取中...' }}</span>
      </div>
    </div>
    
    <el-tabs v-model="activeGroup" @tab-click="handleTabClick">
      <el-tab-pane v-for="item in groups" :label="item.name" :name="String(item.id)" :key="item.id"></el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24">
        <div align="center">
          <el-tooltip content="上一周" placement="left">
            <span id="last-week" class="arrow-btn" @click="prevWeek()">
              <i class="el-icon-arrow-left arrow-icon"></i>
            </span>
          </el-tooltip>
          <span class="date-screen">{{ weekRange.monday }} 至 {{ weekRange.sunday }} </span>
          <el-tooltip content="下一周" placement="right">
            <span id="next-week" class="arrow-btn" @click="nextWeek()">
              <i class="el-icon-arrow-right arrow-icon"></i>
            </span>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="arrangementList"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      show-summary
      :summary-method="getSummaries"
      fit
      highlight-current-row
      :height="tableHeight"
      style="width: 100%">
      <el-table-column width="100" align="center" label="姓名" prop="name" fixed>
      </el-table-column>
      <el-table-column v-for="(weekday, index) in weekdays" align="center" :label="weekday + ' / ' + formatDate(weekdates[index])" :key="index">
        <el-table-column align="center" label="排班">
          <template slot-scope="scope">
            <span
              :class="{circle: true, 'in-active': dateIsPassed(scope.row.arrangement[index].date)}"
              :style="scope.row.arrangement[index].maxCount > 0 ? activeCircleStyle : inActiveCircleStyle"
              @click="toggleArrangement(scope.row, index)">
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已接单">
          <template slot-scope="scope">
            <span>{{ scope.row.arrangement[index].currentCount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最大接单">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.arrangement[index].maxCount"
              :min="0"
              :max="100"
              :controls="false"
              size="small"
              :disabled="dateIsPassed(scope.row.arrangement[index].date)"
              @change="handleMaxCount($event, scope.row.arrangement[index])"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getArrangementsList,
  updateArrangementsList,
  updateArrangements,
  getUserGroups,
  getArrangementsListCount } from '@/api/user'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'arrangement',
  metaInfo: {
    title: '排班列表'
  },
  data() {
    return {
      activeCircleStyle: { backgroundColor: '#2EBA07' },
      inActiveCircleStyle: { backgroundColor: '#f56c6c' },
      listLoading: false,
      arrangementList: [],
      tableHeight: 500,
      activeGroup: '',
      groups: [],
      weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
      weekRange: {},
      maxDutyNum: null,
      currentCountNum: null
    }
  },
  computed: {
    ...mapGetters([
      'ownGroups',
      'userId'
    ]),
    weekdates() {
      const monday = moment(this.weekRange.monday)
      const sunday = moment(this.weekRange.sunday)
      const days = sunday.diff(monday, 'days')

      let date = monday
      const weekdates = []
      for (let i = 0; i <= days; i++) {
        weekdates.push(date.format('YYYY-MM-DD'))
        date = date.add(1, 'day')
      }

      return weekdates
    }
  },

  created() {
    this.getMaxDutyNum()
    this.getUserGroups()

    this.tableHeight = document.documentElement.clientHeight - 300
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    async getList() {
      this.listLoading = true

      const groupId = this.activeGroup
      const monday = this.weekRange.monday
      const sunday = this.weekRange.sunday

      getArrangementsList({ groupId, monday, sunday }).then(res => {
        this.arrangementList = res.salesArrangements
      }).finally(() => {
        this.listLoading = false
      })
    },

    getUserGroups() {
      const params = { groupType: 'sale' }
      getUserGroups(params).then((res) => {
        this.groups = res.userGroups

        this.activeGroup = this.getAcrossCommonId(this.ownGroups, this.groups)

        moment.locale('zh-cn')
        this.weekRange = {
          monday: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          sunday: moment().endOf('isoWeek').format('YYYY-MM-DD')
        }

        this.getList()
      })
    },
    getAcrossCommonId(ownGroups, groups) {
      if (ownGroups.length) {
        const ownGroupIds = ownGroups.map(item => item.id)
        const groupIds = groups.map(item => item.id)

        for (const id of ownGroupIds) {
          if (groupIds.indexOf(id) !== -1) {
            return String(id)
          }
        }
      }

      return String(groups[0]['id'])
    },

    getMaxDutyNum() {
      getArrangementsListCount().then(res => {
        this.maxDutyNum = res.totalMaxCount
        this.currentCountNum = res.totalCurrentCount
      }).catch(() => {
        console.log('获取已接单和最大接单上限失败')
      })
    },

    getSummaries(params) {
      const { columns, data } = params
      const sums = []
      if (!data.length) return sums

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }

        if (index % 3 === 1) {
          sums[index] = ''
        }

        if (index % 3 === 2) {
          const arrIndex = Math.floor(index / 3)
          const values = data.map(item => Number(item.arrangement[arrIndex].currentCount))
          sums[index] = values.reduce((prev, curr) => prev + curr, 0)
        }

        if (index % 3 === 0) {
          const arrIndex = index / 3 - 1
          const values = data.map(item => Number(item.arrangement[arrIndex].maxCount))
          sums[index] = values.reduce((prev, curr) => prev + curr, 0)
        }
      })

      return sums
    },

    handleTabClick() {
      this.getList()
    },

    refresh() {
      this.listLoading = true

      const monday = this.weekRange.monday
      updateArrangementsList({ monday }).then(res => {
        this.arrangementList = res.salesArrangements
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    handleMaxCount(val, data) {
      updateArrangements(data.id, { maxCount: val }).then(res => {
        this.getMaxDutyNum()
        Message.success('修改成功')
      })
    },

    toggleArrangement(data, index) {
      const val = data.arrangement[index].maxCount > 0 ? 0 : data.maxCount
      updateArrangements(data.arrangement[index].id, { maxCount: val }).then(res => {
        this.getMaxDutyNum()
        Message.success('修改成功')
        const listIndex = this.findIndexByAttr(this.arrangementList, 'name', data.name)
        this.arrangementList[listIndex].arrangement[index].maxCount = res.maxCount
      })
    },
    findIndexByAttr(array, attr, value) {
      return array.map(e => { return e[attr] }).indexOf(value)
    },

    formatDate(date) {
      return moment(date).format('MMMDo')
    },
    dateIsPassed(date) {
      return moment().isAfter(date, 'day')
    },
    prevWeek() {
      const monday = moment(this.weekRange.monday).subtract('1', 'week').format('YYYY-MM-DD')
      const sunday = moment(this.weekRange.sunday).subtract('1', 'week').format('YYYY-MM-DD')
      this.weekRange = { monday, sunday }
      this.getList()
    },
    nextWeek() {
      const monday = moment(this.weekRange.monday).add('1', 'week').format('YYYY-MM-DD')
      const sunday = moment(this.weekRange.sunday).add('1', 'week').format('YYYY-MM-DD')
      this.weekRange = { monday, sunday }
      this.getList()
    },

    handleResize() {
      this.tableHeight = document.documentElement.clientHeight - 300
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~styles/mixin.scss';

.el-row {
  margin-bottom: 20px;
}

.el-input-number--small {
  width: 100%;
}

.circle {
  display: inline-block;
  margin-right: 3px;
  width: 10px;
  height:  10px;
  border-radius: 5px;

  &:not(.in-active) {
    cursor: pointer;
  }
}

.in-active {
  pointer-events: none;
}



.icon-wrap {
  width: 40px;
  height: 40px;

  line-height: 40px;
  text-align: center;

  color: #909399;
  font-size: 18px;

  display: inline-block;
  position: relative;
  top: 2px;
  right: 2px;
}

.pop-wrap {
  font-size: 14px;
}

.max-duty-text {
  margin-right: 20px;
  margin-bottom: 4px;

  @include text-font;
}

.arrow-btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 1px solid #c9c9c9;
  border-radius: 15px;
  cursor: pointer;
}

.arrow-icon {
  height: 30px;
  line-height: 30px;
}

.date-screen {
  margin: 0px 10px;
}
</style>
