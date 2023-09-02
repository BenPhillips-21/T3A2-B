import app from '../app.js'

describe('GET /topics', () => {
    let res

    beforeAll(async () => {
        res = await app.get('/topics')
    })
})