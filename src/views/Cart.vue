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
    <tbody>
      <tr>
        <td colspan="5">
          <span class="float-end">Grand Total</span>
        </td>
        <td colspan="2">{{ grandTotal }}</td>
      </tr>
      <tr>
        <td colspan="5">
          <span class="float-end">Bill Out</span>
        </td>
        <td colspan="2">
          <button class="btn btn-success btn-sm" @click="checkOut">
            <i class="material-icons">attach_money</i>
            <span>Check Out</span>
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
      grandTotal : 0
    };
  },
  methods: {
    loadAllProduct() {
      let data = localStorage.getItem("products");
      this.products = data ? JSON.parse(data) : [];
      this.grandTotal = 0;
      this.products.forEach((product)=>{
          this.grandTotal += product.count * product.price;
      })
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
    async checkOut(){
        let token = localStorage.getItem('token');
        if(token){
            let data = localStorage.getItem("products");
            let pds = JSON.parse(data);
            if(pds.length > 0){
                let proAry = [];
                pds.forEach((product)=>{
                    proAry.push({id:product.id,count:product.count});
                });
                let sendData = {orders:pds} ;  
                let response = await fetch(this.$baseUrl+"order", {
                    method: "post",
                    headers: { 
                        "content-type": "application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify(sendData),
                });
                let responseData =  await response.json();
                if(responseData.con){
                    localStorage.removeItem('products');
                    this.$emit("changeProductCount");
                    this.$router.push({name:'Home'});
                }else{
                    alert(responseData.msg);
                }
            };
           
        }else{
            this.$router.push({name:"Login"});
        }
    }
  },
  beforeMount() {
    this.loadAllProduct();
  },
};
</script>