<template>
  <div class="app-container">
    <el-radio-group
      v-model="radio"
      style="margin-bottom: 20px"
      @change="stationChange(radio)"
    >
      <el-radio-button
        v-for="(station, index) in stationDatas"
        :key="index"
        border
        size="medium"
        :label="station.stationName"
      >
        {{ station.stationName }}
      </el-radio-button>
    </el-radio-group>
    <!--工具栏-->
    <div class="head-container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="变化测试仪" name="first">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="检测员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="deviceId" label="设备ID" />
            <el-table-column prop="currentChange" label="当前变化" />
            <el-table-column prop="connectStyle" label="联结方式" />
            <el-table-column prop="fenjieValue" label="分接值" />
            <el-table-column prop="fenjieBit" label="分接位" />
            <el-table-column prop="caChange" label="CA相变化" />
            <el-table-column prop="caError" label="CA相误差" />
            <el-table-column prop="caAngle" label="CA相角度" />
            <el-table-column prop="bcChange" label="BC相变化" />
            <el-table-column prop="bcError" label="BC相误差" />
            <el-table-column prop="bcAngle" label="BC相角度" />
            <el-table-column prop="abChange" label="AB相变化" />
            <el-table-column prop="abError" label="AB相误差" />
            <el-table-column prop="abAngle" label="AB相角度" />
            <el-table-column prop="inspectTime" label="检测时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="三项测试仪" name="second">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="检测员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="inspectStyle" label="检测方式" />
            <el-table-column prop="ptValueChange" label="PT变化" />
            <el-table-column prop="inspectName" label="名称 " />
            <el-table-column prop="aIx" label="aIx" />
            <el-table-column prop="aIrp" label="aIrp" />
            <el-table-column prop="aIr1p" label="aIr1p" />
            <el-table-column prop="aIr3p" label="aIr3p" />
            <el-table-column prop="aIr5p" label="aIr5p" />
            <el-table-column prop="aIr7p" label="aIr7p" />
            <el-table-column prop="aUh" label="aUh" />
            <el-table-column prop="aIc1p" label="aIc1p" />
            <el-table-column prop="aFi" label="aFi" />
            <el-table-column prop="aP1" label="aP1" />
            <el-table-column prop="aF" label="aF" />
            <el-table-column prop="aUl" label="aUl" />
            <el-table-column prop="bIx" label="bIx" />
            <el-table-column prop="bIrp" label="bIrp" />
            <el-table-column prop="bIr1p" label="bIr1p" />
            <el-table-column prop="bIr3p" label="bIr3p" />
            <el-table-column prop="bIr5p" label="bIr5p" />
            <el-table-column prop="bIr7p" label="bIr7p" />
            <el-table-column prop="bUh" label="bUh" />
            <el-table-column prop="bIc1p" label="bIc1p" />
            <el-table-column prop="bFi" label="bFi" />
            <el-table-column prop="bP1" label="bP1" />
            <el-table-column prop="bF" label="bF" />
            <el-table-column prop="bUl" label="bUl" />
            <el-table-column prop="cIx" label="cIx" />
            <el-table-column prop="cIrp" label="cIrp" />
            <el-table-column prop="cIr1p" label="cIr1p" />
            <el-table-column prop="cIr3p" label="cIr3p" />
            <el-table-column prop="cIr5p" label="cIr5p" />
            <el-table-column prop="cIr7p" label="cIr7p" />
            <el-table-column prop="cUh" label="cUh" />
            <el-table-column prop="cIc1p" label="cIc1p" />
            <el-table-column prop="cFi" label="cFi" />
            <el-table-column prop="cP1" label="cP1" />
            <el-table-column prop="cF" label="cF" />
            <el-table-column prop="cUl" label="cUl" />
            <el-table-column prop="inspectTime" label="检测时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="单相测试仪" name="third">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="inspectStyle" label="测量方式" />
            <el-table-column prop="ptValueChange" label="PT变比" />
            <el-table-column prop="inspectName" label="名称" />
            <el-table-column prop="ix" label="Ix" />
            <el-table-column prop="irp" label="Irp" />
            <el-table-column prop="ir1p" label="Ir1p" />
            <el-table-column prop="ir3p" label="Ir3p" />
            <el-table-column prop="ir5p" label="Ir5p" />
            <el-table-column prop="ir7p" label="Ir7p" />
            <el-table-column prop="uH" label="UH" />
            <el-table-column prop="ic1p" label="Ic1p" />
            <el-table-column prop="fi" label="Fi" />
            <el-table-column prop="p1" label="P1" />
            <el-table-column prop="f" label="F" />
            <el-table-column prop="uL" label="UL" />
            <el-table-column prop="inspectTime" label="测量时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="直流电阻测试仪" name="forth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="deviceId" label="设备ID" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="current" label="测试电流" />
            <el-table-column prop="mResistance" label="测量电阻" />
            <el-table-column prop="eResistance" label="换算电阻" />
            <el-table-column prop="fenjiePosition" label="分接位置" />
            <el-table-column prop="mPhase" label="测试相别" />
            <el-table-column prop="inspectTime" label="时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="回路电阻测试仪" name="fifth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="检测员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="deviceId" label="设备ID" />
            <el-table-column prop="current" label="电流" />
            <el-table-column prop="resistance" label="电阻" />
            <el-table-column prop="inspectTime" label="检测时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="绝缘靴耐压测试仪" name="sixth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="检测员" />
            <el-table-column prop="deviceId" label="设备ID" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="settingVoltage" label="设定电压" />
            <el-table-column prop="settingCurrent" label="设定电流" />
            <el-table-column prop="settingTime" label="设定时间" />
            <el-table-column prop="area1" label="一区" />
            <el-table-column prop="area2" label="二区" />
            <el-table-column prop="area3" label="三区" />
            <el-table-column prop="area4" label="四区" />
            <el-table-column prop="area5" label="五区" />
            <el-table-column prop="area6" label="六区" />
            <el-table-column prop="inspectTime" label="检测时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="超低频高压发生器" name="seventh">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="deviceId" label="设备ID" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="mFrequency" label="试验频率" />
            <el-table-column prop="mTime" label="试验时间" />
            <el-table-column prop="mVoltage" label="试验电压" />
            <el-table-column prop="mCurrent" label="试验电流" />
            <el-table-column prop="inspectTime" label="试验时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="直流高压发生器(耐压)" name="eighth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="mProject" label="项目" />
            <el-table-column prop="mVoltage" label="试验电压" />
            <el-table-column prop="mCurrent" label="试验电流" />
            <el-table-column prop="mTime" label="试验时长" />
            <el-table-column prop="inspectTime" label="试验时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="直流高压发生器(避雷器)" name="ninth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="ssid" label="WiFi名称" />
            <el-table-column prop="mProject" label="项目" />
            <el-table-column prop="mVoltage" label="1mA电压" />
            <el-table-column prop="mResidual" label="75%U残流" />
            <el-table-column prop="inspectTime" label="检测时间" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="高压试验变压器" name="tenth">
          <el-table
            ref="table"
            v-loading="loading"
            :data="listdata"
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="username" label="巡检员" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="number" label="编号" />
            <el-table-column prop="mVoltage" label="测试电压" />
            <el-table-column prop="lvCurrent" label="低压电流" />
            <el-table-column prop="hvCurrent" label="高压电流" />
            <el-table-column prop="mDuration" label="测试时长" />
            <el-table-column prop="mResult" label="测试结果" />
            <el-table-column prop="inspectTime" label="日期" />
            <el-table-column prop="saveTime" label="上传时间" />
            <el-table-column prop="other1" label="备注" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import crudStationList from "@/api/stationList";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import { initData, download } from "@/api/data";
