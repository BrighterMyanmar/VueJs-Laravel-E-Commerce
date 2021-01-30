<template>
  <Nav :logged="logged" />
  <div class="container">
  <router-view :logged="logged" @changeloginstatus="loginStatusChange" />
  </div>

</template>

<script>
import Nav from "./components/Nav";

export default {
  components: { Nav },
  data() {
    return {
      logged: false,
    };
  },
  methods: {
    loginStatusChange() {
      this.logged = !this.logged;
    },
  },
};
</script>

