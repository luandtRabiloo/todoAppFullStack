import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.10.245:5001/api';

const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    // navigation.navigate('Auth');
};
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });
        console.log('response', response.status);
        if (response.status === 401) {
            const refreshSuccess = await refreshAccessToken();
            console.log({ refreshSuccess });
            if (refreshSuccess) {
                // Retry request với token mới
                const newAccessToken = await AsyncStorage.getItem('accessToken');
                console.log({ newAccessToken });
                const retryHeaders = {
                    ...headers,
                    Authorization: `Bearer ${newAccessToken}`,
                };

                const retryResponse = await fetch(url, {
                    ...options,
                    headers: retryHeaders,
                });

                if (!retryResponse.ok) {
                    throw new Error('Request failed after token refresh');
                }

                return await retryResponse.json();
            } else {
                // Refresh token thất bại - đăng xuất user
                await handleLogout();
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Xử lý response rỗng (như DELETE)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Refresh access token
const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log({ refreshToken });
        if (!refreshToken) {
            return false;
        }

        const response = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });
        console.log({ response });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        console.log(data);
        // Lưu token mới
        await AsyncStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
            await AsyncStorage.setItem('refreshToken', data.refreshToken);
        }

        return true;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};

export const getTodos = async ({
    page = 1,
    limit = 10,
    filter = 'today',
}: {
    page?: number;
    limit?: number;
    filter?: 'today' | 'all' | 'week' | 'month';
}) => {
    return await fetchWithAuth(`${API_URL}/tasks?filter=${filter}&page=${page}&limit=${limit}`, {
        method: 'GET',
    });
};

export const getTodoById = async (id: string) => {
    return await fetchWithAuth(`${API_URL}/tasks/${id}`, { method: 'GET' });
};

export const createTodo = async ({
    title,
    completed = false,
    subTitle,
}: {
    title: string;
    completed?: boolean;
    subTitle: string;
}) => {
    return await fetchWithAuth(`${API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title, completed, subTitle }),
    });
};

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
    return await fetchWithAuth(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, title, completed, subTitle }),
    });
};

export const deleteTodo = async (id: string) => {
    const response = await fetchWithAuth(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    return response.ok || response.status === 204;
};
// SIGNUP
export const signUp = async ({
    username,
    email,
    password,
    phone,
}: {
    username: string;
    email: string;
    password: string;
    phone: string;
}) => {
    try {
        const response = await fetch(`${API_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                phone,
            }),
        });

        // Kiểm tra status code
        if (response.status === 204) {
            return { success: true, message: 'Đăng ký thành công' };
        }

        const data = await response.json();

        // Xử lý các trường hợp lỗi
        if (response.status === 400) {
            throw new Error(data.massage || 'Thiếu dữ liệu');
        }

        if (response.status === 409) {
            throw new Error(data.massage || 'Username đã tồn tại');
        }

        if (response.status === 500) {
            throw new Error(data.message || 'Lỗi hệ thống');
        }

        return data;
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error;
    }
};
//SIGNIN
export const signIn = async ({ username, password }: { username: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.status === 400) {
            throw new Error(data.massage || 'Thiếu username hoặc password');
        }

        if (response.status === 401) {
            throw new Error(data.massage || 'Sai username hoặc password');
        }

        if (response.status === 500) {
            throw new Error(data.message || 'Lỗi hệ thống');
        }

        if (!response.ok) {
            throw new Error('Đăng nhập thất bại');
        }

        // Trả về accessToken và refreshToken
        return {
            success: true,
            message: data.message,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        console.error('=== LỖI TRONG SIGNIN FUNCTION ===', error);
        throw error;
    }
};
export const signOut = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('Không tìm thấy refresh token');
        }

        const response = await fetch(`${API_URL}/auth/sign-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        console.log('=== signOut Response Status ===', response.status);

        // Xóa tokens khỏi AsyncStorage
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');

        if (response.status === 204 || response.ok) {
            return { success: true, message: 'Đăng xuất thành công' };
        }

        const data = await response.json();

        if (response.status === 400) {
            throw new Error(data.message || 'Thiếu refresh token');
        }

        if (response.status === 500) {
            throw new Error(data.message || 'Lỗi hệ thống');
        }

        throw new Error('Đăng xuất thất bại');
    } catch (error) {
        console.error('=== signOut ERROR ===', error);

        // Vẫn xóa tokens local nếu có lỗi
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');

        throw error;
    }
};
