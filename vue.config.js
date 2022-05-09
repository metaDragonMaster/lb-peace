const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
module.exports = {
	lintOnSave: true,
	publicPath: './', // 基本路径
	outputDir: 'nft-peace-dist', // 输出文件目录
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
	css: {
		requireModuleExtension: true,
		// extract: true,
		sourceMap: process.env.NODE_ENV == 'development' ? true : false,
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
		config.plugin('AutoImport').use(
			AutoImport({
				dts: './build/auto-imports.d.ts',
				imports: ['vue'],
				resolvers: [
					ElementPlusResolver({
						importStyle: 'css',
						exclude: new RegExp(/^(?!.*loading-directive).*$/)
					})
				],
			})
		)
		config.plugin('Components').use(
			Components({
				resolvers: [ElementPlusResolver({ importStyle: 'css' })],
				dts: './build/components.d.ts'
			})
		)
		return config
	},
}
