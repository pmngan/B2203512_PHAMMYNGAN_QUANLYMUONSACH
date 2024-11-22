<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <button @click="returnToDashboard"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Dashboard
      </button>
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Borrow Tracking</h2>

    <!-- Search Bar -->
    <div class="mb-6 flex items-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by user name..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        @click="clearSearch"
        class="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
      >
        Clear
      </button>
    </div>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="track in filteredTrackBooks"
        :key="track._id"
        class="bg-white border border-gray-200 shadow-md rounded-lg p-4"
      >
        <h3 class="text-lg font-medium text-gray-700 mb-2">
          {{ track.maDocGia.hoLot }} {{ track.maDocGia.ten }}
        </h3>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Book:</span> {{ track.maSach.tenSach }}
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Borrow Date:</span> {{ formatDate(track.ngayMuon) }}
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Return Date:</span> {{ formatDate(track.ngayTra) }}
        </p>
        <p class="text-sm">
          <span class="font-semibold">Status:</span>
          <span :class="track.trangThai ? 'text-green-500 font-semibold' : 'text-yellow-500 font-semibold'">
            {{ track.trangThai ? "Accepted" : "Pending" }}
          </span>
        </p>
        <div class="mt-4 flex space-x-2">
          <button
            v-if="!track.trangThai"
            @click="updateStatus(track._id, true)"
            class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Accept
          </button>
          <button
            v-if="track.trangThai"
            @click="updateStatus(track._id, false)"
            class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrackBookService from "@/services/TrackingService";

export default {
  data() {
    return {
      trackBooks: [], // Original data fetched from the backend
      searchQuery: "", // For filtering the list
    };
  },
  computed: {
    filteredTrackBooks() {
      // Filter borrow tracking records based on the search query
      return this.trackBooks.filter((track) => {
        const fullName = `${track.maDocGia?.hoLot} ${track.maDocGia?.ten}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  created() {
    this.fetchTrackBooks();
  },
  methods: {
    async fetchTrackBooks() {
      try {
        const response = await TrackBookService.findAllTrackBooks();
        this.trackBooks = response.data;
      } catch (error) {
        console.error("Error fetching track books:", error);
      }
    },
    async updateStatus(trackId, status) {
      try {
        await TrackBookService.updateTrackBook(trackId, { trangThai: status });
        this.fetchTrackBooks(); // Refresh the list after updating
      } catch (error) {
        console.error("Error updating borrow request status:", error);
      }
    },
    clearSearch() {
      this.searchQuery = "";
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    },
    returnToDashboard() {
      this.$router.push("/dashboard"); // Adjust the route as needed
    },
  },
};
</script>
