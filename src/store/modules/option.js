const optionStoreModule = {
  state: {
    destinationList: [
      '欧洲',
      '新西兰',
      '日本',
      '美国',
      '澳大利亚',
      '东南亚',
      '加拿大',
      '毛里求斯',
      '斯里兰卡',
      '台湾',
      '斐济',
      '马尔代夫',
      '阿联酋',
      '大溪地',
      '百内国家公园',
      '坦桑尼亚',
      '西伯利亚',
      '玻利维亚',
      '其他',
      '松赞'
    ],
    personnelList: [
      '青年情侣',
      '青年夫妻',
      '中年夫妻',
      '老年夫妻',
      '亲子游',
      '家庭出游',
      '朋友结伴',
      '独自出行',
      '其它'
    ],
    referralTypeList: [
      {
        label: '线上',
        value: 'online'
      }, {
        label: '线下',
        value: 'offline'
      }, {
        label: '老客户',
        value: 'old_customer'
      }, {
        label: '公共',
        value: 'common'
      }, {
        label: '测试',
        value: 'other'
      }
    ],

    dealTableHeadMap: {
      'priorityPoints': '优先级分数',
      'subject': '主题',
      'customerName': '客户姓名',
      'salesName': '客户经理',
      'comment': '备注',
      'planId': '方案号',
      'utmSource': '来源',
      'status': '销售状态',
      'stage': '销售阶段',
      'contactStatus': '联系状态',
      'priority': '重点关注',
      'reminderTime': '提醒时间',
      'updatedAt': '最近修改'
    }
  }
}

export default optionStoreModule
