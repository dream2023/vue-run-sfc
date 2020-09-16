<template>
  <!-- 头部 -->
  <div
    class="vue-run-sfc-header"
    :class="{ 'vue-run-sfc-header-screenfull': isScreenfull }"
  >
    <!-- 标题 -->
    <div class="vue-run-sfc-header-title">{{ title }}</div>
    <!-- 操作区 -->
    <div class="vue-run-sfc-header-action" v-if="isExpanded">
      <button class="vue-run-sfc-header-button" @click="$emit('reset')">
        重置
      </button>
      <button class="vue-run-sfc-header-button" @click="$emit('change-row')">
        <span v-if="isRow">上下</span><span v-else>左右</span>布局
      </button>
      <button
        class="vue-run-sfc-header-button"
        v-if="canScreenfull"
        @click="$emit('screenfull')"
      >
        <template v-if="isScreenfull">退出全屏</template>
        <template v-else>全屏</template>
      </button>
    </div>
  </div>
</template>

<script>
const screenfull = require("screenfull");

export default {
  name: "vue-run-sfc-header",
  props: {
    title: String,
    isExpanded: Boolean,
    isRow: Boolean,
    isScreenfull: Boolean
  },
  data() {
    return {
      // 当前浏览器是否支持全屏
      canScreenfull: screenfull.isEnabled
    };
  }
};
</script>

<style>
.vue-run-sfc-header {
  padding: 10px;
  z-index: 1;
  border: 1px solid var(--vue-run-sfc-border, #ebeef5);
  display: flex;
  height: 36px;
  box-sizing: content-box;
  align-items: center;
  justify-content: space-between;
}
.vue-run-sfc-header-screenfull {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
  background: white;
}
.vue-run-sfc-header-title {
  font-size: 16px;
  font-weight: 500;
  padding-left: 8px;
}

/***
 * 按钮
 * 复制 element-ui el-button 按钮样式
*/
.vue-run-sfc-header-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 10px;
}

.vue-run-sfc-header-button:focus,
.vue-run-sfc-header-button:hover {
  color: var(--vue-run-sfc-main, #409eff);
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
