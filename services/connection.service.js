import http from "../http-common";

import { storeAccess, getAccess, storeRefresh, getRefresh } from './secure-store.service';
import { useAuth } from "./AuthContext";

class ConnectionService {
    accessToken = useAuth();

    login(email, pass) {
        console.debug("attempting login");
        let data = {
            email: email,
            password: pass,
        }
        let result = http.post(`login`, data)
            .then(res => {
                let accessToken = res.data.accessToken;
                console.debug('accessToken', accessToken);
                storeAccess(accessToken);

                let refreshToken;
                let cookieHeader = res.headers['set-cookie'];
                if (cookieHeader) {
                    cookieHeader.forEach(cookieString => {
                        if (cookieString.startsWith('refreshToken=')) {
                            refreshToken = cookieString.substring(cookieString.indexOf('=') + 1, cookieString.indexOf(';'));
                        }
                    })
                    refreshToken = cookieHeader
                }
                if (refreshToken) {
                    console.debug("refreshToken", refreshToken);
                    storeRefresh(refreshToken);
                }
                
                return true;
            })
            .catch(e => {
                return false;
            });
    }

    // logout() {}

    getEventsCopy() {
        console.debug('attempting fetch events');
        const access = getAccess();
        return http.get(`auth/events`, {headers: {Authorization: `Bearer ${access}`}});
    }

    getEvents() {
        console.log(this.accessToken);
        return http.get(`auth/events`, {headers: {Authorization: `Bearer ` + this.accessToken}});
    }
}

export default new ConnectionService();