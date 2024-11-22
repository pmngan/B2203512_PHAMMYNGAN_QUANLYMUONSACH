<template>
    <div class="w-full p-6 flex flex-col">
        <!-- Tab Navigation -->
        <div class="mb-6 flex items-center justify-between">
      <button @click="returnToDashboard"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Dashboard
      </button>
    </div>
        <div class="flex space-x-4 mb-4">
            <button @click="currentTab = 'create'"
                :class="{ 'bg-blue-600 text-white': currentTab === 'create', 'text-gray-600': currentTab !== 'create' }"
                class="py-2 px-4 rounded-md hover:bg-blue-700">
                Add New Book
            </button>
            <button @click="currentTab = 'manage'"
                :class="{ 'bg-blue-600 text-white': currentTab === 'manage', 'text-gray-600': currentTab !== 'manage' }"
                class="py-2 px-4 rounded-md hover:bg-blue-700">
                Manage Books
            </button>
        </div>

        <!-- Add Book Section -->
        <div v-if="currentTab === 'create'" class="card bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-700 mb-4">{{ isEditing ? 'Edit Book' : 'Add New Book' }}</h2>

            <!-- Success Message -->
            <div v-if="bookAdded" class="bg-green-100 text-green-800 p-4 mb-4 rounded-md">
                <p>Book {{ isEditing ? 'updated' : 'added' }} successfully!</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="isEditing ? updateBook() : createBook()">
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Book Title</label>
                    <input v-model="newBook.tenSach" type="text" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter book title" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Author</label>
                    <input v-model="newBook.tacGia" type="text" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter author" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Price (donGia)</label>
                    <input v-model="newBook.donGia" type="number" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter price" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Number of Copies (soQuyen)</label>
                    <input v-model="newBook.soQuyen" type="number" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter number of copies" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Year of Publication (namXuatBan)</label>
                    <input v-model="newBook.namXuatBan" type="number" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter year of publication" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Publisher</label>
                    <select v-model="newBook.maNXB" class="w-full border-gray-300 rounded-md p-2">
                        <option v-for="publisher in publishers" :value="publisher._id" :key="publisher._id">
                            {{ publisher.tenNXB }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Details (chiTiet)</label>
                    <textarea v-model="newBook.chiTiet.moTa" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter book details"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block font-medium text-gray-600 mb-2">Image (hinhAnh)</label>
                    <input v-model="newBook.chiTiet.hinhAnh" type="text" class="w-full border-gray-300 rounded-md p-2"
                        placeholder="Enter image URL" />
                </div>
                <!-- Cancel and Update buttons only appear when editing -->
                <div v-if="isEditing" class="mt-4 flex space-x-4">
                    <!-- Cancel Button -->
                    <button @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Cancel
                    </button>

                    <!-- Update Button -->
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Update
                    </button>
                </div>

                <!-- Confirm Button always visible -->
                <button v-else type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Confirm
                </button>

            </form>
        </div>

        <!-- Manage Books Section -->
        <div v-if="currentTab === 'manage'" class="card bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-700 mb-4">Manage Books</h2>

            <!-- Search Bar -->
            <div class="mb-4">
                <input v-model="searchQuery" @input="searchBook" type="text"
                    class="w-full border-gray-300 rounded-md p-2" placeholder="Search book by title..." />
            </div>

            <div v-if="books.length === 0" class="text-gray-600">
                <p>No books found. Please add one.</p>
            </div>

            <div v-else>
                <ul>
                    <li v-for="book in filteredBooks" :key="book._id"
                        class="mb-4 p-4 border-b border-gray-300 rounded-md">
                        <p><strong>Title:</strong> {{ book.tenSach }}</p>
                        <p><strong>Author:</strong> {{ book.tacGia }}</p>
                        <button @click="editBook(book._id)" class="text-blue-600 hover:text-blue-800 mr-2">
                            Edit
                        </button>
                        <button @click="deleteBook(book._id)" class="text-red-600 hover:text-red-800">
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from "@/services/BookService";
import PublisherService from "@/services/PublisherService"; // Assuming you have this service

export default {
    data() {
        return {
            currentTab: "create", // Default tab is 'create'
            newBook: {
                tenSach: "",
                tacGia: "",
                donGia: "",
                soQuyen: "",
                namXuatBan: "",
                chiTiet: "",
                maNXB: "",
            },
            books: [],
            publishers: [],
            bookAdded: false,
            searchQuery: "",
            filteredBooks: [],
            isEditing: false,
        };
    },
    created() {
        this.fetchBooks();
        this.fetchPublishers();
    },
    methods: {
        async fetchBooks() {
            try {
                const response = await BookService.findAll();
                this.books = response.data;
                this.filteredBooks = [...this.books]; // Set initial filtered list
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        },
        async fetchPublishers() {
            try {
                const response = await PublisherService.findAll();
                this.publishers = response.data;
            } catch (error) {
                console.error("Error fetching publishers:", error);
            }
        },
        async createBook() {
            try {
                const response = await BookService.createBook(this.newBook);
                this.bookAdded = true;

                setTimeout(() => {
                    this.bookAdded = false;
                }, 3000);

                // Reset form and fetch updated list of books
                this.newBook = {
                    tenSach: "",
                    tacGia: "",
                    donGia: "",
                    soQuyen: "",
                    namXuatBan: "",
                    chiTiet: "",
                    maNXB: "",
                };
                this.fetchBooks();
                this.currentTab = "manage";
            } catch (error) {
                console.error("Error creating book:", error);
            }
        },
        async updateBook() {
            try {
                const response = await BookService.updateBook(this.newBook._id, this.newBook);
                this.bookAdded = true;

                setTimeout(() => {
                    this.bookAdded = false;
                }, 3000);

                // Reset form and fetch updated list of books
                this.newBook = {
                    tenSach: "",
                    tacGia: "",
                    donGia: "",
                    soQuyen: "",
                    namXuatBan: "",
                    chiTiet: "",
                    maNXB: "",
                };
                this.fetchBooks();
                this.currentTab = "manage";
                this.isEditing = false;
            } catch (error) {
                console.error("Error updating book:", error);
            }
        },
        async deleteBook(id) {
            try {
                await BookService.delete(id);
                this.fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        },
        async editBook(id) {
            try {
                const book = await BookService.findOne(id);
                this.newBook = { ...book }; // Fill the form with the book details

                // Ensure that the maNXB (Publisher) is selected correctly
                this.newBook.maNXB = book.maNXB; // Explicitly set maNXB field in case it's not set

                this.isEditing = true; // Set editing flag to true
                this.currentTab = "create"; // Switch to 'create' tab for editing
            } catch (error) {
                console.error("Error fetching book for editing:", error);
            }
        },
        searchBook() {
            if (this.searchQuery === "") {
                // If no search query, reset filtered list
                this.filteredBooks = [...this.books];
            } else {
                // Filter books based on search query
                this.filteredBooks = this.books.filter(book =>
                    book.tenSach.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
        },
        addImage() {
            this.newBook.chiTiet.hinhAnh.push(''); // Add a new empty image URL field
        },
        removeImage(index) {
            this.newBook.chiTiet.hinhAnh.splice(index, 1); // Remove the image URL at the given index
        },
        cancelEdit() {
            // Reset the form to the initial state (before any editing)
            this.newBook = JSON.parse(JSON.stringify(this.originalBook)); // Deep copy the original data

            this.currentTab = 'manage'; // Switch to 'manage' tab
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