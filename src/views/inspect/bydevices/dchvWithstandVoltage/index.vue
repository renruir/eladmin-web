<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">巡检员</label>
        <el-input v-model="query.username" clearable placeholder="巡检员" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备ID</label>
        <el-input v-model="query.deviceId" clearable placeholder="设备ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">站点</label>
        <el-input v-model="query.station" clearable placeholder="站点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id" prop="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="username">
            <el-input v-model="form.username" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="deviceId">
            <el-input v-model="form.deviceId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="station">
            <el-input v-model="form.station" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ssid">
            <el-input v-model="form.ssid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mProject">
            <el-input v-model="form.mProject" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mVoltage">
            <el-input v-model="form.mVoltage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mCurrent">
            <el-input v-model="form.mCurrent" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mTime">
            <el-input v-model="form.mTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="inspectTime">
            <el-input v-model="form.inspectTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="saveTime">
            <el-input v-model="form.saveTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="synState">
            <el-input v-model="form.synState" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="other1">
            <el-input v-model="form.other1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="other2">
            <el-input v-model="form.other2" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="other3">
            <el-input v-model="form.other3" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="巡检员" />
        <!-- <el-table-column prop="deviceId" label="设备ID" /> -->
        <el-table-column prop="station" label="站点" />
        <!-- <el-table-column prop="ssid" label="WiFi名称" /> -->
        <el-table-column prop="mProject" label="项目" />
        <el-table-column prop="mVoltage" label="试验电压" />
        <el-table-column prop="mCurrent" label="试验电流" />
        <el-table-column prop="mTime" label="试验时长" />
        <el-table-column prop="inspectTime" label="试验时间" />
        <!-- <el-table-column prop="synState" label="状态" /> -->
        <el-table-column prop="saveTime" label="上传时间" />
        <el-table-column prop="other1" label="备注" />
        <!-- <el-table-column prop="other2" label="other2" />
        <el-table-column prop="other3" label="other3" /> -->
        <el-table-column v-if="checkPer(['admin','dchvWithstandVoltage:edit','dchvWithstandVoltage:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudDchvWithstandVoltage from '@/api/dchvWithstandVoltage'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, username: null, deviceId: null, station: null, ssid: null, mProject: null, mVoltage: null, mCurrent: null, mTime: null, inspectTime: null, saveTime: null, synState: null, other1: null, other2: null, other3: null }
export default {
  name: 'DchvWithstandVoltage',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '直流高压发生器(耐压测试)', url: 'api/dchvWithstandVoltage', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDchvWithstandVoltage }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dchvWithstandVoltage:add'],
        edit: ['admin', 'dchvWithstandVoltage:edit'],
        del: ['admin', 'dchvWithstandVoltage:del']
      },
      rules: {
        id: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'username', display_name: 'username' },
        { key: 'deviceId', display_name: 'deviceId' },
        { key: 'station', display_name: 'station' }
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
