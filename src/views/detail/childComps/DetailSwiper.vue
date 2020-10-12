<template>
  <Swiper class="detailswiper">
    <SwiperItem class="swiper-item" v-for="item in topImages" :key="item.id">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.detailswiper {
  height: 300px;
  overflow: hidden;
}
</style>
