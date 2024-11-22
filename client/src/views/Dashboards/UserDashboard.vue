<template>
    <div class="w-full p-6 flex flex-col items-center justify-center">
        <div class="mb-6 flex items-center justify-between">
      <button @click="returnToDashboard"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Dashboard
      </button>
    </div>
      <!-- Tab Navigation -->
      <div class="flex space-x-4 mb-4">
        <button @click="currentTab = 'manage'"
          :class="{ 'bg-blue-600 text-white': currentTab === 'manage', 'text-gray-600': currentTab !== 'manage' }"
          class="py-2 px-4 rounded-md hover:bg-blue-700">
          Manage Users
        </button>
      </div>
  
      <!-- Manage Users Section -->
      <div v-if="currentTab === 'manage'" class="card bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Manage Users</h2>
  
        <!-- Search Bar -->
        <div class="mb-4">
          <input v-model="searchQuery" @input="searchUser" type="text"
            class="w-full border-gray-300 rounded-md p-2" placeholder="Search user by name or ID..." />
        </div>
  
        <!-- No users message -->
        <div v-if="filteredUsers.length === 0" class="text-gray-600">
          <p>No users found. Please add one.</p>
        </div>
  
        <!-- Display users if they exist -->
        <div v-else>
          <ul>
            <li v-for="user in filteredUsers" :key="user._id"
              class="mb-4 p-4 border-b border-gray-300 rounded-md">
              <p><strong>Name:</strong> {{ user.hoLot }} {{ user.ten }}</p>
              <p><strong>User ID:</strong> {{ user.maDocGia }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.dienThoai }}</p>
              <p><strong>Birth Date:</strong> {{ formatDateForDisplay(user.ngaySinh) }}</p>
              <button @click="editUser(user._id)" class="text-blue-600 hover:text-blue-800 mr-2">
                Edit
              </button>
              <button @click="deleteUser(user._id)" class="text-red-600 hover:text-red-800 mr-2">
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Edit User Section -->
      <div v-if="currentTab === 'edit'" class="card bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Edit User</h2>
  
        <!-- Success Message -->
        <div v-if="userUpdated" class="bg-green-100 text-green-800 p-4 mb-4 rounded-md">
          <p>User updated successfully!</p>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Họ lót</label>
            <input v-model="newUser.hoLot" type="text" class="w-full border-gray-300 rounded-md p-2"
              placeholder="Enter last name" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Tên</label>
            <input v-model="newUser.ten" type="text" class="w-full border-gray-300 rounded-md p-2"
              placeholder="Enter first name" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Email</label>
            <input v-model="newUser.email" type="email" class="w-full border-gray-300 rounded-md p-2"
              placeholder="Enter email" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Phone Number</label>
            <input v-model="newUser.dienThoai" type="text" class="w-full border-gray-300 rounded-md p-2"
              placeholder="Enter phone number" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Gender</label>
            <select v-model="newUser.phai" class="w-full border-gray-300 rounded-md p-2">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Address</label>
            <input v-model="newUser.diaChi" type="text" class="w-full border-gray-300 rounded-md p-2"
              placeholder="Enter address" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-600 mb-2">Birth Date</label>
            <input v-model="formattedBirthDate" type="date" class="w-full border-gray-300 rounded-md p-2" />
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Update
          </button>
          <button @click="cancelEdit" type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </template>
  

<script>
import UserService from "@/services/UserService";

export default {
    data() {
        return {
            currentTab: "manage",
            users: [],
            filteredUsers: [],
            searchQuery: "",
            isEditing: false,
            newUser: {
                hoLot: "",
                ten: "",
                email: "",
                dienThoai: "",
                phai: "",
                diaChi: "",
                ngaySinh: "",
            },
            userUpdated: false,
        };
    },
    computed: {
        formattedBirthDate: {
            get() {
                if (!this.newUser.ngaySinh) return '';
                return this.formatDateForInput(this.newUser.ngaySinh);
            },
            set(value) {
                this.newUser.ngaySinh = value ? new Date(value).toISOString() : '';
            }
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        formatDateForInput(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toISOString().split('T')[0];
        },
        formatDateForDisplay(dateString) {
            if (!dateString) return 'Not set';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        async fetchUsers() {
            try {
                const response = await UserService.findAll();
                console.log("Raw response:", response);

                if (Array.isArray(response)) {
                    this.users = response;
                    this.filteredUsers = [...this.users];
                } else if (response && Array.isArray(response.data)) {
                    this.users = response.data;
                    this.filteredUsers = [...this.users];
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                this.users = [];
                this.filteredUsers = [];
            }
        },
        async editUser(id) {
            try {
                const response = await UserService.findOne(id);
                const userData = response.data || response;
                this.newUser = { ...userData };

                // Format the date when loading for edit
                if (this.newUser.ngaySinh) {
                    const date = new Date(this.newUser.ngaySinh);
                    this.newUser.ngaySinh = date.toISOString();
                }

                this.currentTab = "edit";
            } catch (error) {
                console.error("Error fetching user for editing:", error);
            }
        },
        async updateUser() {
            try {
                // Ensure the date is in ISO format
                if (this.newUser.ngaySinh) {
                    const date = new Date(this.newUser.ngaySinh);
                    if (!isNaN(date.getTime())) {
                        this.newUser.ngaySinh = date.toISOString();
                    }
                }

                await UserService.updateAccount(this.newUser._id, this.newUser);
                this.userUpdated = true;

                setTimeout(() => {
                    this.userUpdated = false;
                }, 3000);

                this.currentTab = "manage";
                await this.fetchUsers();
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
        async deleteUser(id) {
            try {
                await UserService.delete(id);
                await this.fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        searchUser() {
            if (!this.searchQuery.trim()) {
                this.filteredUsers = [...this.users];
            } else {
                const query = this.searchQuery.toLowerCase().trim();
                this.filteredUsers = this.users.filter(user =>
                    `${user.hoLot} ${user.ten}`.toLowerCase().includes(query) ||
                    user.maDocGia.toLowerCase().includes(query)
                );
            }
        },
        cancelEdit() {
            this.currentTab = "manage";
            this.newUser = {
                hoLot: "",
                ten: "",
                email: "",
                dienThoai: "",
                phai: "",
                diaChi: "",
                ngaySinh: "",
            };
        },
        returnToDashboard() {
      this.$router.push("/dashboard"); // Adjust the route as needed
    },
    },
};
</script>

<style scoped>
.card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>