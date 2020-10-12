<template>
  <Swiper>
    <SwiperItem v-for="item in banners" :key="item.id">
      <a :href="item.link"><img :src="item.image" alt="" @load="imageload"/></a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isload: false
    };
  },

  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageload() {
      // console.log("-----");
      if (!this.isload) {
        this.$emit("swiperImageLoad");
        this.isload = true;
      }
    }
  }
};
</script>

<style></style>
