<template>
  <div class="bottom-menu">
    <CheckButton
      :is-checked="isSelectAll"
      class="select-all"
      @click.native="checkBtnClick"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ￥{{ totalPrice }}</span>
    <span class="buy-product" @click="calcClick"
      >提交订单({{ checkLength }})</span
    >
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    //购物车总价
    totalPrice() {
      return this.$store.state.cartlist
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartlist.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartlist.length === 0) return false;

      //1.使用filter
      // return !this.$store.state.cartlist.filter(item => !item.checked).length;

      //2.使用find
      return !this.$store.state.cartlist.find(item => !item.checked);

      // 3.普通遍历
      //   for (let item of this.cartlist) {
      //     if (!item.checked) {
      //       return false;
      //     }
      //   }
      //   return true;
    }
  },
  methods: {
    checkBtnClick() {
      // 1.判断是否有未选中的按钮
      console.log("测试点击");
      // 2.有未选中的内容,

      if (this.isSelectAll) {
        //全部选中
        this.$store.state.cartlist.forEach(item => (item.checked = false));
      } else {
        //部分或全部不选中
        this.$store.state.cartlist.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.checkLength) {
        this.$toast.show("请选择购买的商品", 1500);
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  color: #888;
  line-height: 40px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 14px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  float: right;
}
</style>
