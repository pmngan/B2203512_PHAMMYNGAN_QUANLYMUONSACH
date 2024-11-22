import createApiClient from "./api.service";

class TrackingService {
    constructor(baseURL = "/api/track") {  // Updated the URL to '/api/book'
        this.api = createApiClient(baseURL);
    }

    async findAllTrackBooks() {
        return await this.api.get("/");  // This should work now since it's aligned with your API
    }

    async findOneTrackBook(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createTrackBook(data) {
        return (await this.api.post("/create", data)).data;
    }

    async updateTrackBook(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteTrackBook(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new TrackingService();
