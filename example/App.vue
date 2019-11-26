<template>
  <div style="height: 2000px">
    <vue-run-sfc title="测试DEMO" :code="code" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      code: `<template><div><p>{{ name }}</p></div></template>
<script>
export default {
  name: "test",
  data() {
    return {
      name: "zhangchaojie"
    };
  },
  methods: {},
  mounted() {}
};
<\/script>

      `
    }
  },
  methods: {},
  mounted () {}
}
</script>
