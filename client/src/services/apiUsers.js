// ONLY CURRENT USER

export async function updateCurrentUser(data, client) {
  console.log(data);
  try {
    const response = await client.patch('users/updateMe', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// ONLY ADMIN
export async function getUsers(client) {
  try {
    const response = await client.get('/users');

    return response.data.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getUser(id, client) {
  try {
    const response = await client.get(`/users/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createUser(data, client) {
  try {
    const response = await client.post('/users', data);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUser(data, client) {
  const { _id, ...valori } = data;
  try {
    const response = await client.patch(`/users/${_id}`, valori);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(id, client) {
  try {
    await client.delete(`/users/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
