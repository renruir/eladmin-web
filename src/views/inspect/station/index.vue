<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">站点名称</label>
        <el-input
          v-model="query.stationName"
          clearable
          placeholder="stationName"
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
        <label class="el-form-item-label">设备名称</label>
        <el-input
          v-model="query.deviceName"
          clearable
          placeholder="deviceName"
          style="width: 185px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!-- <el-button slot="right" size="mini" class="filter-item" type="primary"
          >Excel导入</el-button
        > -->
      <div slot="right">
        <el-upload
          ref="uploadexcel"
          v-loading="uploading"
          element-loading-text="正在上传……"
          action="http://106.14.33.152/api/stationDevicesInfo/importBatch"
          accept=".xlsx"
          :headers="headers"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="uploadOnError"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
          >导入到服务器</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传xlsx或xls文件，且不超过500kb
          </div>
        </el-upload>
      </div>

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
          <el-form-item label="站点编号">
            <el-input v-model="form.stationIndex" style="width: 370px" />
          </el-form-item>
          <el-form-item label="站点名称">
            <el-input v-model="form.stationName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input v-model="form.deviceId" style="width: 370px" />
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="form.deviceName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="form.attachInfo" style="width: 370px" />
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
        <el-table-column prop="stationIndex" label="站点编号" />
        <el-table-column prop="stationName" label="站点名称" />
        <el-table-column prop="deviceId" label="设备ID" />
        <el-table-column prop="deviceName" label="设备名称" />
        <el-table-column prop="attachInfo" label="其他" />
        <el-table-column
          v-if="
            checkPer([
              'admin',
              'stationDevicesInfo:edit',
              'stationDevicesInfo:del',
            ])
          "
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
import crudStationDevicesInfo from '@/api/stationDevicesInfo'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { getToken } from '@/utils/auth'

const defaultForm = {
  id: null,
  stationIndex: null,
  stationName: null,
  deviceId: null,
  deviceName: null,
  attachInfo: null
}
export default {
  name: 'StationDevicesInfo',
  inject: ['reload'],
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: '站点设备信息',
      url: 'api/stationDevicesInfo',
      idField: 'id',
      sort: 'id,desc',
      crudMethod: { ...crudStationDevicesInfo }
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stationDevicesInfo:add'],
        edit: ['admin', 'stationDevicesInfo:edit'],
        del: ['admin', 'stationDevicesInfo:del']
      },
      uploading: '',
      rules: {},
      headers: {
        Authorization: getToken()
      },
      queryTypeOptions: [
        { key: 'stationName', display_name: 'stationName' },
        { key: 'deviceId', display_name: 'deviceId' },
        { key: 'deviceName', display_name: 'deviceName' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitUpload() {
      console.log('555')
      this.uploading = true
      this.$refs.uploadexcel.submit()
    },
    handleSuccess(response) {
      console.log('response: ' + response)
      this.uploading = false
      this.reload()
      this.$message({
        message: response + '条数据导入成功',
        type: 'success'
      })
    },
    uploadOnError() {}
  }
}
</script>

<style scoped>
</style>
