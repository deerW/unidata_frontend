<template>
  <div>
    <el-select
      class="utmSelect"
      @focus="utmOptionsFocus"
      multiple
      :popper-append-to-body='false'
      v-model="utmOptions"
      >
    </el-select>

    <el-dialog 
      title="分单来源"
      @open="getOptions"
      @closed="resetSelect"
      :visible.sync="isDialogShow"
      append-to-body>

      <el-row type="flex" justify="space-between">
        <span class="label-text">来源</span>
        <span class="label-text">渠道</span>
        <span class="label-text">广告系列</span>
        <span class="label-text"></span>
      </el-row>

      <el-row type="flex" justify="space-between" align="center">
        <el-select filterable v-model="source">
          <el-option
            v-for="option of options.utmSource"
            :label="option.utmValue"
            :value="option.utmValue"
            :key="option.id"
            ></el-option>
        </el-select>

        <el-select filterable v-model="medium">
          <el-option
            v-for="option of options.utmMedium"
            :label="option.utmValue"
            :value="option.utmValue"
            :key="option.id"
            ></el-option>
        </el-select>

        <el-select filterable v-model="campaign">
          <el-option
            v-for="option of options.utmCampaign"
            :label="option.utmValue"
            :value="option.utmValue"
            :key="option.id"
            ></el-option>
        </el-select>

        <span class="label-text">
          <el-button @click="addUtm" type="primary">添加</el-button>
        </span>
      </el-row>

      <el-row 
        type="flex" 
        justify="space-between"
        align="center"
        v-for="(option, index) of currentOptions"
        :key="index">
        <span class="label-text">{{ option[0] }}</span>
        <span class="label-text">{{ option[1] }}</span>
        <span class="label-text">{{ option[2] }}</span>
        <span class="label-text">
          <el-button @click="deleteUtm(index)" type="danger">删除</el-button>
        </span>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getUtmOption } from '@/api/deal'

export default {
  name: 'UtmSelect',

  model: {
    prop: 'utmOptions',
    event: 'utmOptionsChange'
  },

  props: {
    utmOptions: Array
  },

  computed: {
    currentOptions: {
      get() {
        if (!this.utmOptions) return
        return this.utmOptions.map(item => {
          return item.split(',')
        })
      }
    }
  },

  data() {
    return {
      isDialogShow: false,
      source: 'all',
      medium: 'all',
      campaign: 'all',
      options: {
        utmSource: [],
        utmMedium: [],
        utmCampaign: []
      }
    }
  },

  methods: {
    utmOptionsFocus() {
      this.isDialogShow = true
      return false
    },

    getOptions() {
      if (this.options.utmSource.length) return

      const types = ['utm_source', 'utm_medium', 'utm_campaign']
      types.forEach(utmType => {
        const data = { utmType }

        getUtmOption(data).then(res => {
          for (const key in res) {
            res[key].unshift({ utmValue: 'all', id: 9999 })
            this.options[key] = res[key]
          }
        })
      })
    },

    addUtm() {
      const deepList = [].concat(this.utmOptions)
      const utmArr = [this.source, this.medium, this.campaign]
      deepList.push(utmArr.join(','))
      this.$emit('utmOptionsChange', deepList)
      this.resetSelect()
    },

    deleteUtm(index) {
      const deepList = [].concat(this.utmOptions)
      deepList.splice(index, 1)
      this.$emit('utmOptionsChange', deepList)
    },

    resetSelect() {
      this.source = this.medium = this.campaign = 'all'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixin.scss';

.el-row {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
}

.el-select.utmSelect {
  width: 300px;

  /deep/ .el-select-dropdown,
  /deep/ .el-input__suffix,
  /deep/ .el-tag__close {
    display: none;
  }
}

/deep/ .el-dialog {
  $select-width: 140px;
  $btn-width: 70px;

  .el-dialog__body {
    padding-top: 5px;
  }

  .el-select {
    width: $select-width;
  }

  .operator-btn {
    width: $btn-width;
  }

  .label-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: $select-width;
    @include text-font(14px);

    &:last-child {
      width: $btn-width;
    }
  }
}

.current-title {
  margin-top: 8px;
  @include text-font(16px);
}
</style>
