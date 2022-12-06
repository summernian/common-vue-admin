const path = require('path');
const resolve = dir => path.join(__dirname, dir);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	// 将部署应用程序的基本URL
	// 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。如：https://www.my-app.com/。
	// 如果应用程序部署在子路径上，则需要使用此选项指定子路径。
	// 例如，如果您的应用程序部署在https://www.foobar.com/my-app/，设置baseUrl为'/my-app/'
	// baseUrl type: {string}, default: '/' 
	// 另注： CLI 3.3以上版本已禁用 改为 publicPath
	publicPath: './',
	
	// 在npm run build时 生成文件的目录 type:string, default:'dist'
	// outputDir: type: {string}, default:'dist'
	outputDir: 'dist',
	
	// 在npm run build时 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	// assetsDir: type: {string}, default: ''
	assetsDir: 'basic',
	
	// 生产源映射，即打包到生产环境，多生成一个map文件(偏大)
	// 如果报错了，可以精准定位到哪一行，否则看压缩后的代码，你都不知道哪报错了
	// 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建，并将代码加密(压缩文件看不懂)
	// productionSourceMap: type: {Bollean}, default: true
	// productionSourceMap: false, 
	
	// 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
	// 启用本选项，对所有的依赖都进行转译，但可能会降低构建速度
	// 可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名
	// transpileDependencies: process.env.NODE_ENV === 'development' ? ['*'] : [],
	
	css: {
		sourceMap: true,
        loaderOptions: {
			less: {
                lessOptions: {
					javascriptEnabled: true,
				},
            },
        },
    },
	
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
			}
		}
	},
	
	chainWebpack(config) {
		// 修复热更新失效
		config.resolve.symlinks(true);
		config.plugin('html').tap(opts => {
			// 设置项目名
			opts[0].title = '项目名';
			// 全局配置
			opts[0].globalConfig = '/config.js'; 
			return opts
		});
		// 去除 vue-loader 警告
		config.module.rule('vue').use('vue-loader').loader('vue-loader').tap( options => { 
			options.prettify = false; 
			return options;
		});
		//设置开发环境sourceMap
		config.when(!isProd, config => config.devtool('cheap-source-map'));
		//生产环境
		config.when(isProd, config => {
			// 将每个依赖包打包成单独的js文件
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial'
					},
					commons: {
						name: 'chunk-commons',
						test: /[\\/]src[\\/]js[\\/]/,
						minChunks: 2, //  minimum common number
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
			config.optimization.runtimeChunk('single');
			//去除生产环境debugger和console
			config.optimization.minimizer('terser').tap(args => {
				args[0].terserOptions.compress.warnings = false;
				args[0].terserOptions.compress.drop_console = true;
				args[0].terserOptions.compress.drop_debugger = true;
				args[0].terserOptions.compress.pure_funcs = ['console.*'];
				return args;
			});
		});
	},
	devServer: {
		port: 9999,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		// proxy: {
		// 	[process.env.VUE_APP_BASE_API]: {
		// 		target: "/",   // 实际跨域请求的API地址
		// 		secure: false,   // https请求则使用true
		//         changeOrigin: true,  // 跨域
		//         // 请求地址重写: http://xxx.com/api/login ⇒ http://api-url/login
		//         pathRewrite: {
		//           ["^" + process.env.VUE_APP_BASE_API] : '/',
		//         }
		// 	},
		// 	'/api': {
		// 		target: "/",   // 实际跨域请求的API地址
		// 		secure: false,   // https请求则使用true
		//         changeOrigin: true,  // 跨域
		//         // 请求地址重写: http://xxx.com/api/login ⇒ http://api-url/login
		//         pathRewrite: {
		//           '^/api': '/',
		//         }
		// 	}
		// }
	}
};
if (process.env.NODE_ENV) {
    console.log('当前环境变量: ', process.env.NODE_ENV);
}