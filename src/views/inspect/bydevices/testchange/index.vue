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
          <el-form-item label="username">
            <el-input v-model="form.username" style="width: 370px" />
          </el-form-item>
          <el-form-item label="station">
            <el-input v-model="form.station" style="width: 370px" />
          </el-form-item>
          <el-form-item label="deviceId">
            <el-input v-model="form.deviceId" style="width: 370px" />
          </el-form-item>
          <el-form-item label="ssid">
            <el-input
              v-model="form.ssid"
              :rows="3"
              type="textarea"
              style="width: 370px"
            />
          </el-form-item>
          <el-form-item label="currentChange">
            <el-input v-model="form.currentChange" style="width: 370px" />
          </el-form-item>
          <el-form-item label="connectStyle">
            <el-input v-model="form.connectStyle" style="width: 370px" />
          </el-form-item>
          <el-form-item label="fenjieValue">
            <el-input v-model="form.fenjieValue" style="width: 370px" />
          </el-form-item>
          <el-form-item label="fenjieBit">
            <el-input v-model="form.fenjieBit" style="width: 370px" />
          </el-form-item>
          <el-form-item label="caChange">
            <el-input v-model="form.caChange" style="width: 370px" />
          </el-form-item>
          <el-form-item label="caError">
            <el-input v-model="form.caError" style="width: 370px" />
          </el-form-item>
          <el-form-item label="caAngle">
            <el-input v-model="form.caAngle" style="width: 370px" />
          </el-form-item>
          <el-form-item label="bcChange">
            <el-input v-model="form.bcChange" style="width: 370px" />
          </el-form-item>
          <el-form-item label="bcError">
            <el-input v-model="form.bcError" style="width: 370px" />
          </el-form-item>
          <el-form-item label="bcAngle">
            <el-input v-model="form.bcAngle" style="width: 370px" />
          </el-form-item>
          <el-form-item label="abChange">
            <el-input v-model="form.abChange" style="width: 370px" />
          </el-form-item>
          <el-form-item label="abError">
            <el-input v-model="form.abError" style="width: 370px" />
          </el-form-item>
          <el-form-item label="abAngle">
            <el-input v-model="form.abAngle" style="width: 370px" />
          </el-form-item>
          <el-form-item label="inspectTime">
            <el-input v-model="form.inspectTime" style="width: 370px" />
          </el-form-item>
          <el-form-item label="other1">
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
        <el-table-column
          v-if="checkPer(['admin', 'testChange:edit', 'testChange:del'])"
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
import crudTestChange from '@/api/testChange'
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
  currentChange: null,
  connectStyle: null,
  fenjieValue: null,
  fenjieBit: null,
  caChange: null,
  caError: null,
  caAngle: null,
  bcChange: null,
  bcError: null,
  bcAngle: null,
  abChange: null,
  abError: null,
  abAngle: null,
  inspectTime: null,
  sysState: null,
  saveTime: null,
  other1: null,
  other2: null,
  other3: null
}
export default {
  name: 'TestChange',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: '变化测试仪',
      url: 'api/testChange',
      idField: 'id',
      sort: 'inspectTime,desc',
      crudMethod: { ...crudTestChange }
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'testChange:add'],
        edit: ['admin', 'testChange:edit'],
        del: ['admin', 'testChange:del']
      },
      rules: {},
      queryTypeOptions: [
        { key: 'username', display_name: 'username' },
        { key: 'station', display_name: 'station' },
        { key: 'deviceId', display_name: 'deviceId' },
        { key: 'ssid', display_name: 'ssid' }
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
