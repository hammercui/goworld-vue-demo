/*
 * @Description: vue配置文件
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-10 16:52:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-28 17:09:44
 */
const path = require('path');

var webpack = require('webpack'); //引入webpack库
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //引入webpack-bundle-analyzer

// 在vue-config.js 中加入
// 开启gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//lodash按需加载
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// 判断开发环境
const isProduction = process.env.NODE_ENV === 'production';

const resolve = (dir) => {
	return path.join(__dirname, dir);
};
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/dist' : '/';
const BASE_URL = process.env.VUE_APP_BASE_URL;

const customConfigs = {
	publicPath: BASE_URL,
	devServer: {
		host: '0.0.0.0',
		port: 8081, // 端口号
		hotOnly: true,
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器
		// proxy: {
		// 	'/Werewolf/': {
		// 		target: "", // 跨域地址
		// 		changeOrigin: true, //是否跨域
		// 		secure: true, //是否使用https
		// 		pathRewrite: { '^/': '' }
		// 	},
		// }
	},
	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: true,
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('@c', resolve('src/components'));
		if (isProduction) {
			config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale下的所有文件
			// config.plugin('analyzer').use(new BundleAnalyzerPlugin()); //使用webpack-bundle-analyzer 生成报表
			config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
			//生产环境才开启 不然开发时lodash函数不起作用 也不报错
		}
		config.output.filename('[name].[hash].js').end();
	}
};

//生产环境
if (isProduction) {
	//webpack配置
	customConfigs['configureWebpack'] = (config) => {
		// 开启gzip压缩
		config.plugins.push(
			new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test: /\.js$|\.html$|\.json$|\.css/,
				threshold: 10240,
				minRatio: 0.8
			})
		);
		// 开启分离js
		config.optimization = {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 20000,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`;
						}
					}
				}
			}
		};
		// 取消webpack警告的性能提示
		config.performance = {
			hints: 'warning',
			//入口起点的最大体积
			maxEntrypointSize: 50000000,
			//生成文件的最大体积
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js');
			}
		};
	};
	customConfigs['css'] = {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		},
		extract: true, // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: false, // 开启 CSS source maps
		modules: false // 启用 CSS modules for all css / pre-processor files.
	};
	if (process.env.VUE_APP_MODE === 'prod') {
		//生产环境去掉log
		customConfigs['configureWebpack'] = (config) => {
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
		};
	}
} else {
	customConfigs['css'] = {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	};
}

module.exports = customConfigs;
