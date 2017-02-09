<template>
  <section style="height:100%">
    <!--城市界面（一开始是隐藏的而已）-->
    <city></city>
    <!--顶部导航-->
    <header class="home-header border-bottom">
      <!--定位城市区域-->
      <div class="city fl" @click="showCityList">
        <span class="vm city-name f14">{{$store.state.city.name}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <!--放映区域-->
      <div class="sel-lists f14 fl pr" @click="moveTab">
        <div hot='sel' :class="{selNav:selNav}">正在热映</div>
        <div :class="{selNav:!selNav}">即将上映</div>
        <span class="move pa" :style="{left:moveDistance}"></span>
      </div>
    </header>
    <!--列表内容-->
    <section v-show="selNav" class="content">
      <swiper :imgs="imgs"></swiper>
      <hot :hotList="hotList"></hot>
    </section>
    <section v-show="!selNav" class="content">

    </section>

    <!--底部刷新-->
    <section>
      <coming :comingLists="comingLists"></coming>
      <div class="click-load-more" @click="clickLoadMore">
        <span v-show="clickLoadStatus === 'start'">点击查看更多</span>
        <div v-show="clickLoadStatus === 'loading'" class="loading-icon">
          <span>加载中</span>
          <mt-spinner style="display: inline-block" type="fading-circle" color="rgb(100, 100, 100)" :size="16"></mt-spinner>
        </div>
        <span v-show="clickLoadStatus=='compelete'">已经全部显示</span>
      </div>
    <div ></div>
    </section>
    <!--预告片预览区域-->
    <!--<play-video></play-video>-->
  </section>


</template>

<script>
import { mapMutations,mapActions } from 'vuex'
import swiper  from './swiper'
import hot  from './hot'
import city  from './city'
import coming  from './coming'
    export default{
    name:'Home',
    data(){
    return{
       selNav:true,
       moveDistance:'5%',
      clickLoadStatus: 'start',
      offset: 0,
      limit: 20,
      total: 0,
       imgs:[],
       comingLists:[],
       loaingLists:[],
            }
        },
        components:{
         swiper,
         hot,
         city,
         coming,
        },
        computed:{
       hotList(){
       return this.$store.state.city.data
       }
        },
        methods:{
      ...mapActions([
			'updateCityAsync'
		]),
        ...mapMutations([
      'pushComingList',
      'showCityList',

    ]),
        moveTab(event){
      event.target.getAttribute('hot')?this.selectHotTab():this.selectcomingTab()
        },
        selectHotTab(){
        this.selNav=true
        this.moveDistance='5%'
        this.pushComingList({lists:[]})
        },
        selectcomingTab(){
        this.selNav=false
        this.moveDistance='55%'
        this.pushComingList({lists:this.loadingList})
        },
          getWeekDay(num){
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return [num]
        },

      sortComingData (lists) {
      let comingLists = []
      lists.forEach((item) => {
        let hasItem = false
        for (let i = 0; i < comingLists.length; i++) {
          if (item.openTime === comingLists[i].openTime) {
            comingLists[i].movies.push(item)
            hasItem = true
            break
          }
        }
        if (!hasItem) {
          let comingItem = {
            openTime: '',
            day: '',
            movies: []
          }
          comingItem.openTime = item.openTime
          comingItem.day = this.getWeekDay(new Date(item.openTime).getDay())
          comingItem.movies.push(item)
          comingLists.push(comingItem)
        }
      })
      return comingLists
    },
    clickLoadMore(){
    if(this.clickLoadStatus !='compelete'){
    this.clickLoadStatus='loading'
    setTimeout(()=>[
     this.$http.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then((response) => {
      let lists=response.data.data.data.returnValue
        this.loaingLists = this.loaingLists.concat(lists)
        this.comingLists = this.sortComingData(this.loaingLists)
   this.offset=this.offset+this.limit
   if(this.offset<this.total){
   this.clickLoadStatus='start'
   }else{
   this.clickLoadStatus='compelete'
   }
     })
    ],500)
    }

    },
      requestData (url, fn) {

      this.$http.get(url).then(fn).then()
    },

        },
        created(){
    this.requestData('/movie/swiper', (response) => {
      this.imgs = response.data.data.data.returnValue
    }),
    this.requestData(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`, (response) => {
      let lists = response.data.data.data.returnValue
      //模拟索引数据的id号
      lists.forEach((item, index) => {
        item.mID = index
      })
      this.loaingLists = lists
      this.total = response.data.total
      this.comingLists = this.sortComingData(lists)
      this.offset = this.offset + this.limit
     })
        },



    }




</script>
<style>
.home-header {
  height: 40px;
  font-size: 0px;
  background-color: #fff;
}
.selnav {
  color: #ff4d64;
}
.city {
  width: 35%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  display: inline-block;
}
.city-arrow-icon {
  margin-left: 4px;
  width: 12px;
  height: 12px;
  display: inline-block;
}
.city-arrow-icon:after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  margin-left: 0;
  border: 1px solid #50505a;
  border-top: 0 none;
  border-left: 0 none;
  margin-left: 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.content {
  margin-bottom: 58px;
}
.sel-lists {
  width: 65%;
  display:-moz-box;
  display: -webkit-box;
  display: box;
}
.sel-lists div {
  -moz-box-flex: 1.0;
  -webkit-box-flex: 1.0;
  line-height: 40px;
  text-align: center;
}
.move {
  display: inline-block;
  bottom: 0px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.7s ease-in-out;
  transition: left 0.7s ease-in-out;
}
.click-load-more {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 15px;
  background-color: #fff;
  margin: 5px 0 8px;
  margin-bottom:100px;
}
.loading-icon span {
  vertical-align: middle;
}



</style>
