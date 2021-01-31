<template>
  <h1 class="text-center text-info my-5">Your Cart</h1>
  <table class="table table-bordered">
    <thead>
      <tr class="bg-dark text-white">
        <th>No</th>
        <th>Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Count</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>
          <img
            :src="assetUrl + product.images.split(',')[0]"
            alt=""
            style="width: 50px; height: 50px"
          />
        </td>
        <td>{{ product.price }}</td>
        <td>
          <button
            class="btn btn-sm btn-warning"
            @click="
              changeProductCount(
                product.id,
                product.count > 1 ? product.count - 1 : 1
              )
            "
          >
            <i class="material-icons">remove</i>
          </button>
          {{ product.count }}
          <button
            class="btn btn-sm btn-success"
            @click="changeProductCount(product.id, product.count + 1)"
          >
            <i class="material-icons">add</i>
          </button>
        </td>
        <td>{{ product.count * product.price }}</td>
        <td>
          <button
            class="btn btn-sm btn-danger"
            @click="removeProduct(product.id)"
          >
            <i class="material-icons">delete</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      assetUrl: this.$assetUrl,
    };
  },
  methods: {
    loadAllProduct() {
      let data = localStorage.getItem("products");
      this.products = data ? JSON.parse(data) : [];
    },
    changeProductCount(id, count) {
      let data = localStorage.getItem("products");
      let pds = JSON.parse(data);
      pds.forEach((product) => {
        if (product.id == id) {
          product.count = count;
        }
      });
      localStorage.setItem("products", JSON.stringify(pds));
      this.loadAllProduct();
    },
    removeProduct(id) {
      
      let data = localStorage.getItem("products");
      let pds = JSON.parse(data);
      console.log("Before",pds.length);
      pds.forEach((product)=>{
          if(product.id == id){
              let ind = pds.indexOf(product);
              pds.splice(ind,1);
          }
      });
      localStorage.setItem("products", JSON.stringify(pds));
      this.loadAllProduct();
      this.$emit("changeProductCount");
    },
  },
  beforeMount() {
    this.loadAllProduct();
  },
};
</script>