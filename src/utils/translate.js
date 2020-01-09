export function translateStage(stage) {
  switch (stage) {
    case 'callcenter_followup':
      return 0

    case 'contact_customer':
      return 1

    case 'discover_needs':
      return 2

    case 'prepare_proposal':
      return 3

    case 'discuss_proposal':
      return 4

    case 'discuss_price':
      return 5

    case 'won':
      return 6

    default:
      this.$message({
        message: '获取阶段失败！',
        type: 'error'
      })
      break
  }
}

export const stageTable = {
  'callcenter_followup': '呼叫跟进',
  'contact_customer': '销售联系',
  'discover_needs': '需求沟通',
  'prepare_proposal': '方案准备',
  'discuss_proposal': '方案讨论',
  'discuss_price': '价格讨论',
  'won': '已签单'
}
