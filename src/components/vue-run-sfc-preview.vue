<template>
  <div class="vue-run-sfc-preview">
    <vue-element-loading :active="loading" spinner="spinner" color="#409EFF" />

    <iframe
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      scrolling="yes"
      ref="iframe"
      frameborder="0"
      style="width: 100%;height: 150px"
    ></iframe>
  </div>
</template>

<script>
// 参考: https://github.com/QingWei-Li/vuep.run/blob/master/src/components/preview.vue
import VueElementLoading from 'vue-element-loading'
const { debounce } = require('throttle-debounce')

export default {
  components: {
    VueElementLoading
  },
  props: {
    jsLabs: {
      type: Array,
      default: () => []
    },
    js: {
      type: [Array, String],
      default: () => []
    },
    cssLabs: {
      type: Array,
      default: () => []
    },
    css: {
      type: [Array, String],
      default: () => []
    },
    value: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const iframe = this.$refs.iframe
    const iframeDocument = iframe.contentWindow.document
    const stylesTags = this.cssLabs.map(
      style => `<link rel="stylesheet" href="${style}" />`
    )
    const scriptTags = this.jsLabs.map(
      script => `<script src="${script}"><\/script>`
    )
    const js = Array.isArray(this.js) ? this.js : [this.js]
    const css = Array.isArray(this.css) ? this.css : [this.css]
    const html = `
<!DOCTYPE html>
  <html>
    <head>
      ${stylesTags.join('\n')}
      <style>${css.join('\n')}</style>
      <script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'><\/script>
      ${scriptTags.join('\n')}
      <script>${js.join('\n')}<\/script>
    </head>
    <body id="body">
    </body>
</html>`
    iframeDocument.open()
    iframeDocument.write(html)
    iframeDocument.close()
    iframe.onload = () => {
      this.setHTML()
      this.loading = false
    }

    iframe.error = () => {
      this.loading = false
    }
  },
  data () {
    return {
      iframe: null,
      iframeDocument: null,
      loading: true
    }
  },
  watch: {
    value () {
      this.setHTML()
    }
  },
  methods: {
    // 根据内容更改高度
    changeHeight () {
      if (!this.debounceChangeHeight) {
        this.debounceChangeHeight = debounce(300, () => {
          const iframe = this.iframe
          const iframeDocument = this.iframeDocument
          iframe.style.display = 'block'
          const height = iframeDocument.documentElement.scrollHeight
          iframe.style.height = height + 'px'
          this.$emit('change-height', height)
        })
      }
      this.debounceChangeHeight()
    },
    // 设置html
    setHTML () {
      const { styles = [], script = '', error } = this.value
      const iframe = this.$refs.iframe
      const iframeDocument = iframe.contentWindow.document

      if (iframeDocument) {
        const body = iframeDocument.getElementById('body')
        if (body) {
          const fragment = iframeDocument.createDocumentFragment()
          // 创建样式
          const newStyle = iframeDocument.createElement('style')
          newStyle.type = 'text/css'
          newStyle.innerHTML = styles.join('\n')

          // 创建元素
          const elApp = iframeDocument.createElement('div')
          const elError = iframeDocument.createElement('div')
          elApp.setAttribute('id', 'app')
          elError.setAttribute('id', 'error')
          if (error) {
            elError.innerHTML = `<pre style="color: red">${error}</pre>`
          }

          // 创建js
          const newScript = iframeDocument.createElement('script')
          newScript.type = 'text/javascript'
          newScript.innerHTML = script

          // 重置 html
          body.innerHTML = ''

          // 填充元素
          fragment.appendChild(newStyle)
          fragment.appendChild(elError)
          fragment.appendChild(elApp)
          fragment.appendChild(newScript)

          body.appendChild(fragment)

          this.iframe = iframe
          this.iframeDocument = iframeDocument

          if (!this.height) {
            this.$nextTick(() => {
              this.changeHeight()
              iframe.contentWindow.addEventListener(
                'resize',
                this.changeHeight,
                false
              )
            })
          }
        }
      }
    }
  },
  beforeDestory () {
    if (
      this.iframe &&
      this.iframe.contentWindow &&
      this.iframe.contentWindow.addEventListener
    ) {
      this.iframe.contentWindow.removeEventListener('resize', this.changeHeight)
    }
  }
}
</script>

<style>
/* 展示区样式 */
.vue-run-sfc-preview {
  background: white;
  padding: 10px 10px 10px 14px;
}
</style>
