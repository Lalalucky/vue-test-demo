const path = require('path');
// 移动端适配
const px2rem = require('postcss-px2rem');
const postcss = px2rem({
	remUnit: 37.5 // 设计稿等分后的rem值   750/10 = 75
});

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: false,

	chainWebpack: config => {
		config.resolve.alias
			.set('vue$', 'vue/dist/vue.esm.js')
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'));
	},

	css: {
		// 添加postcss配置
		loaderOptions: {
			postcss: {
				plugins: [postcss]
			}
		}
	},

	devServer: {
		proxy: {
			'/api': {
				target: '...',
				changeOrigin: true,
				pathRewrite: {
					'^api': ''
				}
			}
		}
	},

	pluginOptions:{}
};
