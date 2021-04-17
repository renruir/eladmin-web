<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->        
        <label class="el-form-item-label">巡检员</label>
        <el-input v-model="query.username" clearable placeholder="巡检员" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备ID</label>
        <el-input v-model="query.deviceId" clearable placeholder="deviceId" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">站点</label>
        <el-input v-model="query.station" clearable placeholder="站点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="deviceId">
            <el-input v-model="form.deviceId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="username">
            <el-input v-model="form.username" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="station">
            <el-input v-model="form.station" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ssid">
            <el-input v-model="form.ssid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="inspectStyle">
            <el-input v-model="form.inspectStyle" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ptValueChange">
            <el-input v-model="form.ptValueChange" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="inspectName">
            <el-input v-model="form.inspectName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ix">
            <el-input v-model="form.ix" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="irp">
            <el-input v-model="form.irp" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ir1p">
            <el-input v-model="form.ir1p" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ir3p">
            <el-input v-model="form.ir3p" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ir5p">
            <el-input v-model="form.ir5p" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ir7p">
            <el-input v-model="form.ir7p" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="uH">
            <el-input v-model="form.uH" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="ic1p">
            <el-input v-model="form.ic1p" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="fi">
            <el-input v-model="form.fi" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="p1">
            <el-input v-model="form.p1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="f">
            <el-input v-model="form.f" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="uL">
            <el-input v-model="form.uL" style="width: 370px;" />
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
        <!-- <el-table-column prop="id" label="id" /> -->
        <el-table-column prop="username" label="巡检员" />
        <el-table-column prop="deviceId" label="设备ID" />
        <el-table-column prop="station" label="站点" />
        <!-- <el-table-column prop="ssid" label="ssid" /> -->
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
        <!-- <el-table-column prop="synState" label="synState" /> -->
        <el-table-column prop="other1" label="备注" />
        <!-- <el-table-column prop="other2" label="other2" /> -->
        <!-- <el-table-column prop="other3" label="other3" /> -->
        <el-table-column v-if="checkPer(['admin','singlePhase:edit','singlePhase:del'])" label="操作" width="150px" align="center">
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
import crudSinglePhase from '@/api/singlePhase'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, deviceId: null, username: null, station: null, ssid: null, inspectStyle: null, ptValueChange: null, inspectName: null, ix: null, irp: null, ir1p: null, ir3p: null, ir5p: null, ir7p: null, uH: null, ic1p: null, fi: null, p1: null, f: null, uL: null, inspectTime: null, saveTime: null, synState: null, other1: null, other2: null, other3: null }
export default {
  name: 'SinglePhase',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'G:\JavaWeb\workspace\RailInspection\eladmin\eladmin-system\src\main\java\me\zhengjie\modules\system\rest', url: 'api/singlePhase', idField: 'id', sort: 'id,desc', crudMethod: { ...crudSinglePhase }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'singlePhase:add'],
        edit: ['admin', 'singlePhase:edit'],
        del: ['admin', 'singlePhase:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'deviceId', display_name: 'deviceId' },
        { key: 'username', display_name: 'username' },
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
