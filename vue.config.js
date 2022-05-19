const path = require('path');
const resolve = dir => path.join(__dirname, dir);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	productionSourceMap: false,
	outputDir: 'dist',
	publicPath: './',
	css: {
        loaderOptions: {
			less: {
                lessOptions: {javascriptEnabled: true},
            },
        },
    },
	devServer: {
		port: 9999,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		// proxy: {
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
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
			}
		}
	},
	chainWebpack(config) {
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

			//去除生产环境debugger 和console
			config.optimization.minimizer('terser').tap(args => {
				args[0].terserOptions.compress.warnings = false;
				args[0].terserOptions.compress.drop_console = true;
				args[0].terserOptions.compress.drop_debugger = true;
				args[0].terserOptions.compress.pure_funcs = ['console.*'];
				return args;
			});
		});
	}
};
