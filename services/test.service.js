import http from '@/services/http-common';

class TestService {
    get() {
        return http.get(`test`)
    }
}

export default new TestService();