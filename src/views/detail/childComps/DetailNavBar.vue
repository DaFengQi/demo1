<template>
  <div>
    <NavBar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="titleitem"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.titleitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.left img {
  margin-top: 12px;
  width: 18px;
  height: 18px;
}
</style>
