import createApiClient from "./api.service";

class PublisherService {
    constructor(baseURL = "/api/publisher") {  // Updated the URL to '/api/book'
        this.api = createApiClient(baseURL);
    }

    async findAll() {
        return await this.api.get("/");  // This should work now since it's aligned with your API
    }

    async findOne(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createPublisher(data) {
        return (await this.api.post("/create", data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new PublisherService();
