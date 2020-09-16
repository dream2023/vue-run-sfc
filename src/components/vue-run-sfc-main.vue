<template>
  <component
    :is="isRow && isExpanded ? 'multipane' : 'div'"
    :class="{
      'default-theme': isRow,
      'vue-run-sfc-main-reverse': isExpanded && !isRow && reverse
    }"
    :style="{ 'padding-top': isScreenfull ? '57px' : null }"
    class="vue-run-sfc-main"
  >
    <template v-if="isRow && isExpanded">
      <div class="vue-run-sfc-main-pane" style="overflow-y: auto;width: 50%;">
        <slot name="editor"></slot>
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="vue-run-sfc-main-pane" style="overflow-y: auto;flexGrow: 1">
        <slot name="preview"></slot>
      </div>
    </template>
    <template v-else>
      <slot v-if="isExpanded" name="editor"></slot>
      <slot name="preview"></slot>
    </template>
  </component>
</template>

<script>
import { Multipane, MultipaneResizer } from "vue-multipane";

export default {
  name: "vue-run-sfc-main",
  components: {
    Multipane,
    MultipaneResizer
  },
  props: {
    isRow: Boolean,
    isExpanded: Boolean,
    reverse: Boolean,
    isScreenfull: Boolean
  }
};
</script>

<style>
/* 主体 */
.vue-run-sfc-main {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid var(--vue-run-sfc-border, #ebeef5);
  border-top: none;
}

.vue-run-sfc-main-reverse {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.vue-run-sfc-main-reverse .vue-run-sfc-editor {
  border-top: 1px solid #eaeefb;
}

.vue-run-sfc-main-pane {
  text-align: left;
  overflow: hidden;
}
.vue-run-sfc-main > .multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
  border-left: 1px solid var(--vue-run-sfc-border, #ebeef5);
  border-right: 1px solid var(--vue-run-sfc-border, #ebeef5);
}
.vue-run-sfc-main > .multipane-resizer:before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -2.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.vue-run-sfc-main > .multipane-resizer:hover:before {
  border-color: #999;
}

.vue-run-sfc-main.layout-v > .multipane-resizer {
  height: auto;
}
</style>
