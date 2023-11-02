import axiosClient from '../axios';

export async function signup(data) {
  try {
    const response = await axiosClient.post('/users/signup', data, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function login({ email, password }) {
  try {
    const response = await axiosClient.post(
      'users/login',
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCurrentUser(client) {
  try {
    const response = await client.get(`/users/me`);
    return response.data.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getUserPhoto(client, id) {
  try {
    const response = await client.get(`/users/photo/user-${id}.jpeg`, {
      responseType: 'arraybuffer',
    });
    const uint8Array = new Uint8Array(response.data);
    const imageBase64 = btoa(String.fromCharCode.apply(null, uint8Array));
    return imageBase64;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function logout(client) {
  try {
    const response = await client.get('/users/logout');
    console.log(response);
    return response;
  } catch (err) {
    console.log(err.response.data);
    throw err;
  }
}

export async function updatePassword(data, client) {
  try {
    const response = await client.patch('users/updatePassword', data);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
