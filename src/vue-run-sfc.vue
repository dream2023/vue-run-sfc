<template>
  <div
    ref="wrapper"
    class="vue-run-sfc"
    :style="{ 'overflow-y': isScreenfull ? 'auto' : 'hidden' }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- header部分 -->
    <vue-run-sfc-header
      :title="title"
      :is-row="isRow"
      :is-screenfull="isScreenfull"
      :is-expanded="isExpanded"
      @reset="handleReset"
      @change-row="isRow = !isRow"
      @screenfull="handleScreenfull"
    />
    <!-- 中间主体区 -->
    <vue-run-sfc-main
      :is-row="isRow"
      :is-expanded="isExpanded"
      :reverse="attrs.reverse"
      :style="{ height: isScreenfull ? 'inherit' : attrs.height }"
      :is-screenfull="isScreenfull"
    >
      <template v-slot:editor>
        <!-- 编辑器区域 -->
        <codemirror
          class="vue-run-sfc-editor"
          v-model="editCode"
          @input="handleRun"
          :style="{
            height: isScreenfull ? 'inherit' : editorHeight,
            borderBottom: isRow ? '' : '1px solid #ebeef5'
          }"
          :options="codemirrorOption"
        ></codemirror>
      </template>
      <template v-slot:preview>
        <!-- 运行结果展示 -->
        <vue-run-sfc-preview
          ref="preview"
          :js-labs="attrs.jsLabs"
          :css="attrs.css"
          :js="attrs.js"
          :css-labs="attrs.cssLabs"
          @change-height="handlePreviewHeightChange"
          :value="preview"
        />
      </template>
    </vue-run-sfc-main>

    <!-- 控制是否展开代码 -->
    <vue-run-sfc-control
      :is-screenfull="isScreenfull"
      :is-expanded="isExpanded"
      :hovering="hovering"
      @expanded="isExpanded = !isExpanded"
    />
  </div>
</template>

<script>
import { codemirror, codemirrorOption } from './codemirror'
import VueRunSfcPreview from './components/vue-run-sfc-preview'
import VueRunSfcHeader from './components/vue-run-sfc-header'
import VueRunSfcControl from './components/vue-run-sfc-control'
import VueRunSfcMain from './components/vue-run-sfc-main'

const { debounce } = require('throttle-debounce')
const compiler = require('vue-template-compiler')
const screenfull = require('screenfull')
const Babel = require('@babel/standalone')

