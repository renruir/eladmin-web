<template>
  <div>
    <div style="display: flex">
      <el-table
        :data="tableData1"
        :span-method="objectSpanMethod"
        border
        style="width: 30%; margin-top: 20px"
      >
        <el-table-column prop="device" label="设备"></el-table-column>
        <el-table-column prop="station" label="站点"> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[
            { text: '合格', value: '1' },
            { text: '不合格', value: '0' },
          ]"
          :formatter="formStatus"
          :filter-method="formStatus"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '合格' ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="tableData2"
        :span-method="objectSpanMethod"
        border
        style="width: 30%; margin-top: 20px; margin-left: 20px"
      >
        <el-table-column prop="device" label="设备"></el-table-column>
        <el-table-column prop="station" label="站点"> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[
            { text: '合格', value: '1' },
            { text: '不合格', value: '0' },
          ]"
          :formatter="formStatus"
          :filter-method="formStatus"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '合格' ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; margin-top: 20px">
      <span style="font-weight: 600">设备检修完成率</span>
      <div class="marquee">
        <div class="marquee_box" ref="marquee_box1">
          <ul class="marquee_list" :class="{ marquee_top: animate }">
            <li v-for="(item, index) in list" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>

      <span style="font-weight: 600">检修时间提醒</span>
      <div class="marquee">
        <div class="marquee_box" ref="marquee_box2">
          <ul class="marquee_list" :class="{ marquee_top: animate }">
            <li v-for="(item, index) in services" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false,
      showNum: 4, // 可见列表条数
      list: [
        "南京南站检修率 70%",
        "鼓楼站检修率 89%",
        "学则路站检修率 89%",
        "仙鹤门站检修率 86%",
        "南京站检修率 99%",
        "草场门大街站检修率 79%",
        "将军大道站检修率 86%",
        "禄口机场站检修率 90%",
      ],
      services: [
        "南京南站下次检修 6月1日",
        "鼓楼站下次检修 6月2日",
        "学则路站下次检修 6月4日",
        "仙鹤门站下次检修 6月5日",
        "南京站下次检修 6月6日",
        "草场门大街站下次检修 6月10日",
        "将军大道站下次检修 6月12日",
        "禄口机场站下次检修 6月17日",
      ],
      tableData1: [
        {
          device: "主变电站1",
          station: "南京南站",
          state: "合格",
        },
        {
          device: "主变电站1",
          station: "花神庙站",
          state: "合格",
        },
        {
          station: "主变电站1",
          name: "天隆寺站",
          state: "不合格",
        },
        {
          device: "主变电站1",
          station: "安德门站",
          state: "合格",
        },
        {
          device: "主变电站1",
          station: "中华门站",
          state: "合格",
        },
      ],
      tableData2: [
        {
          device: "主变电站2",
          station: "新街口站",
          state: "不合格",
        },
        {
          device: "主变电站2",
          station: "珠江路站",
          state: "合格",
        },
        {
          station: "主变电站2",
          name: "鼓楼站",
          state: "不合格",
        },
        {
          device: "主变电站2",
          station: "玄武门站",
          state: "不合格",
        },
        {
          device: "主变电站2",
          station: "新模范马路站",
          state: "合格",
        },
      ],
    };
  },
  created() {
    setInterval(this.showMarquee, 2000);
  },
  mounted() {
    this.$refs.marquee_box1.style.height = this.showNum * 30 + "px";
    this.$refs.marquee_box2.style.height = this.showNum * 30 + "px";
  },

  methods: {
    showMarquee() {
      this.animate = true;
      this.list.push(this.list[0]);
      setTimeout(() => {
        this.list.shift();
        this.animate = false;
      }, 1000);
    },

    formStatus(value, row) {
      return row.state === value;
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style scoped>
.marquee {
  width: 30%;
  /* height: 200px; */
  align-items: center;
  color: #3a3a3a;
  background-color: white;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}
.marquee_title {
  padding: 0 20px;
  height: 20px;
  font-size: 16px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
}
.marquee_box {
  display: block;
  position: relative;
  width: 65%;
  overflow: hidden;
  top:0px;
  margin: 0 auto;
}
.marquee_list {
  display: block;
  position: absolute;
  top: 0px;
  left: 0;
}
.marquee_top {
  transition: all 1s;
  margin-top: -30px;
}
.marquee_list li {
  height: 25px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;
}
.marquee_list li span {
  padding: 0 2px;
}
</style>
