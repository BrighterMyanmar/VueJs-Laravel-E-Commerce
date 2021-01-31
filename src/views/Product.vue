<template>
  <div class="row my-5">
    <div class="col-md-3" v-for="product in products" :key="product.id">
      <div class="card">
        <img
          :src="assetUrl + product.images.split(',')[0]"
          class="card-img-top"
          alt=""
          style="max-height: 150px"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <button href="#" class="btn btn-primary" @click="addToCart(product)">
            <i class="material-icons">shopping_cart</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  mixins: [mixins],
  data() {
    return {
      name: null,
      id: null,
      products: [],
      assetUrl: this.$assetUrl,
    };
  },
  methods: {
    async loadProducts() {
      let url = this.$baseUrl + this.name + "/" + this.id;
      let response = await this.loadData(url);
      this.products = response.data;
      console.log(this.products);
    },
    addToCart(product) {
      let pds = localStorage.getItem("products");
      let pdsAry = pds ? JSON.parse(pds) : [];
      for (let pd of pdsAry) {
        if (pd.id == product.id) {
          alert("Item already exist!");
          return;
        }
      }
      product.count = 1;
      pdsAry.push(product);
      localStorage.setItem("products", JSON.stringify(pdsAry));
      this.$emit("changeProductCount");
    },
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    this.loadProducts();
  },
};
</script>