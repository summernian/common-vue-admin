<template>
    <div class="spacial-wrap">
        <div class="spacial-body">
            <div class="head">
                <div class="name">规则名称</div>
                <div class="range">应用范围</div>
                <div class="action" v-if="isEdit">操作</div>
            </div>
            <template v-if="isEdit">
                <div class="item" v-for="(item, index) in specialList" :key="item._id ? item._id : 'source'+index">
                    <div class="name pr">
                        <a-select :default-value="'方案取高'" style="width: 100px;">
                            <a-select-option :value="'方案取高'">方案取高</a-select-option>
                        </a-select>
                    </div>
                    <div class="range">
                        <a-select mode="multiple" style="width: 100%" showArrow
                            placeholder="请选择"
                            :default-value="[...item.ruleApplication.map(v => v.key)]" 
                            @focus="selectFocus(index)"
                            @change="val => void handleChange(val, index)"
                            @popupScroll="optionScroll"
                            option-label-prop="label"
                        >
                            <a-select-option :disabled="v.disabled"  v-for="v in finallyList" :key="v._id" :value="v._id" :label="v.schemeName">{{v.schemeName}}</a-select-option>
                        </a-select>
                    </div>
                    <div class="action">
                        <a-popconfirm placement="topRight"
                            title="删除后信息不可恢复,是否确认删除?" 
                            ok-text="确认" cancel-text="取消" 
                            @confirm="deleteItem(index)" 
                        >
                            <icon-font style="font-size: 18px; cursor: pointer" class="shanchuBtn" type="icon-shanchu" />
                        </a-popconfirm>
                    </div>
                </div>
                <a-button type="dashed" @click="addItem" block><a-icon type="plus" /> 新增</a-button>
            </template>
            <template v-else>
                <div class="item" v-for="item in specialList" :key="item._id">
                    <div class="name">{{item.ruleType}}</div>
                    <div class="range text-ellipsis">
                        <template v-for="(v, i) in (item.ruleApplication || [])">
                            {{i ? '、' : ''}}
                            <span class="tag" :key="v.key">{{v.value?v.value:`方案${v.key}`}}</span>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        <div class="spacial-bottom">
            <a-button @click="isEdit ? quite() : close()">{{ isEdit ? '退出编辑' : '取消' }}</a-button>
            <a-button type="primary" @click="isEdit ? submit() : isEdit = true">{{ isEdit ? '确认' : '编辑'}}</a-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'spacial',
    props: {},
    computed: {
        // 初始options
        autoOptList: {
            get() {
                let optArr = [];
                this.specialList.forEach(item => {
                    item.ruleApplication.forEach(v => {
                        v.value = v.value ? v.value : `方案${v.key}`;
                        v.schemeName = v.value ? v.value : `方案${v.key}`;
                        v._id = v.key;
                        optArr.push(v)
                    })
                });
                return optArr
            },
            set(newVal) {
                // console.log('aotoList',newVal);
            }
        },
        // 全部被选中的
        filters: {
            get() {
                let optArr = [];
                this.specialList.forEach(item => {
                    item.current.forEach(v => {
                        v.value = v.value ? v.value : `方案${v.key}`;
                        v.schemeName = v.value ? v.value : `方案${v.key}`;
                        v._id = v.key;
                        optArr.push(v)
                    })
                });
                return optArr
            },
            set(newVal) {
                // console.log('filters',newVal);
            }
        },
        // 最终呈现
        finallyList: {
            get() {
                // 判断
                // 循环optList, 当前项id
                // 判断，所有被选中的（filters）元素， 剔除掉当前项（current）, 如果最终值不包含optLits当前项（v）
                // 则当前项禁止
                return this.optionsList.map(v => {
                    if(this.filters.filter(o => !this.current.map(u => u._id).includes(o._id)).map(u => u._id).includes(v._id)) {
                        v.disabled = true;
                    } else {
                        v.disabled = false;
                    }
                    return v
                })
            },
            set(newVal) {
                // console.log('finallyList',newVal);
            }
        }

    },
    watch: {
        specialList: {
            handler(newVal) {
                let optArr = [];
                newVal.forEach(item => {
                    item.current.forEach(v => {
                        v.value = v.value ? v.value : `方案${v.key}`;
                        v.schemeName = v.value ? v.value : `方案${v.key}`;
                        v._id = v.key;
                        optArr.push(v)
                    })
                });
                this.filters = optArr;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            isEdit: false,
            // 特殊规则列表
            specialList: [],
            // 筛选列表
            optionsList: [],
            isScroll: false,
            text: '',
            size: 10,
            page: 1,
            // 当前选中
            current: [],
            // 删除的id集合
            ids: [],
        }
    },
    created() {
        this.getRuleList();
        this.getOptionList();
    },
    methods: {
        getRuleList() {
            this.$http.postReq({
                url: 'planSchemeSpecialRule/listPlanSchemeSpecialRule',
            }).then((res) => {
                if (res.success) {
                    this.specialList = res.data.map(item => ({
                        ...item,
                        current: item.ruleApplication,
                    }));
                } else {
                    this.specialList = []
                }
            })
        },
        getOptionList() {
            const {page, size, text} = this.$data;
            this.$http.postReq({
                url: "planScheme/listPlanSchemeLikeName",
                data: {page, size, text}
            }).then(res => {
                if (res.success) {
                    let repeatObj = {};
                    let curOpt = res.data.items.reduce((current, item) => {
                        if(!this.autoOptList.map(v => v._id).includes(item._id) && !repeatObj[item._id]) {
                            repeatObj[item._id] = true;
                            current.push(item);
                        }
                        return current;
                    }, [])
        
                    this.optionsList = (this.page == 1 ? [...this.autoOptList, ...curOpt] : [...this.optionsList, ...curOpt]);
                    this.isScroll = (res.data.total >= this.optionsList.length ? false : true);
                }
            });
        },
        optionScroll(e) {
            const { clientHeight, scrollHeight, scrollTop } = e.target;
            if (scrollHeight - clientHeight - scrollTop < 20) {
                if (!this.isScroll) {
                    this.isScroll = true
                    this.page += 1;
                    this.getOptionList();
                }
            }
        },
        optionSearch(val) {
            this.page = 1;
            this.text = val
            this.getOptionList();
        },
        // select焦点触发的时候
        selectFocus(index) {
            // 给当前选中赋值
            this.current = this.specialList[index].current;
            this.finallyList = this.optionsList.map(v => {
                if(this.filters.filter(o => !this.current.map(u => u._id).includes(o._id)).map(u => u._id).includes(v._id)) {
                    v.disabled = true;
                } else {
                    v.disabled = false;
                }
                return v
            })
        },
        // 值发生变化
        handleChange(val, index) {
            let selectedVal = this.optionsList.filter( v => val.includes(v._id) );
            this.current = this.specialList[index].current = selectedVal.map(v => ({
                value: v.schemeName,
                schemeName: v.schemeName,
                id: v._id,
                key: v._id
            }));
        },
        // 删除
        deleteItem(index) {
            if(this.specialList[index]._id) {
                this.ids = [...this.ids, this.specialList[index]._id];
            }
            this.specialList = this.specialList.filter((v, i) => i != index);
        },
        // 新增
        addItem() {
            this.specialList = [...this.specialList, {
                _id: '',
                ruleApplication: [],
                ruleType: '方案取高',
                current: []
            }]
        },
        close() {
            this.$emit('close');
        },
        quite() {
            this.getRuleList();
            this.isEdit = false;
        },
        submit() {
            if(!this.specialList.every(v => v.current.length)) {
                this.$message.error('请选择方案！')
                return false
            }
            if(this.specialList.some(v => v.current.length < 2)) {
                this.$message.error('请至少选两个方案！')
                return false
            }
            let specialRul = this.specialList.map(v => ({
                _id: v._id,
                ruleApplication: v.current.map(o => ({key: o.key, value: o.value})),
                ruleType: '方案取高',
            }));
            this.$http.postReq({
                url: 'planSchemeSpecialRule/saveOrUpdatePlanSchemeSpecialRule',
                data: { specialRul, ids: this.ids },
            }).then(res => {
                if (res.success) {
                    this.getRuleList();
                    this.$message.success('添加成功！');
                    this.isEdit = false;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .spacial-wrap {
        position: relative;
        height: 100%;

        .spacial-body {
            padding: 30px;
            height: calc(100% - 60px);
            overflow: hidden auto;

            .head {
                display: flex;
                align-items: center;

                width: 100%;
                height: 40px;
                background: #fafafa;
            }

            .item {
                display: flex;
                align-items: center;

                width: 100%;
                height: 60px;
            }

            .name {
                padding: 0 30px;
                width: 150px;
                &.pr {
                    padding-right: 0;
                }
            }

            .range {
                flex:  1;
                padding: 0 30px;

                .tag {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 3px;
                    max-width: 80px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .action {
                width: 75px;
                text-align: center;
            }
        }

        .spacial-bottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            position: absolute;
            left: 0;
            bottom: 0;
            padding: 0 30px;
            width: 100%;
            height: 60px;
            border-top: 1px solid #dcdcdc;
        }
    }

    // 让元素水平排列
    /deep/ .ant-select-selection--multiple .ant-select-selection__rendered {
        margin-left: 5px;
        margin-bottom: -3px;
        height: auto;
        max-width: 216px;
        max-height: 30px;
        overflow: auto;
        overflow-y: hidden;
        cursor: default;
    }
    /deep/ .ant-select-selection--multiple .ant-select-selection__choice {
        overflow: initial;
    }
    // 调整内部样式
    /deep/ .ant-select ul,
    .ant-select ol {
        display: flex;
    }
    /deep/ .ant-select-selection--multiple > ul > li,
    .ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
        margin-top: 3px;
        width: auto;
        height: 22px;
        max-height: 200px;
        line-height: 22px;
        font-size: 14px;
    }
    /deep/ .ant-select-search--inline .ant-select-search__field__wrap {
        max-width: 0px !important;
    }
    /deep/ .ant-select-selection__rendered::-webkit-scrollbar {
        /*滚动条整体样式*/
        height: 5px;
        cursor: pointer;
    }
    /deep/ .ant-select-selection__rendered::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #888;
        border-radius: 5px;
        cursor: pointer;
    }
    /deep/ .ant-select-selection__rendered::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, .1);
        background: #ededed;
        border-radius: 5px;
        cursor: pointer;
    }
    /deep/ .ant-select-selection--multiple {
        height: 30px;
    }
    .ant-select-selection--multiple .ant-select-selection__choice {
        padding: 0 0px 0 0px;
    }
    /deep/ .ant-select-selection__choice {
        padding-right: 15px;
        position: relative;
        &:not(:nth-last-of-type(2))::after {
            position: absolute;
            display: inline-block;
            width: 15px;
            text-align: right;
            top: 0px;
            right: 0px;
            content: ' 、';
        }
    }
    /deep/.ant-select-selection--multiple .ant-select-selection__choice {
        // padding: 20px 0 0 24px;
        background: #ffffff;
        border: none;
    }
    /deep/.ant-select-selection--multiple .ant-select-selection__choice__remove {
        display: none;
    }
</style>