const API_URL = 'http://192.168.10.245:5001/api';

export const getTodos = async ({
  page = 1,
  limit = 10,
  filter = 'today',
}: {
  page: number;
  limit: number;
  filter: 'today' | 'all' | 'week' | 'month';
}) => {
  try {
    const response = await fetch(
      `${API_URL}/tasks?filter=${filter}?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi lấy todos:', error);
    throw error;
  }
};

// GET - Lấy 1 todo theo ID
export const getTodoById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi lấy todo:', error);
    throw error;
  }
};

// POST - Tạo todo mới
export const createTodo = async ({
  title,
  completed = false,
  subTitle,
}: {
  title: string;
  completed?: boolean;
  subTitle: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed,
        subTitle,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi tạo todo:', error);
    throw error;
  }
};

// PUT - Cập nhật todo
export const updateTodo = async ({
  id,
  title,
  completed,
  subTitle,
}: {
  id: string | number;
  title?: string;
  completed?: boolean;
  subTitle?: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        completed,
        subTitle,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi cập nhật todo:', error);
    throw error;
  }
};

// DELETE - Xóa todo
export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Lỗi xóa todo:', error);
    throw error;
  }
};
