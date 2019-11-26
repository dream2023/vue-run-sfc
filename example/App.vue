<template>
  <div style="height: 2000px">
    <vue-run-sfc
      :jsLabs="jsLabs"
      :cssLabs="cssLabs"
      title="测试DEMO"
      :code="code"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
      cssLabs: [
        'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css'
      ],
      code: `<template>
  <div>
    <h1>{{title}}</h1>
    <div><el-button type="danger" @click="handleClick">点一下, 玩一年</el-button></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: "宝刀屠龙"
      };
    },
    methods: {
      handleClick () {
        alert('装备不花一分钱')
      }
    }
  };
<\/script>
<style>
  body {color: #F56C6C;}
</style>`
    }
  },
  methods: {},
  mounted () {}
}
</script>
