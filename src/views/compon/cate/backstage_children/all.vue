<template>
  <div id="all">
    <banner :banner_list_name="back_list"></banner>
    <backstage-list></backstage-list>
  </div>
</template>
<script>
import backstageList from "@/views/compon/cate_compon/backstage_list.vue";
import banner from "@/views/compon/children_compon/banner.vue";
export default {
  components: {
    backstageList,
    banner
  },
  data() {
    return {
      back_list:'backstage'
    };
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
#all {
}
</style>