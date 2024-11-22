<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Return to Dashboard Button -->
    <div class="mb-6 flex items-center justify-between">
      <button @click="returnToDashboard"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Dashboard
      </button>
    </div>

    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Staff Management</h2>

    <!-- Search Bar -->
    <div class="mb-6 flex items-center">
      <input v-model="searchQuery" type="text" placeholder="Search by staff name..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <button @click="clearSearch"
        class="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Clear
      </button>
      <button @click="showCreateModal = true"
        class="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Add New Staff
      </button>
    </div>

    <!-- Table -->
    <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr class="border-b bg-gray-100">
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Staff ID</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in filteredStaffs" :key="staff._id" class="border-b">
          <td class="px-6 py-4 text-sm text-gray-700">{{ staff.MSNV }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ staff.hoTenNV }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ staff.chucVu }}</td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ staff.soDienThoai }}</td>
          <td class="px-6 py-4 text-sm">
            <button @click="editStaff(staff)"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none">
              Edit
            </button>
            <button @click="deleteStaff(staff._id)"
              class="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create Staff Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Add New Staff</h3>
        <form @submit.prevent="createStaff">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input v-model="newStaff.hoTenNV" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select v-model="newStaff.chucVu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="newStaff.diaChi" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="newStaff.soDienThoai" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="newStaff.password" type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showCreateModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Staff Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Edit Staff</h3>
        <form @submit.prevent="updateStaff">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input v-model="editStaffData.hoTenNV" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select v-model="editStaffData.chucVu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="editStaffData.diaChi" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="editStaffData.soDienThoai" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showEditModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import StaffService from "@/services/StaffService";

export default {
  data() {
    return {
      staffs: [],
      searchQuery: "",
      showCreateModal: false,
      showEditModal: false, 
      newStaff: {
        hoTenNV: "",
        chucVu: "Staff",
        diaChi: "",
        soDienThoai: "",
        password: "",
      },
      editStaffData: {
        hoTenNV: "",
        chucVu: "Staff",
        diaChi: "",
        soDienThoai: "",
      },
    };
  },
  computed: {
    filteredStaffs() {
      return this.staffs.filter(staff =>
        staff.hoTenNV.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchStaffs() {
      try {
        const response = await StaffService.findAll();
        this.staffs = response;
      } catch (error) {
        console.error("Error fetching staff:", error);
        this.staffs = [];
      }
    },

    editStaff(staff) {
      this.editStaffData = { ...staff };
      this.showEditModal = true;
    },

    async updateStaff() {
      try {
        await StaffService.updateAccount(this.editStaffData._id, this.editStaffData);
        this.fetchStaffs();
        this.showEditModal = false;
      } catch (error) {
        console.error("Error updating staff:", error);
      }
    },

    async createStaff() {
      try {
        await StaffService.createStaffAccount(this.newStaff);
        this.fetchStaffs();
        this.showCreateModal = false;
      } catch (error) {
        console.error("Error creating staff:", error);
      }
    },

    async deleteStaff(id) {
      try {
        await StaffService.delete(id);
        this.fetchStaffs();
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    },

    clearSearch() {
      this.searchQuery = "";
    },

    returnToDashboard() {
      this.$router.push("/dashboard"); // Adjust the route as needed
    },
    
  },
  mounted() {
    this.fetchStaffs();
  },
};
</script>

<style scoped>
/* Optional: Add styles for modal overlays */
</style>
