<template>
<div class="cart">
    <div v-for="(item,index) in cart" class="item" :key="index">
      <ul>
        <li style="width:80rpx;line-height: 240rpx"><input type="checkbox" @click="toCheck(index)" :checked="item.checked" ></li>
        <li style="width: 150rpx"><img :src="item.image" alt=""></li>
        <li style="width: 260rpx">
          <p class="name_p">{{item.name}}</p>
          <p><span class="cart_price">￥{{item.price}}</span> <span class="cart_old_price">￥{{item.old_price}}</span> </p>
        </li>
        <li style="width: 200rpx">
          <p class="button_p"><button>-</button> <span class="count_span">{{item.count}}</span> <button>+</button></p>
        </li>
      </ul>
      <p><span class="add_price_shop">加价购</span><span class="shop_one">购买一件即可享受换购优惠</span></p>
    </div>
  <div class="cart_bottom">
    <input type="checkbox" @click="toCheckAll" :checked="allChecked"> 全选 合计:￥{{total}} <button>结算({{num}})</button>
  </div>
</div>
</template>

<script>

export default {
  data () {
      return {
        cart:null,
        total:0,
        num:0
      }
  },
  onLoad(){
    // 当数组中元素是值类型，map不会改变原数组；当是引用类型，则可以改变原数组
    this.cart=wx.getStorageSync('cart');
    this.cart.map(item=>{
      item.checked=false;
    })
  },
  methods:{
    total(){
      let total=0;
      this.cart.forEach(item=>{
        if(item.checked){
          console.log(total)
          total+=item.count*item.price
        }
      });
      this.total=total;
    },
    num(){
      let num=0;
      this.cart.map(item=>{
        if(item.checked){
          num++;
        }
      });
      this.num = num;
    },
    toCheck(index){
      this.cart[index].checked=!this.cart[index].checked;
      this.total()
      this.num()
    },
    toCheckAll(){
      this.cart.map(item=>{
        item.checked=!item.checked;
      })
      this.total()
      this.num()
    },
  },
  computed:{
    allChecked:function () {
     let allChecked= this.cart.every(item=>{
        return item.checked===true
      })
      return allChecked;
    }
  }
}
</script>

<style lang="less">
 @import "./cart.less";
</style>
