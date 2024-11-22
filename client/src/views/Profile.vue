<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <!-- Profile Container -->
      <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">User Profile</h1>
  
        <!-- Display Profile Details -->
        <div v-if="!isEditing">
          <div class="space-y-4">
            <p><strong>Full Name:</strong> {{ user.hoLot }} {{ user.ten }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Date of Birth:</strong> {{ formatDate(user.ngaySinh) }}</p>
            <p><strong>Gender:</strong> {{ user.phai }}</p>
            <p><strong>Address:</strong> {{ user.diaChi }}</p>
            <p><strong>Phone:</strong> {{ user.dienThoai }}</p>
          </div>
          <div class="mt-6 text-center">
            <button
              @click="startEditing"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
  
        <!-- Edit Profile Form -->
        <form v-else @submit.prevent="saveProfile" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">First Name:</label>
            <input
              v-model="editedProfile.hoLot"
              type="text"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Last Name:</label>
            <input
              v-model="editedProfile.ten"
              type="text"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Date of Birth:</label>
            <input
              v-model="editedProfile.ngaySinh"
              type="date"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Gender:</label>
            <select
              v-model="editedProfile.phai"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Address:</label>
            <input
              v-model="editedProfile.diaChi"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Phone:</label>
            <input
              v-model="editedProfile.dienThoai"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-between">
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              @click="cancelEditing"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "Profile",
    data() {
      return {
        isEditing: false,
        editedProfile: {},
      };
    },
    computed: {
      ...mapGetters(["user"]),
    },
    methods: {
      ...mapActions(["updateUserProfile", "logoutUser"]),
      formatDate(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
      },
      startEditing() {
        this.editedProfile = { ...this.user };
        this.isEditing = true;
      },
      cancelEditing() {
        this.isEditing = false;
      },
      async saveProfile() {
        try {
          const { email, maDocGia, ...updateData } = this.editedProfile; // Remove immutable fields
          const success = await this.updateUserProfile(updateData);
  
          if (success) {
            this.isEditing = false;
            alert("Profile updated. Please login again.");
            this.$router.push("/login");
          } else {
            alert("Failed to update profile");
          }
        } catch (error) {
          console.error("Profile update failed:", error);
          alert("Failed to update profile");
        }
      },
    },
    created() {
      if (!this.user) {
        this.$router.push("/login");
      }
    },
  };
  </script>
  