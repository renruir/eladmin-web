<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">检测员</label>
        <el-input v-model="query.username" clearable placeholder="username" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备ID</label>
        <el-input v-model="query.deviceId" clearable placeholder="deviceId" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">站点</label>
        <el-input v-model="query.station" clearable placeholder="station" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
          <el-form-item label="settingVoltage">
            <el-input v-model="form.settingVoltage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="settingCurrent">
            <el-input v-model="form.settingCurrent" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="settingTime">
            <el-input v-model="form.settingTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area1">
            <el-input v-model="form.area1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area2">
            <el-input v-model="form.area2" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area3">
            <el-input v-model="form.area3" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area4">
            <el-input v-model="form.area4" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area5">
            <el-input v-model="form.area5" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="area6">
            <el-input v-model="form.area6" style="width: 370px;" />
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
        <el-table-column prop="username" label="检测员" />
        <el-table-column prop="deviceId" label="设备ID" />
        <el-table-column prop="station" label="站点" />
        <!-- <el-table-column prop="ssid" label="ssid" /> -->
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
         <!-- <el-table-column prop="synState" label="状态" /> -->
        <el-table-column prop="saveTime" label="上传时间" />
        <el-table-column prop="other1" label="备注" />
        <!-- <el-table-column prop="other2" label="other2" />
        <el-table-column prop="other3" label="other3" /> -->
        <el-table-column v-if="checkPer(['admin','insulation:edit','insulation:del'])" label="操作" width="150px" align="center">
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
import crudInsulation from '@/api/insulation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, username: null, deviceId: null, station: null, ssid: null, settingVoltage: null, settingCurrent: null, settingTime: null, area1: null, area2: null, area3: null, area4: null, area5: null, area6: null, inspectTime: null, saveTime: null, synState: null, other1: null, other2: null, other3: null }
export default {
  name: 'Insulation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'G:\JavaWeb\workspace\RailInspection\eladmin\eladmin-system\src\main\java\me\zhengjie\modules\system\rest', url: 'api/insulation', idField: 'id', sort: 'id,desc', crudMethod: { ...crudInsulation }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'insulation:add'],
        edit: ['admin', 'insulation:edit'],
        del: ['admin', 'insulation:del']
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
