<template>
  <Nav :logged="logged" :cartCount="cartCount" 
  @changeloginstatus="loginStatusChange" 
  />
  <div class="container">
  <router-view :logged="logged" 
  @changeloginstatus="loginStatusChange" 
  @changeProductCount="changeProductCount"
  />
  </div>

</template>

<script>
import Nav from "./components/Nav";

export default {
  components: { Nav },
  data() {
    return {
      logged: false,
      cartCount:0
    };
  },
  methods: {
    loginStatusChange(data) {
      this.logged = data;
    },
    changeProductCount(){
      let data = localStorage.getItem('products');
      let ary = data ? JSON.parse(data) : [];
      this.cartCount = ary.length;
    }
  },
  beforeMount(){
    let token = localStorage.getItem('token');
    if(token){
      this.logged = true;
    }
    this.changeProductCount();
  }
};
</script>

