import http from "../http-common";

class TestService {
    get() {
        return http.get(`test`)
    }
}

export default new TestService();