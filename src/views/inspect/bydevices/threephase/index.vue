<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">检测员</label>
        <el-input
          v-model="query.username"
          clearable
          placeholder="username"
          style="width: 185px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <label class="el-form-item-label">站点</label>
        <el-input
          v-model="query.station"
          clearable
          placeholder="station"
          style="width: 185px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <label class="el-form-item-label">设备ID</label>
        <el-input
          v-model="query.deviceId"
          clearable
          placeholder="deviceId"
          style="width: 185px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu"
        :title="crud.status.title"
        width="500px"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          size="small"
          label-width="80px"
        >
          <el-form-item label="检测员">
            <el-input v-model="form.username" style="width: 370px" />
          </el-form-item>
          <el-form-item label="站点">
            <el-input v-model="form.station" style="width: 370px" />
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input v-model="form.deviceId" style="width: 370px" />
          </el-form-item>
          <el-form-item label="测量方式">
            <el-input v-model="form.inspectStyle" style="width: 370px" />
          </el-form-item>
          <el-form-item label="PT变化">
            <el-input v-model="form.ptValueChange" style="width: 370px" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.inspectName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ix">
            <el-input v-model="form.aIx" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Irp">
            <el-input v-model="form.aIrp" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ir1p">
            <el-input v-model="form.aIr1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ir3p">
            <el-input v-model="form.aIr3p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ir5p">
            <el-input v-model="form.aIr5p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ir7p">
            <el-input v-model="form.aIr7p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Uh">
            <el-input v-model="form.aUh" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ic1p">
            <el-input v-model="form.aIc1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Fi">
            <el-input v-model="form.aFi" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相P1">
            <el-input v-model="form.aP1" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相F">
            <el-input v-model="form.aF" style="width: 370px" />
          </el-form-item>
          <el-form-item label="A相Ul">
            <el-input v-model="form.aUl" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ix">
            <el-input v-model="form.bIx" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Irp">
            <el-input v-model="form.bIrp" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ir1p">
            <el-input v-model="form.bIr1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ir3p">
            <el-input v-model="form.bIr3p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ir5p">
            <el-input v-model="form.bIr5p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ir7p">
            <el-input v-model="form.bIr7p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Uh">
            <el-input v-model="form.bUh" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ic1p">
            <el-input v-model="form.bIc1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Fi">
            <el-input v-model="form.bFi" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相P1">
            <el-input v-model="form.bP1" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相F">
            <el-input v-model="form.bF" style="width: 370px" />
          </el-form-item>
          <el-form-item label="B相Ul">
            <el-input v-model="form.bUl" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ix">
            <el-input v-model="form.cIx" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Irp">
            <el-input v-model="form.cIrp" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ir1p">
            <el-input v-model="form.cIr1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ir3p">
            <el-input v-model="form.cIr3p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ir5p">
            <el-input v-model="form.cIr5p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ir7p">
            <el-input v-model="form.cIr7p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Uh">
            <el-input v-model="form.cUh" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ic1p">
            <el-input v-model="form.cIc1p" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Fi">
            <el-input v-model="form.cFi" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相P1">
            <el-input v-model="form.cP1" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相F">
            <el-input v-model="form.cF" style="width: 370px" />
          </el-form-item>
          <el-form-item label="C相Ul">
            <el-input v-model="form.cUl" style="width: 370px" />
          </el-form-item>
          <el-form-item label="检测时间">
            <el-input v-model="form.inspectTime" style="width: 370px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.other1" style="width: 370px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button
            :loading="crud.status.cu === 2"
            type="primary"
            @click="crud.submitCU"
          >确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="检测员" />
        <el-table-column prop="station" label="站点" />
        <el-table-column prop="deviceId" label="设备ID" />
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
        <el-table-column prop="saveTime" label="上传时间" />
        <el-table-column prop="other1" label="备注" />
        <el-table-column
          v-if="checkPer(['admin', 'threePhase:edit', 'threePhase:del'])"
          label="操作"
          width="150px"
          align="center"
        >
          <template slot-scope="scope">
            <udOperation :data="scope.row" :permission="permission" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudThreePhase from '@/api/threePhase'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = {
  id: null,
  username: null,
  station: null,
  deviceId: null,
  ssid: null,
  inspectStyle: null,
  ptValueChange: null,
  inspectName: null,
  aIx: null,
  aIrp: null,
  aIr1p: null,
  aIr3p: null,
  aIr5p: null,
  aIr7p: null,
  aUh: null,
  aIc1p: null,
  aFi: null,
  aP1: null,
  aF: null,
  aUl: null,
  bIx: null,
  bIrp: null,
  bIr1p: null,
  bIr3p: null,
  bIr5p: null,
  bIr7p: null,
  bUh: null,
  bIc1p: null,
  bFi: null,
  bP1: null,
  bF: null,
  bUl: null,
  cIx: null,
  cIrp: null,
  cIr1p: null,
  cIr3p: null,
  cIr5p: null,
  cIr7p: null,
  cUh: null,
  cIc1p: null,
  cFi: null,
  cP1: null,
  cF: null,
  cUl: null,
  inspectTime: null,
  synState: null,
  other1: null,
  other2: null,
  other3: null,
  saveTime: null
}
export default {
  name: 'ThreePhase',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title:
        'G:JavaWebworkspaceRailInspectioneladmineladmin-systemsrcmainjavamezhengjiemodulessystem\rest',
      url: 'api/threePhase',
      idField: 'id',
      sort: 'id,desc',
      crudMethod: { ...crudThreePhase }
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'threePhase:add'],
        edit: ['admin', 'threePhase:edit'],
        del: ['admin', 'threePhase:del']
      },
      rules: {
        id: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      queryTypeOptions: [
        { key: 'username', display_name: 'username' },
        { key: 'station', display_name: 'station' },
        { key: 'deviceId', display_name: 'deviceId' },
        { key: 'ssid', display_name: 'ssid' },
        { key: 'inspectName', display_name: 'inspectName' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>
</style>
