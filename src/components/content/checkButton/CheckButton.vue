<template>
  <div class="checkbutton" :class="{ check: isChecked }" @click="selectItem">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
    }
  }
  // watch: {
  //   value: function(newValue) {
  //     this.checked = newValue;
  //   }
  // }
};
</script>

<style>
.checkbutton {
  border-radius: 50%;
  border: 2px solid #aaaaaa;
}
.check {
  border-color: #ff8198;
  background-color: #ff8198;
}
.checkbutton img {
  width: 12px;
  height: 12px;
}
</style>
