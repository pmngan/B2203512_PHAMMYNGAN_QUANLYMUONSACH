import createApiClient from "./api.service";

class BookService {
  constructor(baseURL = "/api/book") {
    // Updated the URL to '/api/book'
    this.api = createApiClient(baseURL);
  }

  async findAll() {
    return await this.api.get("/"); // This should work now since it's aligned with your API
  }

  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async createBook(data) {
    return (await this.api.post("/create", data)).data;
  }

  async updateBook(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new BookService();
