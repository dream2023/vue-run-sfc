export default `<template>
  <vue-run-sfc
    :js-labs="jsLabs"
    :css-labs="cssLabs"
    title="测试DEMO"
    :open="true"
    :code="code"
  ></vue-run-sfc>
</template>

<script>

export default {
  data () {
    return {
      jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
      cssLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css'],
      code: \`<template>
<div>
  <h1>{{ title }}</h1>
  <div><el-button type="primary" @click="handleClick">点一下, 玩一年</el-button></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "宝刀屠龙"
    }
  },
  methods: {
    handleClick() {
      this.$message.success('装备不花一分钱')
    }
  }
};
<\\/script>
<style lang="scss">
  body {
    #box {
      color: #409EFF;
    }
  }
<\/style>\`
    }
  }
}
</script>
`
