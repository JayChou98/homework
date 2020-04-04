<template>
  <div class="detail">
    <img :src="detail.image" alt="">
    <p><span class="btn">当当自营</span> {{detail.name}}</p>
    <p class="description">{{detail.desc}}</p>
    <p><span class="now_price">￥{{price}}</span> <span class="discount">({{discout}}折)</span> <span class="reduce_price">降价通知</span> </p>
    <p><span class="old_price">定价￥{{detail.old_price}}</span></p>
    <div class="bottom">
      <div class="shopping">立即购买</div>
      <div class="add_cart" @click="toCart(detail.id)">加入购物车</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
      return {
          detail:null,
          price:null,
          discout:null
      }
  },
  onLoad(options){
    wx.request({
      url:'http://127.0.0.1:8080/book.json',
      success:res=>{
       let detail= res.data.filter((item)=>{
          return item.id==options.id
        })
        this.detail = detail[0];
        this.discout = ((detail[0].price/detail[0].old_price)*10).toFixed(1);
        this.price = detail[0].price.toFixed(2)
      }
    })
  },
  methods:{
    toCart(id){
        // 检查缓存中是否有
        let storage=wx.getStorageSync('cart') || [];
        let ind=-1;
        storage.map((item,index)=>{
          if(item.id==id){
            ind=index
          }
        })
        if(ind===-1){
          this.detail.count = 1;
            storage.push(this.detail)
        }else{
            storage[ind].count+=1;
        }
        wx.setStorageSync('cart',storage);
        wx.showToast({
          title:'添加成功'
        })
    }

  },
  computed:{

  }
}
</script>

<style lang="less">
  @import "./detail.less";
</style>
