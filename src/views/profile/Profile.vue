<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">某某商城</div></nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo></UserInfo>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <img src="~assets/img/myprofile/payment.png" />
        <div class="number">
          <span class="balance">0</span>
        </div>
        <div class="account-info">待付款</div>
      </div>
      <div class="account-item">
        <img src="~assets/img/myprofile/deliver.png" />
        <div class="number"><span class="balance">0</span></div>
        <div class="account-info">待发货</div>
      </div>
      <div class="account-item">
        <img src="~assets/img/myprofile/receiving.png" />
        <div class="number"><span class="balance">0</span></div>
        <div class="account-info">待收货</div>
      </div>
      <div class="account-item">
        <img src="~assets/img/myprofile/evaluate.png" />
        <div class="number"><span class="balance">0</span></div>
        <div class="account-info">评价</div>
      </div>
      <div class="account-item">
        <img src="~assets/img/myprofile/aftermarket.png" />
        <div class="number"><span class="balance">0</span></div>
        <div class="account-info">售后</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    UserInfo,
    ListView,
    NavBar
  },
  data: function() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" }
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" }
      ]
    };
  },
  mounted: function() {}
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  width: 100%;
}

.account {
  display: flex;
  width: 100%;
  /* height: 15%; */
}

.account-item {
  width: 25%;
  background-color: #fff;
  /* background-color: red; */
  margin-right: 1px;
  text-align: center;
  color: #666;
  padding: 13px;
}
.account-item img {
  width: 25px;
  height: 25px;
}
.account-item:last-of-type {
  margin-right: 0px;
}

.account-item .balance {
  width: 0.9375rem;
  height: 0.9375rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ff8080;
  position: relative;
  top: -32px;
  right: -10px;
  background-color: white;
  border-radius: 50%;
}

.account-info {
  margin-top: -8px;
  white-space: nowrap;
  /* background-color: blue; */
  font-size: 12px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>
