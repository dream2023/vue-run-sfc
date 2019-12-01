<template>
  <component
    :is="isRow && isExpanded ? 'splitpanes' : 'div'"
    :class="{
      'default-theme': isRow,
      'vue-run-sfc-main-reverse': isExpanded && !isRow && reverse
    }"
    class="vue-run-sfc-main"
  >
    <template v-if="isRow && isExpanded">
      <pane style="overflow-y: auto">
        <slot name="editor"></slot>
      </pane>
      <pane style="overflow-y: auto">
        <slot name="preview"></slot>
      </pane>
    </template>
    <template v-else>
      <slot v-if="isExpanded" name="editor"></slot>
      <slot name="preview"></slot>
    </template>
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
