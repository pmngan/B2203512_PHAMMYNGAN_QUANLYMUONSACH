<template>
  <div class="dashboard-container flex h-screen bg-gray-100">
    <!-- Left Column: Administrative Tools -->
    <div class="w-1/4 bg-gray-900 text-white p-6 space-y-6">
      <button @click="returnToHome"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
        Return to Home
      </button>
      <h1 class="text-xl font-bold text-center">Admin Panel</h1>

      <!-- Navigation -->
      <nav class="space-y-4">
        <!-- Publisher Dropdown -->
        <div class="relative">
          <button class="w-full bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700" @click="goToPublisher">
            <i class="fas fa-cogs mr-2"></i> PUBLISHER
          </button>
        </div>

        <!-- Book Dropdown -->
        <div class="relative">
          <button class="w-full bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700" @click="goToBook">
            <i class="fas fa-book mr-2"></i> BOOK
          </button>
        </div>

        <!-- User Dropdown -->
        <div class="relative">
          <button class="w-full bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700" @click="goToUser">
            <i class="fas fa-book mr-2"></i> USER
          </button>
        </div>

        
        <div class="relative">
          <button class="w-full bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700" @click="goToTrackRequest">
            <i class="fas fa-book mr-2"></i> BORROW REQUEST 
          </button>
        </div>

        <div class="relative">
          <button class="w-full bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700" @click="goToStaff">
            <i class="fas fa-book mr-2"></i> STAFFS
          </button>
        </div>

      </nav>
    </div>

    <!-- Right Column: Content Area -->
    <div class="w-3/4 p-6">
      <!-- Content area is blank here since we're redirecting to specific pages -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    goToPublisher() {
      this.$router.push('/dashboard/publisher'); // Redirect to Publisher Dashboard
    },
    goToBook() {
      this.$router.push('/dashboard/book'); // Redirect to Book Dashboard
    },
    goToUser() {
      this.$router.push('/dashboard/user');
    },
    goToTrackRequest(){
      this.$router.push('/dashboard/track');
    },
    goToStaff(){
      this.$router.push('/dashboard/staff');
    },
    returnToHome() {
      this.$router.push("/"); // Adjust the route as needed
    },
  }
};
</script>
