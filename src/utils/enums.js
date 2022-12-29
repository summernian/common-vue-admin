/**
 * 枚举列表
 * ps: 在这里添加新的选项生成新的枚举
 */
const enumObjList = {
	// 角色
	Role : { admin: '管理员', superAdmin: '超级管理员', user: '用户' },
	
	// 性别
	Gender : {
		male: { text: '男 ♂', value: '1' },
		female: { text: '女 ♀', value: '2' },
		other: { text: '●﹏●', value: '3' },
	},
	
	// 婚姻状况
	MarriageStatus : {
		single: { text: '单身', value: '1' },
		married: { text: '已婚', value: '2' },
		divorce: { text: '离异', value: '3' },
	},
	
	// 爱好
	Hobby : {
		read: { text: '阅读', value: '1' },
		movie: { text: '电影', value: '2' },
		travel: { text: '旅行', value: '3' },
		other: { text: '其他', value: '4' },
	},
};

/**
 * 生成枚举值
 * ps: 根据枚举列表循环自动生成, 添加不需要修改这里
 */
let enums = {};
Object.keys(enumObjList).forEach(item => {
	enums[item] = new EnumFactory(enumObjList[item]);
});

/**
 * 枚举构造函数
 * ps: 添加新的枚举不需要动这里
 * @param {Object} enumObj
 * @returns { * }
 * @desc keys：枚举的key集合[key]
 * 		 texts：枚举的文本text集合[text]
 * 		 values：枚举的数值value集合[value]
 * 		 list：枚举的key、label、value集合[{ key, label, value }]
 * 		 formater：枚举数据文本的formatter函数, 根据传入的值, 返回文字说明
 */
function EnumFactory(enumObj) {
	//复制（继承）enumObj
	Object.assign(this, enumObj);
	
	// keys：枚举的key集合[key]
	Object.defineProperty(this, 'keys', {
		value: Object.keys(enumObj)
	});
	
	//处理texts、values、entries    
	let texts = [],
		values = [],
		list = [];
	const enumValues = Object.values(enumObj);
	if (typeof enumValues[0] === 'string') {
		texts = enumValues;
		values = Object.keys(enumObj);
		enumValues.forEach((item, index) => {
			list.push({
				label: texts[index],
				value: this.keys[index],
			});
		})
	} else {
		enumValues.forEach((item, index) => {
			texts.push(item.text);
			values.push(item.value);
			list.push({
				key: this.keys[index],
				label: item.text,
				value: item.value
			});
		})
	}
	// texts：枚举的文本text集合[text]
	Object.defineProperty(this, 'texts', {
		value: texts
	});
	// values：枚举的数值value集合[value]
	Object.defineProperty(this, 'values', {
		value: values
	});
	// list：枚举的key、label、value集合[{ key, label, value}]
	Object.defineProperty(this, 'list', {
		value: list
	});
	// formater：枚举数据文本的formatter函数
	Object.defineProperty(this, 'formater', {
		value: function(value) {
			return list.filter( v => v.key === value || v.value === value)[0]?.label || undefined;
		}
	});
	//枚举定义的数据都是常量，不可修改，冻结一下
	Object.freeze(this);
}


export { enums };