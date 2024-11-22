<template>
  <div class="w-full p-6 flex flex-col">
    <div class="mb-6 flex items-center justify-between">
      <button @click="returnToDashboard"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Dashboard
      </button>
    </div>
    <!-- Tab Navigation -->
    <div class="flex space-x-4 mb-4">
      <button @click="currentTab = 'create'" :class="{'bg-blue-600 text-white': currentTab === 'create', 'text-gray-600': currentTab !== 'create'}" class="py-2 px-4 rounded-md hover:bg-blue-700">
        Add New Publisher
      </button>
      <button @click="currentTab = 'manage'" :class="{'bg-blue-600 text-white': currentTab === 'manage', 'text-gray-600': currentTab !== 'manage'}" class="py-2 px-4 rounded-md hover:bg-blue-700">
        Manage Publishers
      </button>
    </div>

    <!-- Add Publisher Section -->
    <div v-if="currentTab === 'create'" class="card bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-700 mb-4">{{ isEditing ? 'Edit Publisher' : 'Add New Publisher' }}</h2>

      <!-- Success Message -->
      <div v-if="publisherAdded" class="bg-green-100 text-green-800 p-4 mb-4 rounded-md">
        <p>Publisher {{ isEditing ? 'updated' : 'added' }} successfully!</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="isEditing ? updatePublisher() : createPublisher()">
        <div class="mb-4">
          <label class="block font-medium text-gray-600 mb-2">Publisher Name</label>
          <input v-model="newPublisher.tenNXB" type="text" class="w-full border-gray-300 rounded-md p-2" placeholder="Enter publisher name" />
        </div>
        <div class="mb-4">
          <label class="block font-medium text-gray-600 mb-2">Publisher Address</label>
          <input v-model="newPublisher.diaChi" type="text" class="w-full border-gray-300 rounded-md p-2" placeholder="Enter publisher address" />
        </div>

        <!-- Buttons: Cancel (only when editing) and Confirm/Update -->
        <div v-if="isEditing" class="mt-4 flex space-x-4">
          <button @click="cancelEdit" type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Cancel
          </button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Update
          </button>
        </div>
        <div v-else class="mt-4">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </form>
    </div>

    <!-- Manage Publishers Section -->
    <div v-if="currentTab === 'manage'" class="card bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-700 mb-4">Manage Publishers</h2>

      <!-- Search Bar -->
      <div class="mb-4">
        <input v-model="searchQuery" @input="searchPublisher" type="text" class="w-full border-gray-300 rounded-md p-2" placeholder="Search publisher by name..." />
      </div>

      <div v-if="publishers.length === 0" class="text-gray-600">
        <p>No publishers found. Please add one.</p>
      </div>

      <div v-else>
        <ul>
          <li v-for="publisher in filteredPublishers" :key="publisher._id" class="mb-4 p-4 border-b border-gray-300 rounded-md">
            <p><strong>Name:</strong> {{ publisher.tenNXB }}</p>
            <p><strong>Address:</strong> {{ publisher.diaChi }}</p>
            <button @click="editPublisher(publisher._id)" class="text-blue-600 hover:text-blue-800 mr-2">
              Edit
            </button>
            <button @click="deletePublisher(publisher._id)" class="text-red-600 hover:text-red-800">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PublisherService from "@/services/PublisherService";

export default {
  data() {
    return {
      currentTab: "create", // Default tab is 'create'
      newPublisher: {
        tenNXB: "",
        diaChi: "",
      },
      publishers: [],
      publisherAdded: false,
      searchQuery: "",
      filteredPublishers: [],
      isEditing: false,
    };
  },
  created() {
    this.fetchPublishers();
  },
  methods: {
    async fetchPublishers() {
      try {
        const response = await PublisherService.findAll();
        this.publishers = response.data;
        this.filteredPublishers = [...this.publishers]; // Set initial filtered list
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    },
    async createPublisher() {
      try {
        const response = await PublisherService.createPublisher(this.newPublisher);
        this.publisherAdded = true;

        setTimeout(() => {
          this.publisherAdded = false;
        }, 3000);

        // Reset form and fetch updated list of publishers
        this.newPublisher = { tenNXB: "", diaChi: "" };
        this.fetchPublishers();
        this.currentTab = "manage";
      } catch (error) {
        console.error("Error creating publisher:", error);
      }
    },
    async updatePublisher() {
      try {
        const response = await PublisherService.update(this.newPublisher._id, this.newPublisher);
        this.publisherAdded = true;

        setTimeout(() => {
          this.publisherAdded = false;
        }, 3000);

        // Reset form and fetch updated list of publishers
        this.newPublisher = { tenNXB: "", diaChi: "" };
        this.fetchPublishers();
        this.currentTab = "manage";
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating publisher:", error);
      }
    },
    async deletePublisher(id) {
      try {
        await PublisherService.delete(id);
        this.fetchPublishers();
      } catch (error) {
        console.error("Error deleting publisher:", error);
      }
    },
    async editPublisher(id) {
      try {
        const publisher = await PublisherService.findOne(id);
        this.newPublisher = { ...publisher }; // Fill the form with the publisher details
        this.isEditing = true; // Set editing flag to true
        this.currentTab = "create"; // Switch to 'create' tab for editing
      } catch (error) {
        console.error("Error fetching publisher for editing:", error);
      }
    },
    cancelEdit() {
      // Reset form and return to manage tab without saving
      this.isEditing = false;
      this.newPublisher = { tenNXB: "", diaChi: "" };
      this.currentTab = "manage";
    },
    searchPublisher() {
      if (this.searchQuery === "") {
        // If no search query, reset filtered list
        this.filteredPublishers = [...this.publishers];
      } else {
        // Filter publishers based on search query
        this.filteredPublishers = this.publishers.filter(publisher =>
          publisher.tenNXB.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
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
