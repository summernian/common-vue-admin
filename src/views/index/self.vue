<template>
    <div>
        <div>a: {{a}}</div>
        <div>b: {{b}}</div>
        <a-button type="primary" @click="getResult">{{btn}}</a-button>
    </div>
</template>
<script>
export default {
    name: 'self',
    props: {
        a: {
            type: Number,
            default: 0
        },
        b: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            btn: '求和'
        }
    },
    methods: {
        getResult() {
            let res = this.a + this.b;
            this.$emit('cb', res)
        }
    }
}
</script>
