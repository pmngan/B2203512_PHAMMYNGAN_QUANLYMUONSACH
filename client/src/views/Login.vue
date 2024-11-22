<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <!-- Main Container -->
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <!-- Logo/Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-blue-500 h-16 w-16 rounded-full flex items-center justify-center">
          <span class="text-white text-2xl font-bold">LOGO</span>
        </div>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="checkForm">
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">ĐĂNG NHẬP</h2>
        <div class="space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Nhập vào email của bạn" required
              class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu:</label>
            <input type="password" id="password" v-model="password" placeholder="Nhập vào mật khẩu của bạn" required
              class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
          </div>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

          <!-- Login Button -->
          <div>
            <button type="submit"
              class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Đăng nhập
            </button>
          </div>
        </div>

        <!-- Register Link -->
        <p class="mt-6 text-sm text-gray-600 text-center">
          Bạn chưa có tài khoản?
          <RouterLink to="/register" class="text-blue-500 hover:underline">Đăng ký tại đây</RouterLink>
        </p>
      </form>

      <!-- Staff Login Link -->
      <p class="mt-6 text-sm text-gray-600 text-center">
        Bạn là nhân viên?
        <RouterLink to="/login/staff" class="text-blue-500 hover:underline">Đăng nhập tại đây</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "", // User email input
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions(["loginUser"]), // Use loginUser action

    async checkForm() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        const isLoggedIn = await this.loginUser(credentials); // Dispatch Vuex action

        if (isLoggedIn) {
          this.$router.push("/"); // Redirect if login is successful
        } else {
          this.errorMessage = "Invalid email or password."; // Error message for user login
        }
      } catch (error) {
        this.errorMessage = "Login failed!"; // Error message in case of failure
        console.error(error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.email = "";
      vm.password = "";
      vm.errorMessage = null;
    });
  },
};
</script>

<style scoped>
/* TailwindCSS handles the styling, no need for custom CSS here. */
</style>
