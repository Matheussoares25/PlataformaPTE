import Api from '../services/EndPoint';

export async function login() {
    const response = await Api.CallEndpoint('auth', 'POST', null, null);
}