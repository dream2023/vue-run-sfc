<template>
  <div class="vue-run-sfc-preview">
    <vue-element-loading :active="loading" spinner="spinner" color="#409EFF" />

    <iframe
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      scrolling="yes"
      ref="iframe"
      frameborder="0"
      style="width: 100%;height: 150px;"
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
    value: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const iframe = this.$refs.iframe
    const iframeDocument = iframe.contentWindow.document
    const styles = ['https://unpkg.com/element-ui/lib/theme-chalk/index.css']
    const scripts = [
      'https://unpkg.com/element-ui/lib/index.js',
      'https://unpkg.com/vue-ele-form/dist/vue-ele-form.umd.min.js'
    ]
    const stylesTags = styles.map(
      style => `<link rel="stylesheet" href="${style}" />`
    )
    const scriptTags = scripts.map(
      script => `<script src="${script}"><\/script>`
    )
    const html = `
<!DOCTYPE html>
  <html>
    <head>
      ${stylesTags.join('\n')}
      <script src='https://unpkg.com/vue@2.6.10/dist/vue.min.js'><\/script>
      ${scriptTags.join('\n')}
      <style>
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        pre {
          font-family: monospace;
          white-space: pre;
          line-height: 1.4;
          font-size: 16px;
          padding: 1.25rem 1.5rem;
          margin: 0.85rem 0;
          background-color: #282c34;
          border: 1px solid #eaeefb;
          border-radius: 6px;
          overflow: auto;
        }
      </style>
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
      const { styles = [], script = '' } = this.value
      const iframe = this.$refs.iframe
      const iframeDocument = iframe.contentWindow.document

      if (iframeDocument) {
        const body = iframeDocument.getElementById('body')
        if (body) {
          const fragment = iframeDocument.createDocumentFragment()
          // 创建样式
          const newStyle = iframeDocument.createElement('link')
          newStyle.type = 'text/css'
          newStyle.innerHTML = styles
            .map(style => `<style>${style}</style>`)
            .join('\n')

          // 创建元素
          const app = iframeDocument.createElement('div')
          const error = iframeDocument.createElement('div')
          app.setAttribute('id', 'app')
          error.setAttribute('id', 'error')

          // 创建js
          const newScript = iframeDocument.createElement('script')
          newScript.type = 'text/javascript'
          newScript.innerHTML = script

          // 重置 html
          body.innerHTML = ''

          // 填充元素
          fragment.appendChild(newStyle)
          fragment.appendChild(error)
          fragment.appendChild(app)
          fragment.appendChild(newScript)

          body.appendChild(fragment)

          this.iframe = iframe
          this.iframeDocument = iframeDocument

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
