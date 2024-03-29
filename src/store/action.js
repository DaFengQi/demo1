import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload新添加的商品
      // let oldProduct = null;
      // for (let item of state.cartlist) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartlist.find(function(item) {
        return item.iid === payload.iid;
      });

      //2.判断oldProudct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("添加至购物车+1");
      } else {
        payload.count = 1;
        // context.cartlist.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("已添加至购物车");
      }
    });
  }
};
