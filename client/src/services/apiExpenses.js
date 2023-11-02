export async function getStats(filter, client) {
  const { type, year, month, startYear, startMonth, endYear, endMonth } =
    filter;
  const queryParams = [];

  if (type) queryParams.push(`type=${type}`);
  if (year) queryParams.push(`year=${year}`);
  if (month) queryParams.push(`month=${month}`);
  if (startYear) queryParams.push(`startYear=${startYear}`);
  if (endYear) queryParams.push(`endYear=${endYear}`);
  if (startMonth) queryParams.push(`startMonth=${startMonth}`);
  if (endMonth) queryParams.push(`endMonth=${endMonth}`);

  const queryString = queryParams.join('&');

  try {
    const response = await client.get(`/expenses/stats?${queryString}`);
    console.log(response.data.data.statistics);
    return response.data.data.statistics;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getMonthlyStats(filter, client) {
  const { type, year, month } = filter;
  const queryParams = [];

  if (type) queryParams.push(`type=${type}`);
  if (year) queryParams.push(`year=${year}`);
  if (month) queryParams.push(`month=${month}`);

  const queryString = queryParams.join('&');

  try {
    const response = await client.get(`/expenses/monthly-stats?${queryString}`);
    console.log(response.data.data.statistics);
    return response.data.data.statistics;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses(query, client) {
  const { filter, page } = query;
  const { type, category } = filter;
  console.log(JSON.stringify(filter));

  const queryParams = [];
  if (type !== 'all') queryParams.push(`type=${type}`);
  if (category !== 'all') queryParams.push(`category=${category}`);
  const queryString = queryParams.join('&');
  console.log(queryString);

  try {
    const response = await client.get(
      `/expenses?sort=-date&limit=10&page=${page}&${queryString}`
    );
    const totalResponse = await client.get(`/expenses?${queryString}`);
    const total = totalResponse.data.results;
    const transactions = response.data.data.data;
    console.log(
      'transactions: ' + JSON.stringify(transactions) + ' for page: ' + page
    );

    return { transactions, total };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllTransactions(client) {
  try {
    const response = await client.get(`/expenses`);

    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpense(id, client) {
  try {
    const response = await client.get(`/expenses/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateExpense(data, client) {
  const { _id, ...valori } = data;
  try {
    const response = await client.patch(`/expenses/${_id}`, valori);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createExpense(data, client) {
  try {
    const response = await client.post('/expenses', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteExpense(id, client) {
  try {
    await client.delete(`/expenses/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
