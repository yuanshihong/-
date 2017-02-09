<template>
  <div class="app" :style="{height: '100%'}">
    <div class="main" :style="{height: '100%'}">
      <router-view></router-view>
    </div>
    <footer-nav :showNav="showNav"></footer-nav>
  </div>
</template>

<script>
import footerNav from './components/footerNav'
export default {
  name: 'app',
  data(){
  return {
  direction:'forward',
  showNav:true,
  }

  },
  components: {
    footerNav
  },
  watch:{
  '$route':function(){
  this.routeChange();
  }

  },
  methods:{
  routeChange(){
  let path =this.$route.path
 if(path==='/' || path==='/cinema' || path==='/me') {
 this.showNav=true;
 }else{
  this.showNav=false;
 }

  },
  },
  created(){
  this.routeChange();
  },

}
</script>

<style>


</style>

