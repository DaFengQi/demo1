<template>
  <div id="home" class="wrapper">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <tabControl
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol1"
      class="tab-control"
      v-show="isTabFixed"
    ></tabControl>

    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <tabControl
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabcontrol2"
      ></tabControl>
      <!-- <GoodsList :goods="goods[currrentType].list"></GoodsList> -->
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currrentType: "pop", //默认定义为pop界面
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
      // itemImgListen: null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currrentType].list;
    }
  },

  activated() {
    // console.log("activated");
    this.$refs.scroll.refresh();
    this.$refs.scroll.getScrollY(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    /*以下为事件监听相关方法 */
    tabClick(index) {
      // console.log(index);
      //switch判断传入的值
      switch (index) {
        case 0:
          this.currrentType = "pop";
          break;
        case 1:
          this.currrentType = "new";
          break;
        case 2:
          this.currrentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentindex = index;
      this.$refs.tabcontrol2.currentindex = index;
    },

    backClick() {
      // console.log(this.$refs.scroll.message); //能拿到scroll中的message数据为啥下面的没用,答：因为
      this.$refs.scroll.gotoScroll(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position);
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabcontrol是否吸顶
      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },

    //加载更多
    loadMore() {
      this.getHomeGoods(this.currrentType);
    },

    //吸顶效果
    swiperImageLoad() {
      //赋值，获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      console.log(this.$refs.tabcontrol2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },

    /*以下为网络请求相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: calc(100vh - 44px - 49px); /*vh=>视口高度（viewport height）*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  /* 使用浏览器原生滚动时固定导航 ，但是现用了better-scroll局部滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 9;
}
.tab-control {
  /* position: sticky; 兼容性不高 不用了*/
  position: relative;
  z-index: 9;
}
.content {
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */

  height: 100%;
  overflow: hidden;
}
</style>
