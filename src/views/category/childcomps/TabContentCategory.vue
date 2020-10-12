<template>
  <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" @load="imgLoad" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsList from "components/content/goods/GoodsList";

export default {
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isOK: false
    };
  },
  methods: {
    imgLoad() {
      // console.log("-----");
      if (!this.isOK) {
        this.$emit("categoryImgload");
        this.isOK = true;
      }
    }
  }
};
</script>

<style scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
  /* background-color: red; */
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
