<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span class="user-name">{{ name }}</span>
        <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <a class="inlineBlock" href="https://passport.uniqueway.com/account?tab=password" target="_blank">
              修改密码
          </a>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { updateNoticeMessage } from '@/api/customer'
import { updateUserDuty } from '@/api/user'

export default {
  data() {
    return {
      activeName: 'first',
      checkbox: true,
      list: [],
      finished: [],
      unfinished: [],
      listQuery: {
        limit: 20,
        page: 1,
        status: 'unfinished'
      },
      editList: {
        status: 'unfinished'
      },
      unTreatedLength: 0,
      currentUnfinishedPage: 1,
      totaUnfinishedCount: 0,
      currentFinishedPage: 1,
      totaFinishedCount: 0,
      lock: true,
      statusLock: true,
      getMsgIntervalId: 0
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'isParticipateDistribution',
      'roles'
    ]),
    isDuty: {
      get() {
        return this.$store.getters.isDuty
      },
      set(newValue) {
        updateUserDuty({ id: this.$store.getters.userId }).then(res => {
          this.$store.dispatch('ToggleIsDuty', newValue)
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '无法修改接单开关，请联系相关人员',
            type: 'error'
          })
        })
      }
    },
    isShowDutyButton() {
      const userRoles = this.roles
      const isGroupMember = userRoles && userRoles.some(role => role.id === 6 && role.name === '客户经理组员')
      const isGroupMaster = userRoles && userRoles.some(role => role.id === 4 && role.name === '组长')
      const canShowBtn = !(isGroupMember || isGroupMaster)
      return this.isParticipateDistribution && canShowBtn
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleMessageStatus(event, item, index) {
      if (this.lock && this.statusLock) {
        this.lock = false
        item[index].select = true
        const id = item[index].id
        const status = item[index].status
        setTimeout(() => {
          item.splice(index, 1)
          if (status === 'unfinished') {
            this.editList.status = 'finished'
            this.unTreatedLength = this.unTreatedLength - 1
            this.totaUnfinishedCount = this.totaUnfinishedCount - 1
          } else {
            this.editList.status = 'unfinished'
            this.unTreatedLength = this.unTreatedLength + 1
            this.totaFinishedCount = this.totaFinishedCount - 1
          }
          if (item.length === 0) {
            this.list = []
          }
          updateNoticeMessage(id, this.editList).then((res) => {
            this.lock = true
          })
        }, 100)
      } else {
        return
      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.messageNotice()
    },
    handleClick(val) {
      if (val.label === '未处理') {
        this.listQuery.status = 'unfinished'
        this.listQuery.page = 1
        this.messageNotice()
      } else {
        this.listQuery.status = 'finished'
        this.listQuery.page = 1
        this.messageNotice()
      }
    },
    translateDate(data) {
      if (!data) return
      const messages = data.messages
      if (messages && Array.isArray(messages) && messages.length > 0) {
        this.list = data.messages.map(item => {
          item.select = false
          if (item.category === 'error') {
            item.classType = 'el-icon-error icon-error'
          }
          if (item.category === 'warning') {
            item.classType = 'el-icon-warning icon-warning'
          }
          if (item.category === 'success') {
            item.classType = 'el-icon-success icon-success'
          }
          if (item.category === 'info') {
            item.classType = 'el-icon-info icon-info'
          }
          return item
        })
        if (this.listQuery.status === 'unfinished') {
          this.unTreatedLength = data.pagination.totalCount
          this.unfinished = JSON.parse(JSON.stringify(this.list))
          this.totaUnfinishedCount = data.pagination.totalCount
          this.currentUnfinishedPage = data.pagination.current
        } else {
          this.finished = JSON.parse(JSON.stringify(this.list))
          this.totaFinishedCount = data.pagination.totalCount
          this.currentFinishedPage = data.pagination.current
        }
      } else {
        this.list = []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~styles/mixin.scss';

/deep/ .message-deal-url {
  color: $main-color;
}

.icon-error {
  color: $danger-color;
}
.icon-info {
  color: $main-color;
}
.icon-success {
  color: $success-color;
}
.icon-warning {
  color: $warning-color;
}

.icon-messages {
  width: 25px;
  height: 25px;
}

.scroll-item {
  height: 410px;
  padding-right: 10px;
  overflow-x: hidden;

  @include scrollBar;
}

.empty-message {
  text-align: center;
  line-height: 250px;
}

.status-middle .notice-body {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
}

.change-form {
  font-size: 14px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dotted #ccc;
}

.change-form::after {
  content: '';
  display: block;
  clear: both;
}

.status-left {
  float: left;
  margin-top: 4px;
  font-size: 28px;
}
.status-middle {
  margin: 0 40px 0 40px;
}

// .status-middle > .middle-title {
//   text-align: left;
// }
.status-right {
  font-size: 28px;
  float: right;
  margin-top: 3px;
  cursor: pointer;
}
.user-dropdown {
  padding-left: 10px;
  padding-right: 0;
}

.el-pagination {
  text-align: center;
}

.dropdown-width {
  width: 370px;
}

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    height: 20px;
    position: absolute;
    right: 97px;
    top: 15px;
    color: red;
  }

  .assign-order-switch {
    position: absolute;
    right: 200px;
    top: 16px;
  }

  .notice {
    position: absolute;
    right: 155px;
    top: 3px;
    line-height: 1;
    cursor: pointer;
  }
  .notice-message {
    font-size: 23px;
    position: relative;
  }

  .item {
    margin-top: 10px;
    margin-right: 5px;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      position: relative;

      .user-name {
        font-size: 16px;
      }

      &:hover {
        color: $main-color;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;

        &:before {
          content: "";
          width: 100%;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          background-image: url('data:image/png;base64,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');
          background-size: cover;
        }
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -16px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>



