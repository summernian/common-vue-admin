import { debounce, throttle } from '@/utils'
const optimize = {
	bind(el, { value, arg }) {
		// 根据binding.value获取参数
		const { emit = 'click', fn, delay = 200 } = value;
		// 根据arg的参数执行不同的函数
		if(arg === 'debounce' || arg === 'fangdou' || arg === 'fd') {
			// 防抖时，默认为false符合操作习惯
			let { immediate = false } = value;
			el.addEventListener(emit, debounce(fn, delay, immediate))
		} 
		if(arg === 'throttle' || arg === 'jieliu' || arg === 'jl') {
			// 节流时，默认为true符合操作习惯
			let { immediate = true } = value;
			el.addEventListener(emit, throttle(fn, delay, immediate))
		}
	},
};

export default optimize;