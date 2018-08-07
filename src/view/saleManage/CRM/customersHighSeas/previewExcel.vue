<template>
  <div class="excel-preview com-dialog">
    <el-table
      ref="multipleTable"
      border
      :data="convertedData.body"
      tooltip-effect="dark"
      height="480"
      style="width: 100%"
    >
      <el-table-column
        v-for="header in convertedData.header"
        :key="header"
        align="center"
        :prop="header"
        :label="header"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="dialog-footer">
      <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
      <el-button class="save-button" @click="saveSubmitForm()">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'previewExcel',
    data () {
      return {
        convertedData: {
          header: [],
          body: [],
        },
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm () {
        this.$vDialog.close({type: 'save'})
      },
    },
    created () {
      this.convertedData = this.params.convertedData
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .excel-preview {
    padding: 20px;
  }
</style>
