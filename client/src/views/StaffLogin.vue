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
            <!-- MSNV Input -->
            <div>
              <label for="MSNV" class="block text-sm font-medium text-gray-700">Mã số nhân viên (MSNV):</label>
              <input type="text" id="MSNV" v-model="MSNV" placeholder="Nhập vào Mã số nhân viên của bạn" required
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

        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "StaffLogin",
    data() {
      return {
        MSNV: "", // Staff ID input (MSNV)
        password: "",
        errorMessage: null,
      };
    },
    methods: {
      ...mapActions(["loginStaff"]), // Use loginStaff action
  
      async checkForm() {
        const staff_credentials = {
          MSNV: this.MSNV,
          password: this.password,
        };
  
        try {
          const isStaffLoggedIn = await this.loginStaff(staff_credentials); // Dispatch Vuex action
  
          if (isStaffLoggedIn) {
            this.$router.push("/dashboard"); // Redirect if login is successful
          } else {
            this.errorMessage = "Mã số nhân viên hoặc mật khẩu không đúng."; // Error message in Vietnamese
          }
        } catch (error) {
          this.errorMessage = "Đăng nhập thất bại!"; // Error message in Vietnamese
          console.error(error);
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.MSNV = "";
        vm.password = "";
        vm.errorMessage = null;
      });
    },
  };
  </script>
  
  <style scoped>
  /* TailwindCSS handles the styling, no need for custom CSS here. */
  </style>
  