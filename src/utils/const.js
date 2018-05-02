export const pageMinWidth = 1100 // 页面最小宽度

export const server = 'localhost:3000/api' // server地址

// 表单验证
export const chartLengthRule = {
  min: 1,
  max: 20,
  message: '长度在 1 到 20 个字符',
  trigger: 'blur',
}

// 分页
export const pagesOptions = {
  layout: 'total,sizes, prev, pager, next, jumper', // 分页
  pageSizes: [10, 20, 30, 40],
  pageSize: 10,
}
