<template>
  <section id="cinema">
    <city></city>
    <cinemaArea></cinemaArea>
    <cinemaItem></cinemaItem>
  </section>
</template>
<style>

</style>
<script>
    import cinemaArea from './cinemaArea'
    import cinemaItem from './cinemaItem'
    import city  from '../home/city'

    export default{
    name:'Cinema',
        data(){
            return{
            }
        },
        components:{
         cinemaArea,
         cinemaItem,
         city
        }
    }
</script>
