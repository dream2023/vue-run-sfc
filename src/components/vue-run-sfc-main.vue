<template>
  <component
    :is="isRow && isExpanded ? 'splitpanes' : 'div'"
    :class="{
      'default-theme': isRow,
      'vue-run-sfc-main-reverse': isExpanded && !isRow && reverse
    }"
    :style="{ 'padding-top': isScreenfull ? '56px' : null }"
    class="vue-run-sfc-main"
  >
    <component v-if="isExpanded" :is="isRow && isExpanded ? 'pane' : 'div'">
      <slot name="editor"></slot>
    </component>
    <component :is="isRow && isExpanded ? 'pane' : 'div'">
      <slot name="preview"></slot>
    </component>
  </component>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'vue-run-sfc-main',
  components: {
    Splitpanes,
    Pane
  },
  props: {
    isRow: Boolean,
    isExpanded: Boolean,
    reverse: Boolean,
    isScreenfull: Boolean
  }
}
</script>

<style>
/* 主体 */
.vue-run-sfc-main {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow-y: auto;
}

.vue-run-sfc-main-reverse {
  display: flex;
  flex-direction: column-reverse;
}

.vue-run-sfc-main-reverse .vue-run-sfc-editor {
  border-top: 1px solid #eaeefb;
}
/* 拖拽看板样式 */
.splitpanes.default-theme .splitpanes__pane {
  background: white;
}

.vue-run-sfc-main.splitpanes--vertical > .splitpanes__splitter {
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
</style>
