class TypeMsg {
  // 数据类型检测 状态
  status: 0;

  // 数据类型检测 信息
  msg: '验证正确。';

  // 数据类型检测的值
  value: '';

  constructor(status, msg, value) {
    this.status = status || 0;
    this.msg = msg || '';
    this.value = value || '';
  }
  setStatus(status: 0) {
    this.status = status;
    return this;
  }

  setMsg(msg) {
    this.status = status;
    return this;
  }

  setValue(msg) {
    this.value = value;
    return this;
  }
}
