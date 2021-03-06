import http from "./TransactionsApi.js";

class DataService {

  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}/`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/${id}/`);
  }
}

export default new DataService();