export async function getTasks(client) {
  try {
    const response = await client.get('/tasks');
    console.log(response.data.data.data);
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTask(id, client) {
  try {
    const response = await client.get(`/tasks/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateTask(data, client) {
  const { _id, ...valori } = data;
  try {
    const response = await client.patch(`/tasks/${_id}`, valori);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTask(data, client) {
  try {
    const response = await client.post('/tasks', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTask(id, client) {
  try {
    await client.delete(`/tasks/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
