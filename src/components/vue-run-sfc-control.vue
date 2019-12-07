<template>
  <!-- 底部控制区 -->
  <!-- 参考 element-ui https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue -->
  <div
    :style="isExpanded ? style : null"
    ref="control"
    v-show="!isScreenfull"
    class="vue-run-sfc-control"
    @click="$emit('expanded')"
  >
    <transition name="arrow-slide">
      <i class="vue-run-sfc-control-icon" :class="{ hovering: hovering }"></i>
    </transition>
    <transition name="text-slide">
      <span v-show="hovering">{{ controlText }}</span>
    </transition>
  </div>
</template>

<script>
const { throttle } = require('throttle-debounce')

export default {
  name: 'vue-run-sfc-control',
  props: {
    isScreenfull: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    hovering: {
      type: Boolean,
      default: false
    },
    isRow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      style: {}
    }
  },
  computed: {
    // 控制区的文本
    controlText () {
      return this.isExpanded ? '关闭编辑器' : '在线编辑代码'
    }
  },
  methods: {
    scrollHandler () {
      const controlHeight = 44
      const wrapper = this.$parent.$refs.wrapper
      if (this.isExpanded && wrapper) {
        const { top, bottom, left, width } = wrapper.getBoundingClientRect()

        const isAffix =
          bottom > document.documentElement.clientHeight &&
          top + controlHeight <= document.documentElement.clientHeight
        this.style = isAffix
          ? {
            left: `${left}px`,
            width: `${width}px`,
            bottom: '0px',
            position: 'fixed',
            border: '1px solid #eaeefb'
          }
          : {}
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollHandler()
      this.throttleScrollHandler = throttle(100, () => {
        this.scrollHandler()
      })
      window.addEventListener('scroll', this.throttleScrollHandler)
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.throttleScrollHandler)
  }
}
</script>

<style>
/* 控制器样式 */
.vue-run-sfc-control {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.vue-run-sfc-control:hover {
  color: #409eff;
  background-color: #f9fafc;
}

.vue-run-sfc-control-icon {
  width: 0;
  height: 0;
  border-top: 6px solid #d3dce6;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  position: relative;
  font-size: 0;
  bottom: -6px;
  display: inline-block;
}

.vue-run-sfc-control-icon.hovering {
  transform: translateX(-40px);
}
.vue-run-sfc-control:hover .vue-run-sfc-control-icon {
  border-top: 6px solid #409eff;
}
.vue-run-sfc-control > span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: 0.3s;
  display: inline-block;
}

.vue-run-sfc-control .text-slide-enter,
.vue-run-sfc-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
</style>
