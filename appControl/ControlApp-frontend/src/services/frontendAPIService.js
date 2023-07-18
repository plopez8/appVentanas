/* eslint-disable camelcase */
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_BACKEND;

const axiosInstance = axios.create({
    baseURL: `${API_URL}/api/`,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
    timeout: 15000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 426) {
                clearCache();
                window.location.reload(true);
            }
            /*             if (error.response.status === 401) {
                clearCache();
                window.location.reload(true);
            } */
        }
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('csrftoken');
        if (token)
            // eslint-disable-next-line no-param-reassign
            config.headers['X-CSRFToken'] = token;

        return config;
    },
    (error) => Promise.reject(error),
);

function clearCache() {
    localStorage.removeItem('csrftoken');
    if (caches) {
        caches.keys().then((names) => {
            names.map((m) => {
                caches.delete(m);
                return null;
            });
        });
    }
}

function getResOk(response) {
    if (
        response.statusText === 'OK' ||
        response.statusText === 'Created' ||
        response.status === 204
    ) {
        return {
            success: true,
            data: response.data,
        };
    }
    return {
        success: false,
        data: response.data,
    };
}

function getResError(error) {
    return {
        success: false,
        data: `${error?.response?.data?.error}: ${JSON.stringify(
            error?.response?.data?.detail,
        )}`,
    };
}

const login = async (email, password) => {
    let res;
    await axiosInstance
        .post('sessions/login/', {
            email,
            password,
        })
        .then((response) => {
            res = getResOk(response);
            getCSRF();
        })
        .catch((error) => {
            clearCache();
            res = getResError(error);
        });
    return res;
};

const getSession = async () => {
    let res;
    await axiosInstance
        .get('sessions/status/')
        .then((response) => {
            res = getResOk(response);
        })
        .catch((error) => {
            clearCache();
            res = getResError(error);
        });
    return res;
};

const getCSRF = async () => {
    let res;
    await axiosInstance
        .get('sessions/get-csrf/')
        .then((response) => {
            localStorage.setItem('csrftoken', response.headers['x-csrftoken']);
            res = { success: true, data: response.headers['x-csrftoken'] };
        })
        .catch((error) => {
            clearCache();
            res = getResError(error);
        });
    return res;
};

const logout = async () => {
    let res;
    await axiosInstance
        .get('sessions/logout/', {})
        .then((response) => {
            clearCache();
            res = getResOk(response);
        })
        .catch((error) => {
            res = getResError(error);
        });
    return res;
};
const getUsers = async () => {
    let res;
    await axiosInstance
        .get('users/', {})
        .then((response) => {
            clearCache();
            res = getResOk(response);
        })
        .catch((erorr) => {
            res = getResError(erorr);
        });
    return res;
};
const deleteUser = async (id) => {
    let res;
    await axiosInstance
        .delete(`users/${id}/deactivate`, {})
        .then((response) => {
            res = getResOk(response);
        })
        .catch((error) => {
            res = getResError(error);
        });
    return res;
};
const editUser = async (id, email, name, phone, surname) => {
    let res;
    await axiosInstance
        .put(`users/${id}/`, {
            name,
            surname,
            phone,
            email,
        })
        .then((response) => {
            res = getResOk(response);
        })
        .catch((error) => {
            res = getResError(error);
        });
    return res;
};

const register = async (email, idCard, name, phone, surname) => {
    let res;
    await axiosInstance
        .post('users/', {
            id_card: idCard,
            name,
            surname,
            phone,
            email,
        })
        .then((response) => {
            res = getResOk(response);
        })
        .catch((error) => {
            clearCache();
            res = getResError(error);
        });
    return res;
};


export const frontendApiService = {
    login,
    getSession,
    getCSRF,
    logout,
    register,
    getUsers,
    deleteUser,
    editUser,
    getUser,
};
