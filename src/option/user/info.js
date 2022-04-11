export default {
  tabs: true,
  tabsActive: 1,
  group: [
    {
      label: '个人信息',
      prop: 'info',
      column: [{
        label: '头像',
        type: 'upload',
        listType: 'picture-img',
        propsHttp: {
          res: 'data',
          url: 'link',
        },
        canvasOption: {
          text: ' ',
          ratio: 0.1
        },
        //action: '/api/blade-resource/oss/endpoint/put-file',
        formsolt: true,
        tip: '只能上传jpg/png用户头像，且不超过500kb',
        span: 24,
        row: true,
        prop: 'avatar'
      }, {
        label: '姓名',
        span: 12,
        row: true,
        prop: 'name',
        rules: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }]
      }, {
        label: '用户名',
        span: 12,
        row: true,
        prop: 'realName',
        rules: [{
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        }]
      }, {
        label: '手机号',
        span: 12,
        row: true,
        prop: 'phone'
      }, {
        label: '邮箱',
        prop: 'email',
        span: 12,
        row: true,
      }]
    },
    {
      label: '修改密码',
      prop: 'password',
      column: [{
        label: '原密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'oldPassword',
        rules: [{
          required: true,
          message: "请输入原密码",
          trigger: "blur"
        }]
      }, {
        label: '新密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'newPassword',
        rules: [{
          required: true,
          message: "请输入新密码",
          trigger: "blur"
        }]
      }, {
        label: '确认密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'newPassword1',
        rules: [{
          required: true,
          message: "请输入确认密码",
          trigger: "blur"
        }]
      }]
    }
  ],
}
