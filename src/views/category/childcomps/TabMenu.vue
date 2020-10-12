<template>
  <div id="tab-menu">
    <Scroll class="menu-list" ref="scroll">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //1.监听item中图片加载完成的时间监听

    this.$bus.$on("itemimageLoad", () => {
      // console.log("-------");
      refresh();
    });
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    },
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  }
};
</script>

<style scoped>
#tab-menu {
  height: calc(100vh - 44px - 49px);
  background-color: #f6f6f6;
  /* background-color: red; */
  /* height: 100%; */

  width: 100px;
  box-sizing: border-box;
}
.menu-list {
  height: 100%;
  overflow: hidden;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
