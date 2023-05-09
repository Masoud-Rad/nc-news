const request = require("supertest");
const app = require("../app")
const connection = require("../db/connection")
const seed = require("../db/seeds/seed")

const devData = require('../db/data/test-data/index');




beforeEach(() => seed(devData))
afterAll(() => connection.end())



describe('/api/topics', () => {
    test("GET - status: 200 - respond with all the properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics.length).toBe(3);
          response.body.topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          })
        });
    });
})




// describe('/api/topics', () => {
//     test("GET - status: 200 - respond with all the properties", () => {
// expect(4).toBe(4)
//         // return request(app).get('/api/topics').expect(200).then(({body})=>{
//         //     console.log("in the test, body.topics:", body.topics)
//         //     expect(typeof body.topics).toBe('object')
//         //     body.topics.forEach((topic) => {
//         //         expect(typeof topic.slug).toBe("string");
//         //         expect(typeof topic.description).toBe("string");
//         //          })
            
//         // })
//     })

// })

          
         