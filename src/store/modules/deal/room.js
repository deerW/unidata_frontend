const roomStoreModule = {
  state: {
    roomOptions: {
      bedTypes: [
        {
          value: 'single',
          label: '大床'
        },
        {
          value: 'multi',
          label: '双床/多床'
        },
        {
          value: 'other',
          label: '其他'
        }
      ],
      starsType: [
        {
          value: '3星',
          label: '3星'
        },
        {
          value: '4星',
          label: '4星'
        },
        {
          value: '5星',
          label: '5星'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      breakfasts: [
        {
          value: '含早',
          label: '含早'
        },
        {
          value: '不含早',
          label: '不含早'
        },
        {
          value: '无所谓',
          label: '无所谓'
        }
      ],
      cancelRules: [
        {
          value: '免费取消',
          label: '免费取消'
        },
        {
          value: '不可取消',
          label: '不可取消'
        },
        {
          value: '无所谓',
          label: '无所谓'
        }
      ]
    }
  }
}

export default roomStoreModule
