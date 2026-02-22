import { API_URL } from "./utils"

const request = async (url, options) => {
    const result = await fetch(url, options);
    const data = await result.json();

    if (!result.ok || !data?.success) {
        throw new Error(data?.message || 'Request failed');
    }

    return data;
}

export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    return request(url, options);
}
export const GetAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return request(url, options);
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return request(url, options);
}


export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    return request(url, options);
}
