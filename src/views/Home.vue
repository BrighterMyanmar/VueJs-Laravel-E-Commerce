<template>
  <Slider :cats="cats" :subcats="subcats" />

  <div v-for="tag in tags" :key="tag.id">
    <h2>{{ tag.name }}</h2>
    <div class="row">
      <div class="col-md-3" v-for="product in tag.products" :key="product.created">
        <div class="card">
          <img :src="assetUrl+product.images.split(',')[0]"
           class="card-img-top" 
           alt="{{product.images.split(',')[0]}}" 
           style="max-height:150px;"
           />
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.description}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import mixins from "../mixins/mixins";
import Slider from "../components/Slider";

export default {
  mixins: [mixins],
  components: { Slider },
  data() {
    return {
      cats: [],
      subcats: [],
      tags: [],
      assetUrl : this.$assetUrl
    };
  },
  async beforeMount() {
    this.cats = await this.loadData(this.$baseUrl + "cats");
    this.tags = await this.loadData(this.$baseUrl + "tags");
    this.subcats = await this.loadData(this.$baseUrl + "subcats");

    for (let tag of this.tags) {
      tag.products = await this.loadData(this.$baseUrl + "tag/" + tag.id);
    }
    console.log(this.tags);
  },
};
</script>