<template>
  <h1 class="text-center text-info my-5">Register Page</h1>
  <div class="col-md-6 offset-md-3">
    <form @submit.prevent="userRegister">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control rounded-0"
              id="name"
              name="name"
              required
              v-model="userCreditial.name"
              pattern="[a-zA-Z]{6,}"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control rounded-0"
              id="email"
              name="email"
              required
              v-model="userCreditial.email"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control rounded-0"
              id="password"
              name="password"
              v-model="userCreditial.password"
              required
              pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              oninvalid="this.setCustomValidity(`
          Password မှာ အနည်းဆုံး Number တစ်လုံး
          Special Character တစ်လုံး
          Small Latter တစ်လုံး
          Capital Latter တစ်လုံး
          အနည်းဆုံး ၈ လုံး ဖြစ်ရမယ်
          `)"
              oninput="this.setCustomValidity('')"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="password2" class="form-label"
              >Confirmation Password</label
            >
            <input
              type="password"
              class="form-control rounded-0"
              id="password2"
              name="password2"
              v-model="userCreditial.password2"
              required
              pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              oninvalid="this.setCustomValidity(`
          Password မှာ အနည်းဆုံး Number တစ်လုံး
          Special Character တစ်လုံး
          Small Latter တစ်လုံး
          Capital Latter တစ်လုံး
          အနည်းဆုံး ၈ လုံး ဖြစ်ရမယ်
          `)"
              oninput="this.setCustomValidity('')"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="tel"
              class="form-control rounded-0"
              id="phone"
              name="phone"
              required
              v-model="userCreditial.phone"
              pattern="[0-9]{7,11}"
            />
          </div>
        </div>
        <div class="col-md-6 mt-4">
          <button type="submit" class="btn btn-sm btn-primary float-end mt-3">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  mixins: [mixins],
  data() {
    return {
      userCreditial: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    async userRegister() {
      let responseData = await this.sendData(this.$baseUrl+"register",this.userCreditial);
      if(responseData.con){
          this.$router.push({name:'Login'})
      }else{
          alert(responseData.msg);
      }
    },
  },
};
</script>
