import { router } from 'expo-router';
import http from '@/services/http-common';

import RegisterView from '@/views/RegisterView';
import { is2XXStatus } from '@/utils/Utils';

export default function RegistrationController() {

    const handleRegistration = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            // TODO common API definition
            // TODO expect no password which is generated and then force change on first login
            const response = await http.post(`signup`, {
                displayName: name,
                email: email,
                password: password
            });
            if (is2XXStatus(response.status)) {
                router.back();
                return true;
            } else {
                throw new Error('unable to register');
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    return <RegisterView handleRegistration={handleRegistration} />;
    // return <ExperimentalView />
}