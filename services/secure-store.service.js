import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN = 'access';
const REFRESH_TOKEN = 'refresh';

export async function secureStore(key, value) {
    console.debug('storing ', key, value);
    await SecureStore.setItemAsync(key, value);
}

export function getSecureValueSync(key) {
    console.debug('reading ', key);
    return SecureStore.getItem(key);
}

export async function storeAccess(value) {
    console.debug('storing access token', value);
    await SecureStore.setItemAsync(ACCESS_TOKEN, value);
    // TODO: replaces 'access' with global CONST
}

export function getAccess() {
    console.debug('reading access token');
    return SecureStore.getItem(ACCESS_TOKEN);
}

export async function storeRefresh(value) {
    console.debug('storing refresh token', value);
    await SecureStore.setItemAsync(REFRESH_TOKEN, value);
}

export function getRefresh() {
    console.debug('reading refresh token', key);
    return SecureStore.getItem(key);
}

export function clearTokens() {
    console.debug('clearing tokens');
    SecureStore.deleteItemAsync(ACCESS_TOKEN);
    SecureStore.deleteItemAsync(REFRESH_TOKEN);
}