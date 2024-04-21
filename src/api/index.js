import axios from 'axios';

const url = "https://backendnodejstzuzulcode.uw.r.appspot.com";

const instance = axios.create({
    baseURL: url
})

const getToken = () => {
    return localStorage.getItem("token");
}

const getWithToken = async (url) => {
    const token = getToken();
    if (token) {
        return await instance.get(url, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
    }
}

const post = async (url, data) => {
    return instance.post(url, data)
}

const postWithToken = async (url, data) => {
    const token = getToken();
    if (token) {
        return await instance.post(url, data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
    }

    return {
        data: {
            failed: true,
            message: "No tienes token"
        }
    }

}

const putWithToken = async (url, data) => {
    const token = getToken();
    if (token) {
        return await instance.put(url, data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
    }

    return {
        data: {
            failed: true,
            message: "No tienes token"
        }
    }

}

export default instance

export { getWithToken, post, postWithToken, putWithToken }