import {
  TEST_CHANGE_QUERY_BY_STATION_URL,
  THREE_PHASE_QUERY_BY_STATION_URL,
  SINGLE_PHASE_QUERY_BY_STATION_URL,
  DC_RESISTANCE_QUERY_BY_STATION_URL,
  LOOP_RESISTANCE_QUERY_BY_STATION_URL,
  INSULATION_QUERY_BY_STATION_URL,
  HV_GENERATOR_QUERY_BY_STATION_URL,
  DCHV_WITHSTAND_VOLTAGE_QUERY_BY_STATION_URL,
  DCHV_ARRESTER_QUERY_BY_STATION_URL,
  HV_TEST_QUERY_BY_STATION_URL
} from "@/api/utils";

const defaultForm = { id: null, stationIndex: null, stationName: null };
export default {
  name: "StationList",
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: "车站信息",
      url: "api/stationList",
      idField: "id",
      sort: "id,desc",
      crudMethod: { ...crudStationList },
    });
  },
  data() {
    return {
      permission: {
        add: ["admin", "stationList:add"],
        edit: ["admin", "stationList:edit"],
        del: ["admin", "stationList:del"],
      },
      stationDatas: "",
      activeName: "first",
      stationName: "",
      // 表格数据
      data: [],
      // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
      sort: ["id,desc"],
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
      // 请求数据的url
      url: TEST_CHANGE_QUERY_BY_STATION_URL,
      // 查询数据的参数
      params: {},
      // 待查询的对象
      query: {},
      loading: false,
      listdata: "",
      radio: "",
      rules: {
        stationIndex: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        stationName: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      queryTypeOptions: [{ key: "stationName", display_name: "stationName" }],
    };
  },
  methods: {
    getQueryParame: function () {
      return {
        page: this.page,
        size: this.size,
        sort: this.sort,
        ...this.query,
        ...this.params,
      };
    },
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true;
    },

    [CRUD.HOOK.afterRefresh](data) {
      this.stationDatas = data.data;
      this.stationName = this.stationDatas[0].stationName;
      this.radio = this.stationName;
      this.params = { stationName: this.stationName };
      initData(this.url, this.params).then((data) => {
        this.total = data.length;
        this.listdata = data;
        // time 毫秒后显示表格
        setTimeout(() => {
          this.loading = false;
        }, this.time);
      });
    },

    stationChange: function (station_name) {
      this.stationName = station_name;
      this.params = { stationName: this.stationName };
      initData(this.url, this.params).then((data) => {
        this.total = data.length;
        this.listdata = data;
        // time 毫秒后显示表格
        setTimeout(() => {
          this.loading = false;
        }, this.time);
      });
    },

    handleClick(tab, event) {
      console.log("activeName: ", this.activeName);
      this.loading = true;
      this.params = { stationName: this.stationName };
      if (this.activeName == "first") {
        this.url = TEST_CHANGE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "second") {
        this.url = THREE_PHASE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "third") {
        this.url = SINGLE_PHASE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "forth") {
        this.url = DC_RESISTANCE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "fifth") {
        this.url = LOOP_RESISTANCE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "sixth") {
        this.url = INSULATION_QUERY_BY_STATION_URL;
      } else if (this.activeName == "seventh") {
        this.url = HV_GENERATOR_QUERY_BY_STATION_URL;
      } else if (this.activeName == "nighth") {
        this.url = DCHV_WITHSTAND_VOLTAGE_QUERY_BY_STATION_URL;
      } else if (this.activeName == "ninth") {
        this.url = DCHV_ARRESTER_QUERY_BY_STATION_URL;
      } else if (this.activeName == "tenth") {
        this.url = HV_TEST_QUERY_BY_STATION_URL;
      }

      console.log("url", this.url);
      console.log("url1111", INSULATION_QUERY_BY_STATION_URL);
      initData(this.url, this.params).then((data) => {
        console.log("data", data);
        this.total = data.length;
        this.listdata = data;
        // time 毫秒后显示表格
        setTimeout(() => {
          this.loading = false;
        }, this.time);
        // resolve(data);
      });
    },
  },
};
</script>

<style scoped>
</style>
