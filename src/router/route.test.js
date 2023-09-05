import app from '../app.js'
import request from 'supertest'

describe('Topic Route test', () => {
    test('GET /topics', async () => {
        const res = await request(app).get('/topics')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body).toBeDefined()
    })
})

describe('Get topic by topic and level route test', () => {
    test('GET /topics/Coding/2', async () => {
        const res = await request(app).get('/topics/Coding/2')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body.topicLevel).toBe(2)
        expect(res.body.topicName).toBe("Coding")
        expect(res.body.topicID).toBe(4)
    })
})

describe('Get user Ronald route', () => {
    test('GET /user/Ronald', async () => {
        const res = await request(app).get('/user/Ronald')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body.roles.User).toBe(7777)
        expect(res.body.roles.Admin).toBe(2121)
        expect(res.body.username).toBe('Ronald')
    })
})

describe('Videos route test', () => {
    test('GET /videos', async () => {
        const res = await request(app).get('/videos')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body).toBeDefined()
    })
})

describe('Questions route test', () => {
    test('GET /questions', async () => {
        const res = await request(app).get('/questions')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
        expect(res.body).toBeDefined()
    })
})

describe('POST /register', () => {
    test('should try create a new user but return a 409', async () => {
      const postData = {user: 'testUser', pwd: 'password'}
  
      const response = await request(app)
        .post('/register')
        .send(postData)
        .expect(409)
        // we expect a 409 because the testUser is already registered
    });
  });

  describe('POST /login', () => {
    test('should log the user in and return an accessToken', async () => {
      const postData = {user: 'testUser', pwd: 'password'}
  
      const response = await request(app)
        .post('/login')
        .send(postData)
        .expect(200)

        expect(response.body.accessToken).toBeDefined()
    });
  });

  describe('POST /questions', () => {
    test('Data should save successfully', async () => {
     const postData = {topic: 'testTopic', level: 3, question: 'testQuestion?', options: ["testAnswer", "testytest", "testicle", "testerino"], answer: "testAnswer"}

     const res = await request(app)
     .post('/questions')
     .send(postData)
     .expect(200)

     expect(res.body.msg).toBe("Data Saved Successfully...!")
    })
  })

  describe('PUT /levelup/:username', () => {
    test('Returns updated levels successfully', async () => {
        const putData = {"codingLevel": 2, "geographyLevel": 3, "napoleonLevel": 9}

        const res = await request(app)
        .put('/levelup/testUser')
        .send(putData)
        .expect(200)

        expect(res.body.userStats.codingLevel).toBe(2)
        expect(res.body.userStats.geographyLevel).toBe(3)
        expect(res.body.userStats.napoleonLevel).toBe(9)
    })
  })

  describe('PUT /videos/:id', () => {
    test('Returns updated video and success msg', async () => {
        const putData = {"topic": "Geography", "level": 1, "link": "https://www.youtube.com/embed/dQw4w9WgXcQ", "videoTitle": "Geography is Awesome!!"}
    
        const res = await request(app)

        .put('/videos/64f6d09b23ccf981e873d0f2')
        .send(putData)
        .expect(200)

        expect(res.body.msg).toBe('Video updated successfully')
    })
  })