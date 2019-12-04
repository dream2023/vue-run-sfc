<template>
  <div>
    <div class="page-header">
      <div class="logo">
        <img
          style="width:120px;"
          src="https://vuejs.org/images/logo.png"
          alt=""
        />
      </div>
      <h1 class="project-name">vue-run-sfc</h1>
      <h2 class="project-tagline">文档利器, 在线运行 & 编辑 Vue 单文件</h2>
      <div>
        <a
          href="https://github.com/dream2023/vue-run-sfc"
          target="_blank"
          class="btn"
          >View on GitHub</a
        >
        <a
          href="https://www.npmjs.com/package/vue-run-sfc"
          target="_blank"
          class="btn"
          >View on NPM</a
        >
      </div>
    </div>
    <section class="main-content">
      <h2>DEMO</h2>
      <vue-run-sfc
        :js-labs="jsLabs"
        :css-labs="cssLabs"
        title="测试DEMO"
        :open="true"
        :code="code"
      />
      <h2>DEMO 源码</h2>
      <codemirror
        style="border-top: 1px solid #eee"
        :options="codemirrorOption"
        v-model="exampleCode"
      />
    </section>
  </div>
</template>

<script>
import { codemirror, codemirrorOption } from '../src/codemirror'
import exampleCode from './example'

export default {
  name: 'App',
  components: {
    codemirror
  },
  data () {
    return {
      exampleCode: exampleCode,
      codemirrorOption: codemirrorOption,
      jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
      cssLabs: [
        'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css'
      ],
      code: `<template>
  <div>
    <h1>{{title}}</h1>
    <div><el-button type="primary" @click="handleClick">点一下, 玩一年</el-button></div>
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
        this.$message.success('装备不花一分钱')
      }
    }
  };
<\/script>

<style lang="scss">
  body {
    #box {
      color: #409EFF;
    }
  }
</style>`
    }
  }
}
</script>

<style>
@import url('./app.css');
pre {
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  margin: 0.85rem 0;
  background-color: #282c34;
  border-radius: 6px;
  overflow: auto;
  color: rgba(255, 255, 255, 0.9);
}
</style>
