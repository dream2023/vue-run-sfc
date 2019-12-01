<template>
  <!-- 底部控制区 -->
  <!-- 使用affix进行浮动控制 -->
  <affix
    v-if="!isScreenfull && isAffix"
    type="bottom"
    ref="affix"
    :delay="50"
    :enabled="isExpanded"
  >
    <!-- 参考 element-ui https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue -->
    <div class="vue-run-sfc-control" @click="$emit('expanded')">
      <transition name="arrow-slide">
        <i class="vue-run-sfc-control-icon" :class="{ hovering: hovering }"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </affix>
</template>

<script>
import Affix from 'easy-affix'
export default {
  name: 'vue-run-sfc-control',
  components: {
    Affix
  },
  props: {
    isScreenfull: Boolean,
    isExpanded: Boolean,
    hovering: Boolean,
    isRow: Boolean
  },
  data () {
    return {
      // 是否开启affix
      isAffix: true
    }
  },
  watch: {
    isRow () {
      if (this.isExpanded) {
        // 重新计算定位
        this.isAffix = false
        this.$nextTick(() => {
          this.isAffix = true
        })
      }
    }
  },
  computed: {
    // 控制区的文本
    controlText () {
      return this.isExpanded ? '关闭编辑器' : '在线编辑代码'
    }
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
  bottom: -9px;
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
