<template>
  <div class="row mt-5">
    <div class="col-md-3">
      <ul class="list-group">
        <li
          class="list-group-item rounded-0"
          v-for="cat in subcats"
          :key="cat.id"
        >
          {{ cat.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-9">
      <div
        id="carouselExampleSlidesOnly"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item" 
          v-for="(cat,index) in cats" :key="cat.id"
          :class="{active : index === 0}"
          >
            <img :src="assetUrl+cat.image" class="d-block w-100" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
export default {
  mixins: [mixins],
  props: ["cats", "subcats"],
  data(){
    return {
      assetUrl : this.$assetUrl
    }
  }
};
</script>

<style>
</style>