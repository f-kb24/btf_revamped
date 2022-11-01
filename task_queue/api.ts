import axios from 'axios'

const base = axios.create({
    baseURL: 'https://www.reddit.com/',
})

const redditApi = {
    getPictures: async () => {
        try {
            const response = await base.get('/r/pics/.json?jsonp=')
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
}

export { redditApi }
