const app = require('../src/app')
const knex = require('knex')

describe.only('Users service', function() {
    let db

    const testUsers = [{
        id: 1,
        user_name: 'bmtron',
        full_name: 'Brendan',
        password: 'g'
    },
    {
        id: 2,
        user_name: 'tmitch',
        full_name: 'Tyler',
        password: 'r'
    }
]
    before('make knex instance', () => {    
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db.raw(`TRUNCATE theater_users, theater_rooms, theater_user_access RESTART IDENTITY CASCADE`))

    afterEach('cleanup', () => db.raw(`TRUNCATE theater_users, theater_rooms, theater_user_access RESTART IDENTITY CASCADE`))

    describe('GET /api/users', () => {
        context('there are no users', () => {
            it('returns 200 and []', () => {
                return supertest(app)
                .get('/api/users')
                .expect(200, [])
            })
        })
        context('there are users in the db', () => {
            beforeEach('add users to db', () => db.into('theater_users').insert(testUsers))
            it(`responds 200 with a list of users`, () => {
                return supertest(app)
                .get('/api/users')
                .expect(200, testUsers)
            })
        })
    })
})