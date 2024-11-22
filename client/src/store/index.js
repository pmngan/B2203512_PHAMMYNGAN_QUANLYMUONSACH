import { createStore } from "vuex";
import UserService from "@/services/UserService";
import StaffService from "@/services/StaffService"; // Ensure you import StaffService

export default createStore({
  state: {
    // User state
    user: null,
    userId: localStorage.getItem('userId') || null,  // Load userId from localStorage
    token: localStorage.getItem('userToken') || null, // Load token from localStorage

    // Staff state
    staff: null,
    staffId: null,
    staffToken: localStorage.getItem('staffToken') || null, // Load staffToken from localStorage

    isStaffLoggedIn: false,
  },
  mutations: {
    // User mutations
    setUser(state, user) {
      state.user = user;
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId); // Persist userId in localStorage
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('userToken', token); // Persist token in localStorage
    },
    clearUser(state) {
      state.user = null;
      state.userId = null;
      state.token = null;
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
    },

    // Staff mutations
    setStaff(state, staff) {
      state.staff = staff;
    },
    setStaffId(state, staffId) {
      state.staffId = staffId;
    },
    setStaffToken(state, staffToken) {
      state.staffToken = staffToken;
      localStorage.setItem('staffToken', staffToken); // Persist staffToken in localStorage
    },
    clearStaff(state) {
      state.staff = null;
      state.staffId = null;
      state.staffToken = null;
      localStorage.removeItem('staffToken');
    },

    setStaffLoggedIn(state, status) {
        state.isStaffLoggedIn = status;
    },
  },
  actions: {
    // User actions
    async loginUser({ commit }, credentials) {
      try {
        const response = await UserService.login(credentials);
        if (response) {
          commit('setUserId', response.maDocGia);  // Store maDocGia (userId)
          commit('setUser', response);
          commit('setToken', response.token);
          return true;
        }
        return false;
      } catch (error) {
        console.error("User login failed:", error);
        return false;
      }
    },

    // Staff actions
    async loginStaff({ commit }, staff_credentials) {
      try {
        const response = await StaffService.login(staff_credentials);
        if (response) {
            commit("setStaffLoggedIn", true);
          commit('setStaffId', response.MSNV); // Adjust based on your response structure
          commit('setStaff', response);
          commit('setStaffToken', response.token);
          return true;
        } else {
            commit("setStaffLoggedIn", false);
        return false;
        }
      } catch (error) {
        cosocommit("setStaffLoggedIn", false);
        console.error("Staff login failed:", error);
        return false;
      }
    },

    async updateUserProfile({ commit, state }, updatedData) {
      try {
        if (state.userId) {
          await UserService.updateAccount(state.userId, updatedData);
          commit('clearUser');
          return true;
        }
        return false;
      } catch (error) {
        console.error("User profile update failed:", error);
        return false;
      }
    },

    async updateStaffProfile({ commit, state }, updatedData) {
      try {
        if (state.staffId) {
          await StaffService.updateStaffAccount(state.staffId, updatedData);
          commit('clearStaff');
          return true;
        }
        return false;
      } catch (error) {
        console.error("Staff profile update failed:", error);
        return false;
      }
    },

    initAuthState({ commit }) {
      const userToken = localStorage.getItem('userToken');
      const staffToken = localStorage.getItem('staffToken');
      const userId = localStorage.getItem('userId');
      if (userToken && userId) {
        commit('setToken', userToken);
        commit('setUserId', userId);  // Ensure the userId is also loaded from localStorage
      }
      if (staffToken) {
        commit('setStaffToken', staffToken);
      }
    },

    logoutUser({ commit }) {
      commit('clearUser'); // Clear user data from Vuex
      commit('clearStaff'); // Clear staff data (if needed)
      localStorage.removeItem('userToken'); // Optionally, remove token from localStorage
      localStorage.removeItem('staffToken'); // Optionally, remove staff token from localStorage
      localStorage.removeItem('userId'); // Remove userId from localStorage
    },
  },
  getters: {
    // User getters
    user: state => state.user,
    userId: state => state.userId,  // Access the userId directly
    isUserLoggedIn: state => !!state.token,

    // Staff getters
    staff: state => state.staff,
    isStaffLoggedIn: state => !!state.staffToken,
  },
});
