<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <!-- Main Container -->
    <div class="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
      <!-- Logo/Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-blue-500 h-16 w-16 rounded-full flex items-center justify-center">
          <span class="text-white text-2xl font-bold">LOGO</span>
        </div>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register">
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">ĐĂNG KÝ</h2>
        <div class="space-y-4">
          <!-- First Name and Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="hoLot" class="block text-sm font-medium text-gray-700">Họ lót:</label>
              <input type="text" id="hoLot" v-model="hoLot" placeholder="VD: Muhammad"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.hoLot" class="text-sm text-red-500">{{ errors.hoLot }}</p>
            </div>
            <div>
              <label for="ten" class="block text-sm font-medium text-gray-700">Tên:</label>
              <input type="text" id="ten" v-model="ten" placeholder="Ali"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.ten" class="text-sm text-red-500">{{ errors.ten }}</p>
            </div>
          </div>

          <!-- Birthday and Gender -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="ngaySinh" class="block text-sm font-medium text-gray-700">Ngày sinh:</label>
              <input type="date" id="ngaySinh" v-model="ngaySinh"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.ngaySinh" class="text-sm text-red-500">{{ errors.ngaySinh }}</p>
            </div>
            <div>
              <label for="phai" class="block text-sm font-medium text-gray-700">Phái:</label>
              <select id="phai" v-model="phai"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none">
                <option value="">Chọn phái của bạn</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
              <p v-if="errors.phai" class="text-sm text-red-500">{{ errors.phai }}</p>
            </div>
          </div>

          <!-- Address and Phone -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="diaChi" class="block text-sm font-medium text-gray-700">Địa chỉ:</label>
              <input type="text" id="diaChi" v-model="diaChi"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.diaChi" class="text-sm text-red-500">{{ errors.diaChi }}</p>
            </div>
            <div>
              <label for="dienThoai" class="block text-sm font-medium text-gray-700">Số điện thoại:</label>
              <input type="text" id="dienThoai" v-model="dienThoai" maxlength="10"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.dienThoai" class="text-sm text-red-500">{{ errors.dienThoai }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Nhập vào email của bạn"
              class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
            <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <!-- Password and Confirm Password -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu:</label>
              <input type="password" id="password" v-model="password" placeholder="Nhập mật khẩu"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
            </div>
            <div>
              <label for="password-confirmation" class="block text-sm font-medium text-gray-700">Nhập lại mật
                khẩu:</label>
              <input type="password" id="password-confirmation" v-model="passwordconfirm"
                placeholder="Nhập lại mật khẩu"
                class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none" />
              <p v-if="errors.passwordconfirm" class="text-sm text-red-500">{{ errors.passwordconfirm }}</p>
            </div>
          </div>

          <!-- Register Button -->
          <div>
            <button type="submit"
              class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Đăng ký
            </button>
          </div>
        </div>

        <!-- Login Link -->
        <p class="mt-6 text-sm text-gray-600 text-center">
          Bạn đã có tài khoản?
          <RouterLink to="/login" class="text-blue-500 hover:underline">
            Đăng nhập tại đây
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UserService";

export default {
  name: "Register",
  data() {
    return {
      hoLot: "",
      ten: "",
      ngaySinh: "",
      phai: "",
      email: "",
      password: "",
      passwordconfirm: "",
      diaChi: "",
      dienThoai: "",
      errors: {},
      isFormValid: true,
    };
  },
  methods: {
    async register() {
      // Reset errors and validation flag
      this.errors = {};
      this.isFormValid = true;

      // Perform validations
      this.validateFirstName();
      this.validateLastName();
      this.validateBirthday();
      this.validateGender();
      this.validateAddress();
      this.validatePhone();
      this.validateEmail();
      await this.checkAccount(); // Wait for email check validation
      this.validatePassword();
      this.validateRePassword();

      if (this.isFormValid) {
        // Prepare user data
        const newUser = {
          hoLot: this.hoLot,
          ten: this.ten,
          ngaySinh: this.ngaySinh,
          phai: this.phai,
          diaChi: this.diaChi,
          dienThoai: this.dienThoai,
          email: this.email,
          password: this.password,
        };

        try {
          // Call UserService to create user
          await UsersService.createAccount(newUser);
          alert("Đăng ký tài khoản thành công.");
          this.$router.push("/login");
        } catch (error) {
          console.error("Error during registration:", error);
          alert("Đăng ký tài khoản thất bại!");
        }
      }
    },
    validateFirstName() {
      if (!this.hoLot.trim()) {
        this.errors.hoLot = "Vui lòng nhập họ lót";
        this.isFormValid = false;
      }
    },
    validateLastName() {
      if (!this.ten.trim()) {
        this.errors.ten = "Vui lòng nhập tên";
        this.isFormValid = false;
      }
    },
    validateBirthday() {
      const today = new Date();
      const selectedDate = new Date(this.ngaySinh);

      if (!this.ngaySinh) {
        this.errors.ngaySinh = "Vui lòng chọn ngày sinh";
        this.isFormValid = false;
      } else if (selectedDate >= today) {
        this.errors.ngaySinh = "Vui lòng chọn ngày sinh hợp lệ";
        this.isFormValid = false;
      }
    },
    validateGender() {
      if (!this.phai) {
        this.errors.phai = "Vui lòng chọn phái";
        this.isFormValid = false;
      }
    },
    validateEmail() {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!this.email || this.email.trim() === "") {
        this.errors.email = "Vui lòng nhập email";
        this.check = false;
        return false;
      }

      if (!this.email.match(validRegex)) {
        this.errors.email = "Vui lòng nhập đúng định dạng email";
        this.check = false;
        return false;
      }

      // Clear errors if the email is valid
      this.errors.email = null;
      return true;
    },
    checkAccount() {
      if (!this.validateEmail()) {
        // If validation fails, exit early
        return;
      }

      UsersService.check(this.email)
        .then((data) => {
          if (data && data.length !== 0) {
            this.errors.email = "Email đã được sử dụng!";
            this.check = false;
          } else {
            this.errors.email = null;
            this.check = true;
          }
        })
        .catch((err) => {
          console.error("Error during email check:", err);
          this.errors.email = "Có lỗi xảy ra khi kiểm tra email!";
          this.check = false;
        });
    },
    validatePhone() {
      const phoneRegex = /^0\d{9}$/; // Matches Vietnamese phone numbers
      if (!this.dienThoai.trim()) {
        this.errors.dienThoai = "Vui lòng nhập số điện thoại";
        this.isFormValid = false;
      } else if (!phoneRegex.test(this.dienThoai)) {
        this.errors.dienThoai = "Vui lòng nhập số điện thoại đúng định dạng";
        this.isFormValid = false;
      }
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.errors.password = "Vui lòng nhập mật khẩu lớn hơn 6 ký tự";
        this.isFormValid = false;
      }
    },
    validateRePassword() {
      if (this.passwordconfirm !== this.password) {
        this.errors.passwordconfirm = "Mật khẩu nhập lại không khớp";
        this.isFormValid = false;
      }
    },
    validateAddress() {
      if (!this.diaChi.trim()) {
        this.errors.diaChi = "Vui lòng nhập địa chỉ";
        this.isFormValid = false;
      }
    },
  },
};
</script>
