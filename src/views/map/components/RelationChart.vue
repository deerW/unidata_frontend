<template>
  <el-card header="关系图" v-loading="divLoading" class="home-page-order-list">
    <div class="flowchart" id="flowchart">
      <template>
        <div
          v-for="(item, index) in data"
          :key="item.tableId">
          <div
            v-if="index === 0"
            class="chart"
            :style="{ left: '0em', top: '25em' }"
          >
            <div class="chart-title">
              <span v-show="item.databaseName">
                {{item.databaseName }}.
              </span>
              {{ item.tableName }}
            </div>
            <div
              v-for="column in item.columns"
              :key="column.id"
              class="chart-body"
              :id="`column${column.id}`"
            >
              {{ column.name }}
            </div>
          </div>
          <div
            v-else
            class="chart"
            :style="{ left: '25em', top: `calc(${(index - 1) * 10}em)`}"
          >
            <div class="chart-title">
              <span v-show="item.databaseName">
                {{item.databaseName }}.
              </span>
              {{ item.tableName }}
            </div>
            <div
              v-for="column in item.columns"
              :key="column.id"
              class="chart-body"
              :id="`column${column.id}`"
            >
              {{ column.name }}
            </div>
          </div>
        </div>
      </template>
      
    </div>
  </el-card>
</template>

<script>

let j, defaultConfig

export default {
  name: 'RelationChart',
  data() {
    return {
      data: [],
      divLoading: false
    }
  },
  props: ['chartData', 'loading', 'list'],
  created() {
    this.data = this.chartData
  },
  mounted() {
    jsPlumb.ready(() => {
      j = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        MaxConnections: -1,
        PaintStyle: { stroke: '#E6A23C', strokeWidth: 3 },  // 配置自己拖拽小点的时候连接线的默认样式
        Endpoint: ['Dot', { radius: 3 }], // 这个是控制连线终端那个小点的半径
        EndpointStyle: { fill: '#E6A23C' }, // 这个是控制连线终端那个小点的样式
        EndpointHoverStyle: { fill : '#67C23A' }, // 这个是控制连线终端那个小点的样式
        Connector: ['Flowchart'],
        ConnectionOverlays: [
            ['Arrow', { location: 1 }]
        ],
        Container: 'flowchart'
      })
      // j.draggable($('.chart'))
    })

  },
  methods: {
    deleteChart() {
      if (!this.data || !this.data.length) {
        j.deleteEveryConnection()
        j.deleteEveryEndpoint()
      }
    },
    renderChart() {
      if (!this.data || !this.data.length) {
        this.deleteChart()
        this.divLoading = false
        return
      }

      const data = this.data || []
      const list = this.list
      const anchorArr = { 'left_join': 'Right', 'right_join': 'Left' }
      const anchoredArr = { 'left_join': 'Left', 'right_join': 'Right' }
      data.map((item, index) => {
        item.columns.map((column ,index) => {
          j.addEndpoint(
            'column' + column.id,
            { 
              uuid: column.id,
              anchor: column.slaveColumnId ? anchorArr[column.type] : anchoredArr[column.type],
              isSource: !!column.slaveColumnId,
              isTarget: !column.slaveColumnId,
              maxConnections: -1
          })
        })
        
        this.divLoading = false
      })
      list.map(item => {
        j.connect({
          uuids: [item.slaveColumnId, item.masterColumnId],  // 根据uuid进行连接
          paintStyle: { stroke: '#E6A23C', strokeWidth: 3 },  // 线的样式
          endpointStyle: { fill: '#67C23A', outlineStroke: 'darkgray', outlineWidth: 3 },// 点的样式
          overlays: [ ['Arrow', { width: 10, location: 0.5 }] ]   // 覆盖物 箭头 及 样式
        })
        
      })
    },
    handleTableDetail(id) {
      this.$router.push({
        name: 'tableShow',
        params: {
          id
        }
      })
    },
    goUpdate(id) {
      this.$router.push({
        name: 'tableUpdate',
        params: {
          id
        }
      })
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(nv, ov) {
        this.data = nv
        this.divLoading = true
        setTimeout(() => {
          this.renderChart()
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page-order-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 10px;
  // padding: 20px 10px;
  overflow: scroll;

  .list-title {
    width: 120px;
    height: 30px;
    font-family: PingFang-SC;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: #303133;
  }
  .deal-link {
    color: #30bfbf;
    font-weight: 500;
    cursor: pointer;
  }
}
.flowchart {
    width: 100%;
    min-height: 300px;
    position: relative;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;
}
.flowchart .chart {
    margin: 10px 50px;
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    opacity: 0.8;
    filter: alpha(opacity=80);
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica;
    font-size: 0.9em;
    min-width: 100px;
    // top: 10em;
}
.flowchart .chart:hover {
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #444;
    opacity: 0.6;
    filter: alpha(opacity=60);
}
.flowchart .chart .chart-title {
  line-height: 2;
  background: #30bfbf;
  color: #fff;
  padding: 5px 10px;
}
.flowchart .chart .chart-body {

  line-height: 1.5;
  color: #30bfbf;
  padding: 5px 10px;
  border-top: 1px solid #888;
}
.flowchart .active {
    border: 1px dotted green;
}
.flowchart .hover {
    border: 1px dotted red;
}

</style>
