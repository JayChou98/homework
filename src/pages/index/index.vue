<template>
  <div class="wrap">
    <div class="category">
        <img v-for="(item,index) in category" :src="item.image" :key="index" alt="">
    </div>
    <div class="books">
      <div v-for="(item,index) in list" :key="index" class="item" @click="toDetail(item.id)">
        <img :src="item.image" alt="">
        <p>{{item.name}}</p>
        <p><span class="one">当当自营</span><span class="two">满减</span></p>
        <p class="price">￥{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
      return {
          category:null,
          list:null
      }
  },
  onLoad(){
    wx.request({
      url:'http://127.0.0.1:8080/type.json',
      success:res=>{
        this.category=res.data
      },
      fail:res=>{
        console.log(res)
      }
    });
    wx.request({
      url:'http://127.0.0.1:8080/book.json',
      success:res=>{
        this.list=res.data
      },
      fail(res){
        console.log(res)
      }
    })
  },
  methods:{
      toDetail(id){
        wx.navigateTo({
          url:'/pages/detail/main?id='+id
        })
      }
  },
  computed:{

  }
}
</script>

<style lang="less">
  @import "./index.less";
</style>
