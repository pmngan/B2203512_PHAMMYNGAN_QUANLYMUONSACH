import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }

    async createStaffAccount(data) {
        return (await this.api.post("/create", data)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async findAll() {
        const response = await this.api.get("/");
        console.log("Raw API Response:", response); // Log the raw response
        return response.data; // Ensure you return the correct data
    }

    async findOne(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateAccount(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

}

export default new StaffService();