import axios, { Axios, AxiosError } from 'axios'

const base = axios.create({
    baseURL: 'http://localhost:9000/picture',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const pictureApi = {
    getPictures: async () => {
        try {
            const response = await base.get('get')
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
    setPicture: async (id: string) => {
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
}

export default pictureApi
