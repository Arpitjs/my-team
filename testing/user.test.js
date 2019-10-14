const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', (done) => {
    request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
    .end((err, res) => {
        if (err) throw err;
        done();
      })
})