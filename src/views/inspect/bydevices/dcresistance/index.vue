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
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu " :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id">
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
          <el-form-item label="mResistance">
            <el-input v-model="form.mResistance" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="eResistance">
            <el-input v-model="form.eResistance" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="fenjiePosition">
            <el-input v-model="form.fenjiePosition" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mPhase">
            <el-input v-model="form.mPhase" style="width: 370px;" />
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
          <el-form-item label="current">
            <el-input v-model="form.current" style="width: 370px;" />
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
        <el-table-column prop="deviceId" label="设备ID" />
        <el-table-column prop="station" label="站点" />
        <!-- <el-table-column prop="ssid" label="WiFi名称" /> -->
        <el-table-column prop="current" label="测试电流" />
        <el-table-column prop="mResistance" label="测量电阻" />
        <el-table-column prop="eResistance" label="换算电阻" />
        <el-table-column prop="fenjiePosition" label="分接位置" />
        <el-table-column prop="mPhase" label="测试相别" />
        <el-table-column prop="inspectTime" label="时间" />
        <el-table-column prop="saveTime" label="上传时间" />
        <!-- <el-table-column prop="synState" label="状态" /> -->
        <el-table-column prop="other1" label="备注" />
        <!-- <el-table-column prop="other2" label="other2" />
        <el-table-column prop="other3" label="other3" /> -->
   
        <el-table-column v-if="checkPer(['admin','dcResistance:edit','dcResistance:del'])" label="操作" width="150px" align="center">
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
import crudDcResistance from '@/api/dcResistance'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, username: null, deviceId: null, station: null, ssid: null, mResistance: null, eResistance: null, fenjiePosition: null, mPhase: null, inspectTime: null, saveTime: null, synState: null, other1: null, other2: null, other3: null, current: null }
export default {
  name: 'DcResistance',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '直流电阻测试仪', url: 'api/dcResistance', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDcResistance }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dcResistance:add'],
        edit: ['admin', 'dcResistance:edit'],
        del: ['admin', 'dcResistance:del']
      },
      rules: {
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
