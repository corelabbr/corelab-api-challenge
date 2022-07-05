const request = require('supertest')
const app = require('./RouteCars')

describe('Test My Routes', ()=>{

    it('Testing POST', ()=>{
        const res = await request(app)
        .post()
    })

})
