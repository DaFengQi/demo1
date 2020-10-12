<template>
  <div id="detail">
    <DetailNavBar class="detailnav" @titleClick="titleClick"></DetailNavBar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></DetailGoodsInfo>
      <DetailParamsInfo ref="params" :paramInfo="paramInfo"> </DetailParamsInfo>
      <DetailCommentInfo
        ref="comment"
        :commentInfo="commentInfo"
      ></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currenIndex: 0
      // message: "",
      // show: false
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,

    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // Toast
  },
  created() {
    //一.保存传入的iid
    this.iid = this.$route.params.iid;

    //二.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      //1.获取数据
      const data = res.result;

      // 2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);

      //4.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //5.保存商品的详细数据
      this.detailInfo = data.detailInfo;

      //6.获取参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      //7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {
        //根据最新的数据，对应的DOM是已经被渲染出来，但是图片依然是没有加载完的
        // //目前获取的offsetTop是不包含图片的
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    });
    //三.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    //四.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    imgLoad() {
      // console.log("-----");
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(-this.themeTopYs[index]);
      this.$refs.scroll.gotoScroll(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      //①.获取y值
      const positionY = -position.y;
      //②.positionY和主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        // if (
        // positionY > this.themeTopYs[parseInt(i)] &&
        // positionY < this.themeTopYs[i + 1]
        // ) {
        //   console.log(i);
        // }
        if (
          this.currenIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currenIndex = i;
          console.log(this.currenIndex);
        }
      }

      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      //1.获取购物车展示的信息

      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里      //3.添加到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        this.$toast.show(res, 1500);
      });

      // console.log("添加成功");
    }
  },
  mounted() {}
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: calc(100vh - 44px - 49px);
}
.detailnav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
