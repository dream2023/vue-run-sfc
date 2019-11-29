# vue-run-sfc | Vue DEMO 利器, 在线运行 & 编辑 Vue 单文件

## 介绍

我一直在思考 🤔 怎么的 Vue 文档交互才是好的 👍, 后来得出的结论是:

- 能看代码
- 能看效果
- 能在线编辑代码, 并实时预览结果

能做到前 2 点的 Vue 组件不少, 但能做到第 3 点, 并对文档的 DEMO 编写做优化处理的并不多, 所以才有了`vue-run-sfc`.

## DEMO

[https://dream2023.github.io/vue-run-sfc/](https://dream2023.github.io/vue-run-sfc/)

## 特性

- 在线预览和编辑 Vue 单文件
- 错误提示
- 全屏模式

![image](https://cdn.nlark.com/yuque/0/2019/gif/364322/1574954317267-af8cb219-8330-4e34-b9ac-a4ed417192a7.gif)

## 安装

```bash
yarn add vue-run-sfc # npm install vue-run-sfc --save
```

## 使用

### 全局注册

```js
import VueRunSfc from 'vue-run-sfc'

Vue.use(VueRunSfc, {
  // 全局配置(非必填),  具体属性含义参考 `props` 说明
  cssLabs: ['https://unpkg.com/normalize.css@8.0.1/normalize.css'],
  jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
  row: true,
  reverse: true,
  height: '400px',
  open: true
})
```

### 局部注册

```html
<script>
  import { VueRunSfc } from 'vue-run-sfc'

  export default {
    components: { VueRunSfc }
  }
</script>
```

## 示例

```html
<template>
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
    data() {
      return {
        jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
        cssLabs: [
          'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css'
        ],
        code: `<template>
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
<\/script>
<style>
  body {color: #409EFF;}
</style>`
      }
    }
  }
</script>
```

## props 属性说明

```js
props: {
  /**
   * 代码
   * @example: '<template><div>123</div></template>'
   */
  code: String,

  /**
   * js 库
   * @example: ['https://unpkg.com/element-ui/lib/index.js']
   */
  jsLabs: Array,

  /**
   * css 库
   * @example: '<template><div>123</div></template>'
   */
  // css 库
  cssLabs: Array,

  /**
   * js 字符串
   * @example: 'alert(1)'
   */
  // js 字符串数组
  js: [Array, String],

  /**
   * css 字符串
   * @example: 'body { color: red }'
   */
  css: [Array, String],

  /**
   * 代码编辑器和效果预览排列方式
   * 当为 false 时, 上下排列
   * 当为 true 时, 左右排列
   */
  row: {
    type: Boolean,
    default: undefined
  },

  /**
   * 当 `row` 为 true 时, 编辑区和展示区上下位置
   * 当为 false 时, 编辑器在下, 展示区在上
   * 当为 true 时, 编辑器在上, 展示区在下
   */
  reverse: Boolean,

  /**
   * 标题
   * @example: '测试demo'
   */
  // 标题
  title: String,

  /**
   * 高度
   * @example: '400px'
   */
  // 高度
  height: String,

  /**
   * 初始加载是否打开编辑区
   * 当为 false 时, 默认是关闭编辑区
   * 当为 true 时, 默认是打开编辑区
   */
  open: Boolean
}
```

## 相关链接

- [vuep.run](https://vuep.run/)
- [codepen](http://codepen.io/)
- [iview run](https://run.iviewui.com/)
