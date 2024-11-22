<template>
    <div class="book-list-container p-6 bg-gray-50">
      <!-- Header -->
      <header class="bg-blue-800 p-4 text-white text-xl font-semibold">
        <div>Library Management - Borrow Book</div>
      </header>
  
      <!-- Book List Section -->
      <div class="book-list-section mt-6">
        <h2 class="text-2xl text-blue-800 mb-4">Select a Book</h2>
  
        <!-- Book List -->
        <div class="space-y-4">
          <div v-for="book in books" :key="book._id" class="book-item bg-white rounded-lg shadow-md p-4">
            <button @click="selectBook(book)" class="w-full text-left text-blue-800 hover:text-blue-600">
              {{ book.tenSach }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Borrow Form Section -->
      <div v-if="selectedBook" class="borrow-form mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl text-blue-800 mb-4">Borrow Book: {{ selectedBook.tenSach }}</h3>
  
        <form @submit.prevent="submitBorrowForm">
          <!-- maDocGia Input -->
          <div class="mb-4">
            <label for="maDocGia" class="block text-sm font-semibold text-blue-700">User ID (maDocGia)</label>
            <input
              v-model="maDocGia"
              id="maDocGia"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 bg-gray-100"
              placeholder="Auto-filled User ID"
              readonly
            />
          </div>
  
          <!-- ngayMuon Input -->
          <div class="mb-4">
            <label for="ngayMuon" class="block text-sm font-semibold text-blue-700">Date Borrowed (ngayMuon)</label>
            <input
              v-model="ngayMuon"
              id="ngayMuon"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
  
          <!-- ngayTra Input -->
          <div class="mb-4">
            <label for="ngayTra" class="block text-sm font-semibold text-blue-700">Date to Return (ngayTra)</label>
            <input
              v-model="ngayTra"
              id="ngayTra"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <div class="text-center">
            <button
              type="submit"
              class="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Borrow Book
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import BookService from "@/services/BookService";
  import TrackingService from "@/services/TrackingService";
  
  export default {
    name: "BookList",
    data() {
      return {
        books: [], // List of all books
        selectedBook: null, // The selected book for borrowing
        maDocGia: "", // User ID input
        ngayMuon: "", // Date borrowed
        ngayTra: "", // Date to return
      };
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await BookService.findAll();
          this.books = response.data;
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      },
  
      selectBook(book) {
        this.selectedBook = book; // Set selected book
        this.ngayMuon = new Date().toISOString().split("T")[0]; // Set today as default borrow date
        this.ngayTra = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]; // Set default return date (7 days later)
      },
  
      submitBorrowForm() {
        if (this.selectedBook && this.maDocGia && this.ngayMuon && this.ngayTra) {
          const borrowData = {
            maDocGia: this.maDocGia,
            maSach: this.selectedBook._id, // Book ID is automatically set
            ngayMuon: this.ngayMuon,
            ngayTra: this.ngayTra,
          };
  
          // Call createTrackBook function to record the borrow transaction
          TrackingService.createTrackBook(borrowData)
            .then(response => {
              console.log("Book borrowed successfully:", response.data);
              this.$router.push("/borrow"); // Redirect to borrow page after successful borrowing
            })
            .catch(error => {
              console.error("Error borrowing book:", error);
            });
        } else {
          console.error("Please fill in all fields.");
        }
      },
    },
    created() {
      this.fetchBooks(); // Fetch the list of books when the component is created
  
      // Retrieve user ID (maDocGia) from localStorage or Vuex
      const userId = localStorage.getItem("userId"); // Replace with Vuex store if needed
      if (userId) {
        this.maDocGia = userId;
      } else {
        console.error("User ID not found.");
      }
    },
  };
  </script>
  
  <style scoped>
  .book-list-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .book-item {
    cursor: pointer;
  }
  
  .book-item:hover {
    background-color: #f0f8ff;
  }
  </style>
  