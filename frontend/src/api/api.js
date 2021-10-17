import axios from 'axios';


export const saveUserData = async data => {
    const response = await axios.post('http://localhost:8000/api/user/', data);

    return response.data;
};

export const getUserData = async id => {
    const response = await axios.get(`http://localhost:8000/api/${id}/user`);

    return response.data;
};

export const updateUserData = async (id, updatedData) => {
    const response = await axios.put(`http://localhost:8000/api/${id}/user`, updatedData);

    return response.data;
};

export const userLogin = async data => {
    const response = await axios.post('http://localhost:8000/api/login/', data);

    return response.data;
}