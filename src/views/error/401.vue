<template>
  <div class="container">
    <el-button @click="back" icon="arrow-left" class="pan-back-btn">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo">Oops!</h1>
        <h2>无权限进入页面或请求权限信息超时</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <a @click="reloadPage">刷新页面</a>
            <a @click="removeToken">清除缓存</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401.gif'

export default {
  name: 'error401',
  data() {
    return {
      errGif: `${errGif}?${new Date()}`
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-2)
      }
    },
    removeToken() {
      localStorage.removeItem('Admin-Token')
    },
    reloadPage() {
      this.$router.go(-2)
      setTimeout(() => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;

    color: #fff;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    margin-top: 6px;
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      text-decoration: none;

      color: #008489;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
