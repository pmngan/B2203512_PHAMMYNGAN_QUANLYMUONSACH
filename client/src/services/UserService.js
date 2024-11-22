import createApiClient from "./api.service";

class UserService{
    constructor(baseUrl = "/api/user"){
        this.api = createApiClient(baseUrl);
    } 

    async createAccount(data) {
        return (await this.api.post("/create", data)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async findAll(){
        return (await this.api.get("/")).data;
    }

    async findOne(id){
        return (await this.api.get(`/${id}`)).data;
    }

    async updateAccount(id , data){
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async check(email) {
        try {
            const response = await this.api.post("/check", { email });
            return response.data; // Ensure `data` exists before returning it
        } catch (error) {
            console.error("Error in check():", error);
            return null; // Return a safe fallback
        }
    }
}

export default new UserService();