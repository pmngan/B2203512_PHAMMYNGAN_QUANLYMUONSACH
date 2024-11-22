<template>
  <div class="home-container flex flex-col h-screen bg-gray-50">
    <!-- Header Section (Top) -->
    <header class="bg-blue-800 p-4 text-white flex justify-between items-center shadow-md">
      <div class="text-xl font-semibold">Library Management</div>
      <div class="flex space-x-4 items-center">
        <!-- Profile Link -->
        <router-link to="/profile" class="hover:text-blue-200">Profile</router-link>
        <!-- Borrow Button -->
        <button @click="borrowBook" class="hover:text-blue-200">Borrow</button>
        <!-- User ID Display -->

        <!-- Logout Button -->
        <button @click="logout" class="hover:text-blue-200">Logout</button>
      </div>
    </header>

    <!-- Main Content Section -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Column: Selected Book Details (4/5 width) -->
      <div class="w-4/5 p-6 bg-white shadow-lg overflow-y-auto border-r border-gray-200">
        <div v-if="selectedBook" class="book-details flex flex-col h-full">
          <!-- Top Section: Image and Grid Details -->
          <div class="flex flex-col md:flex-row h-2/3 mb-4">
            <!-- Image Section -->
            <div class="book-image w-full md:w-2/3 bg-blue-50 rounded-lg p-4 flex items-center justify-center">
              <img
                :src="selectedBook.chiTiet.hinhAnh.length > 0 ? selectedBook.chiTiet.hinhAnh[0] : 'path/to/placeholder.jpg'"
                alt="Book image" class="max-w-full max-h-full object-contain rounded-lg shadow-md" />
            </div>

            <!-- Grid Details -->
            <div class="book-info w-full md:w-1/3 bg-blue-100 bg-opacity-30 p-6 rounded-lg md:ml-4 mt-4 md:mt-0">
              <h2 class="text-2xl font-bold text-blue-800 text-center mb-4">{{ selectedBook.tenSach }}</h2>

              <div class="grid grid-cols-2 gap-4">
                <div class="book-detail-item">
                  <span class="font-semibold text-blue-700">Price:</span>
                  <span class="text-gray-700">{{ selectedBook.donGia | currency }}</span>
                </div>
                <div class="book-detail-item">
                  <span class="font-semibold text-blue-700">Quantity:</span>
                  <span class="text-gray-700">{{ selectedBook.soQuyen }}</span>
                </div>
                <div class="book-detail-item">
                  <span class="font-semibold text-blue-700">Published Year:</span>
                  <span class="text-gray-700">{{ selectedBook.namXuatBan }}</span>
                </div>
                <div class="book-detail-item">
                  <span class="font-semibold text-blue-700">Author:</span>
                  <span class="text-gray-700">{{ selectedBook.tacGia }}</span>
                </div>
                <div class="book-detail-item col-span-2">
                  <span class="font-semibold text-blue-700">Publisher:</span>
                  <span class="text-gray-700">{{ selectedBook.maNXB.tenNXB }}</span>
                </div>
              </div>

              <!-- Borrow Button -->
              <div class="mt-6 text-center">
                <button @click="borrowBook"
                  class="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Borrow Book
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Section: Description -->
          <div class="mt-4 bg-white p-4 rounded-lg shadow-sm h-1/3">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">Description</h3>
            <p class="text-gray-600">
              {{ selectedBook.chiTiet.moTa || 'No description available' }}
            </p>
          </div>
        </div>

        <!-- Placeholder Message When No Book is Selected -->
        <div v-else class="flex items-center justify-center h-full">
          <p class="text-xl text-gray-500 bg-blue-50 p-6 rounded-lg">
            No book selected. Please select a book to view its details.
          </p>
        </div>
      </div>

      <!-- Right Column: Search and Book List (1/5 width) -->
      <div class="w-1/5 p-6 bg-blue-50 overflow-y-auto">
        <!-- Search Form -->
        <form @submit.prevent="searchBooks" class="mb-6">
          <div class="relative">
            <input v-model="searchQuery" placeholder="Search books" type="text" @keydown.enter="searchBooks"
              class="w-full px-4 py-2 pl-10 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-700" />
            <svg class="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </form>

        <!-- Book List -->
        <div class="book-list space-y-2">
          <div v-if="filteredBooks.length > 0" class="space-y-2">
            <div v-for="book in filteredBooks" :key="book._id"
              class="bg-white rounded-lg shadow-sm hover:bg-blue-100 transition-all duration-200">
              <a href="#" @click.prevent="viewBook(book._id)"
                class="block px-4 py-3 text-blue-700 hover:text-blue-900 hover:pl-6 transition-all duration-200">
                {{ book.tenSach }}
              </a>
            </div>
          </div>
          <p v-else class="text-gray-500 text-center bg-white p-4 rounded-lg">
            No books found matching your search.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "@/services/BookService";
// Removed TrackingService import

import { mapActions } from "vuex"; // Use mapActions to bind logout action

export default {
  name: "Home",
  data() {
    return {
      books: [], // All books
      searchQuery: "", // Search query
      uid: null,
      selectedBook: null, // Selected book details
      showNotification: false,  // Controls the visibility of the notification
      showModal: false,
      borrowData: {
        maDocGia: null,
        maSach: null,
        ngayMuon: null,
        ngayTra: null,
      },
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book =>
        book.tenSach.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['logout']), // Bind logout action from Vuex

    async fetchBooks() {
      try {
        const response = await BookService.findAll();
        console.log("Fetched Books:", response.data);
        this.books = response.data; // Store all fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    async viewBook(bookId) {
      try {
        const book = await BookService.findOne(bookId);
        this.selectedBook = book; // Set the selected book details
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    },

    searchBooks() {
      // Search is handled automatically by the computed property "filteredBooks"
    },

    logout() {
      this.$store.dispatch("logout"); // Dispatch logout action to Vuex
      this.$router.push("/login");   // Redirect to the login page
    },

    checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.fetchBooks(); // Fetch books if the user is logged in
      }
      // If token is not found, do nothing (i.e., no redirect)
    },

    borrowBook() {
      this.$router.push("/borrow"); // Adjust the route as needed
    },
  },
  created() {
    this.checkToken(); // Check if the user has a valid token when the component is created
    this.fetchBooks(); // Fetch books if the user is logged in
  },
};
</script>
can you bring the borrow button next to profile and can you add a textbox showing UID?