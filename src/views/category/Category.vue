<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"> </tab-menu>
      <tab-control
        :title="['综合', '新品', '销量']"
        class="fixedshow"
        @tabClick="tabClick"
        v-show="isfixedshow"
      ></tab-control>

      <scroll
        id="tab-content"
        :data="[categoryData]"
        ref="scroll"
        @scroll="tabScroll"
        :pull-up-load="true"
        :probe-type="3"
      >
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
            @categoryImgload="categoryImgload"
            ref="tabcontentcategory"
          ></tab-content-category>
          <tab-control
            :title="['综合', '新品', '销量']"
            @tabClick="tabClick"
            ref="tabscrollA"
          ></tab-control>
          <tab-content-detail
            :category-detail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childcomps/TabMenu";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childcomps/TabContentCategory";
import TabContentDetail from "./childcomps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import { POP, SELL, NEW } from "@/common/const";
import { tabControlMixin } from "@/common/mixin";
import { debounce } from "common/utils";

export default {
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      isfixedshow: false,
      categoryOffsetTop: 0
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
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
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据

        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来

        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabScroll(position) {
      console.log(position);
      this.isfixedshow = -position.y >= this.categoryOffsetTop;
    },
    categoryImgload() {
      // console.log(this.$refs.tabscrollA.$el.offsetTop);
      console.log(this.$refs.tabcontentcategory.$el.offsetHeight);
      this.categoryOffsetTop =
        this.$refs.tabcontentcategory.$el.offsetHeight / 4;
    }
  }
};
</script>

<style scoped>
#category {
  /* height: 100vh; */
  height: calc(100vh - 44px - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  /* z-index: 9; */
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  /* height: 100%; */
  display: flex;
}

#tab-content {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.fixedshow {
  position: fixed;
  top: 44px;
  left: 100px;
  z-index: 9;
  width: calc(100% - 100px);
}
</style>
