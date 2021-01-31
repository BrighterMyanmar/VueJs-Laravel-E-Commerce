<template>
    <div class="container-fluid bg-dark">
        <nav class="container navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <router-link class="navbar-brand text-white" to="/">
        <span>BM-Commerce</span>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active text-white" to="/orders">My Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/cart">
            <i class="material-icons">shopping_cart</i>
            <span class="cartItems">{{("0"+cartCount).slice(-2)}}</span>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-if="logged"><button class="dropdown-item" @click="logoutUser">Logout</button></li>
            <li v-if="!logged"><router-link class="dropdown-item" to="/login">Login</router-link></li>
            <li v-if="!logged"><router-link class="dropdown-item" to="/register">Register</router-link></li>
          </ul>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
</template>

<script>
export default {
    props:['logged','cartCount'],
    methods:{
      logoutUser(){
        localStorage.removeItem('token');
        this.$emit("changeloginstatus",false);
      }
    }
}
</script>

<style scoped>
  .cartItems{
    font-size: 12px;
    background:red;
    padding:5px;
    border-radius: 50%;
    position:relative;
    top:-12px;
    left:-5px;

  }
</style>