import axios, { Axios, AxiosError } from 'axios'

const base = axios.create({
    baseURL: 'http://localhost:9000/user',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const authApi = {
    setPicture: async (id: string | null) => {
        try {
            const response = await base.post('setpictureforuser', { id })
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err)
                //@ts-ignore
                throw new Error(err.response?.data.msg)
            } else {
                throw new Error('Something went wrong')
            }
        }
    },
    logout: async () => {
        try {
            const response = await base.get('logout')
            console.log(response)
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) {
                //@ts-ignore
                throw new Error(err.response?.data.msg)
            } else {
                throw new Error('Something went wrong')
            }
        }
    },
    auth: async () => {
        try {
            const response = await base.get('auth')
            console.log(response)
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) {
                //@ts-ignore
                throw new Error(err.response?.data.msg)
            } else {
                throw new Error('Something went wrong')
            }
        }
    },
    createUser: async (username: string, password: string) => {
        try {
            const response = await base.post('create', { username, password })
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) {
                //@ts-ignore
                throw new Error(err.response?.data.msg)
            } else {
                throw new Error('Something went wrong')
            }
        }
    },
    login: async (username: string, password: string) => {
        try {
            const response = await base.post('login', { username, password })
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) {
                //@ts-ignore
                throw new Error(err.response?.data.msg)
            } else {
                throw new Error('Something went wrong')
            }
        }
    },
}

export default authApi
