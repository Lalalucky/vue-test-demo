import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';

// 配置中文
Validator.addLocale(zh);
const config = {
	errorBagName: 'errors', // change if property conflicts.
	fieldsBagName: 'fieldBags', // 报冲突时 可自定义修改字段名称
	delay: 1000, // 错误提示的延迟时间
	strict: true, // 没有设置规则的表单不进行校验，
	enableAutoClasses: false,
	locale: 'zh_CN', // 对语言（中文）的配置
	classNames: {
		touched: 'touched', // the control has been blurred
		untouched: 'untouched', // the control hasn't been blurred
		valid: 'valid', // model is valid
		invalid: 'invalid', // model is invalid
		pristine: 'pristine', // control has not been interacted with
		dirty: 'dirty' // control has been interacted with
	},
	events: 'input', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
	inject: true
};
Vue.use(VeeValidate, config);

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      phone: '手机',
    }
  }
}
Validator.updateDictionary(dictionary)

Validator.extend('phone', {
	messages: {
		zh_CN: field => field + '必须是11位手机号码'
	},
	validate: value => {
		return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
	}
});