export default {
  name: 'vue-run-sfc',
  components: {
    VueRunSfcHeader,
    VueRunSfcPreview,
    VueRunSfcControl,
    VueRunSfcMain,
    codemirror
  },
  props: {
    // 代码
    code: String,
    // js 库
    jsLabs: Array,
    // css 库
    cssLabs: Array,
    // js 字符串数组
    js: [Array, String],
    // css 字符串数组
    css: [Array, String],
    // 代码, 同上
    value: String,
    // 横排
    row: {
      type: Boolean,
      default: undefined
    },
    // 名称
    title: String,
    // 高度
    height: String,
    // 翻转
    reverse: Boolean
  },
  data () {
    return {
      // 当hover时
      hovering: false,
      // 是否展开编辑器
      isExpanded: false,
      // 编辑器配置
      codemirrorOption: codemirrorOption,
      // 当时是否为全屏
      isScreenfull: false,
      // 实际代码
      editCode: '',
      // 最初的代码(用于重置)
      initalCode: '',
      // 预览数据
      preview: {},
      // 预览区高度
      previewHeight: 0,
      // 布局
      isRow: null
    }
  },
  computed: {
    attrs () {
      const merge = key => {
        let globalVal = this.$_vue_run_sfc[key] || []
        if (globalVal && !Array.isArray(globalVal)) {
          globalVal = [globalVal]
        }
        let customVal = this.$props[key] || []
        if (customVal && !Array.isArray(customVal)) {
          customVal = [customVal]
        }
        return [...globalVal, ...customVal]
      }

      const props = Object.keys(this.$props).reduce((acc, key) => {
        if (this.$props[key]) {
          acc[key] = this.$props[key]
        }
        return acc
      }, {})

      return Object.assign({}, this.$_vue_run_sfc, props, {
        jsLabs: merge('jsLabs'),
        cssLabs: merge('cssLabs'),
        js: merge('js'),
        css: merge('css')
      })
    },
    // 编辑器高度, 动态计算
    editorHeight () {
      if (!this.attrs.height) {
        let editorHeight = 0
        const minHeight = 150 // 最小高度

        if (this.isRow) {
          // 如果是并排, 则根据预览区的高度 或者 最小高度
          editorHeight =
            this.previewHeight > minHeight ? this.previewHeight : minHeight
        } else {
          // 如果是column布局, 则按照本身的高度 或者 最小高度
          // 行高
          const lineHeight = 21
          // 额外高度
          const extraHeight = 20

          // 编辑区高度
          editorHeight =
            this.editCode.split(/\r\n|\r|\n/).length * lineHeight + extraHeight
          // 判断
          editorHeight = editorHeight > minHeight ? editorHeight : minHeight
        }
        return editorHeight + 'px'
      } else {
        return this.attrs.height
      }
    }
  },
  methods: {
    // 全屏
    handleScreenfull () {
      this.isScreenfull = !this.isScreenfull
      screenfull.toggle(this.$refs.wrapper)
    },
    // 运行代码
    // 参考: https://github.com/QingWei-Li/vuep.run/blob/master/src/components/preview.vue
    handleRun () {
      if (!this.runCode) {
        this.runCode = debounce(300, () => {
          const code = this.editCode
          this.$emit('input', code)
          this.$emit('change', code)
          if (!code) {
            return
          }

          let { template, script, styles, errors } = compiler.parseComponent(
            code
          )

          // 判断是否有错误
          if (errors && errors.length) {
            this.preview = {
              error: errors.join('\n')
            }
          } else {
            // 如果 html和js 都不存在
            if (!template && !script) return

            // 处理 css 样式(数组)
            styles = styles.map(style => style.content)

            // 处理 template
            template = template ? JSON.stringify(template.content) : '""'

            // 处理 js
            script =
              script && script.content.trim()
                ? script.content.trim()
                : 'export default {}'

            // 转码
            try {
              script = Babel.transform(script, {
                presets: ['es2015']
              }).code

              // 拼接
              script = `
              var errorHandler = function(error) {
                var el = document.getElementById('error')
                el.innerHTML = '<pre style="color: red">' + error.stack +'</pre>'
              }
              try {
                var exports = {};
                ${script}
                var component = exports.default;
                // 如果定义了 template函数, 则无需 template
                component.template = component.template || ${template}
              } catch (error){
                errorHandler(error)
              }

              // 错误处理
              Vue.config.errorHandler = errorHandler

              new Vue(component).$mount('#app')
            `

              this.preview = {
                styles: styles,
                script: script
              }
            } catch (error) {
              this.preview = {
                error: error.stack
              }
            }
          }
        })
      }
      this.runCode()
    },
    // 重置代码
    handleReset () {
      this.editCode = this.initalCode
      this.handleRun()
    },
    // 设置默认 row的 值
    setDefaultRow () {
      if (this.attrs.row !== undefined) {
        this.isRow = this.attrs.row
      } else {
        // 根据宽度, 响应式处理
        const setWidth = setInterval(() => {
          if (this.$refs.wrapper) {
            const width = this.$refs.wrapper.clientWidth
            this.isRow = width > 992

            clearInterval(setWidth)
          }
        }, 500)
      }
    },
    handlePreviewHeightChange (height) {
      this.previewHeight = height
    }
  },
  mounted () {
    this.setDefaultRow()
    let initalCode = this.code || this.value
    initalCode = initalCode ? decodeURIComponent(initalCode) : ''
    this.initalCode = initalCode
    this.editCode = initalCode
    this.handleRun()
  }
}
</script>

<style>
/* 主体样式 */
.vue-run-sfc {
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  background: white;
  color: #303133;
}
.vue-run-sfc:hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
}

/* 编辑器样式 */
.vue-run-sfc-editor {
  width: 100%;
  font-size: 14px;
  line-height: 1.5em;
}
.vue-run-sfc-editor .CodeMirror {
  height: inherit;
}
.vue-run-sfc-editor .CodeMirror-vscrollbar {
  display: none !important;
}
.vue-run-sfc-editor .CodeMirror-scrollbar-filler {
  display: none !important;
}
.vue-run-sfc-editor .CodeMirror-sizer {
  padding-right: 0 !important;
}
</style>
