const request = require("supertest");
const app = require("../app")
const connection = require("../db/connection")
const seed = require("../db/seeds/seed")

const devData = require('../db/data/test-data/index');
const { expect } = require("@jest/globals");




beforeEach(() => seed(devData))
afterAll(() => connection.end())



describe('incorect api/getApi', () => {
  test("GET - status: 404 - not exist", () => {
    return request(app)
      .get("/nonsence")
      .expect(404)
      .then((response) => { 
        expect(typeof response).toBe('object');
        expect(response.body.msg).toBe("Not Found!")
      });
  });
})       
describe('/api/getApi', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/getApi")
      .expect(200)
      .then((response) => { 
        expect(typeof response).toBe('object');
      });
  });
})

describe('/api/topics', () => {
    test("GET - status: 200 - respond with all the properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          response.body.topics.forEach((topic) => {
            expect(Object.keys(topic).length).toBe(2);
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          })
        });
    });
})

describe('/api/articles', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => { 

        response.body.articles.forEach((article) => {
          expect(Object.keys(article).length).toBe(8);
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect( article.hasOwnProperty('body')).toBe(false);
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.comment_count).toBe("string");
        })
      });
    })
      
        test("GET - status: 200 - respond with all the properties", () => {
      
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => { 
              expect(response.body.articles).toBeSortedBy("created_at", { descending: true})
            })
      })
 
    test("GET - status: 200 - respond with all the properties", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then((response) => { 
  
          response.body.articles.forEach((article) => {
            expect(Object.keys(article).length).toBe(8);
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(article.topic).toBe("mitch");
            expect(typeof article.author).toBe("string");
            expect( article.hasOwnProperty('body')).toBe(false);
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.comment_count).toBe("string");
          })
        });
    });

    test("GET - status: 200 - respond with all the properties", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then((response) => { 
  
          response.body.articles.forEach((article) => {
            
            expect(article.topic).toBe("cats");
            
          })
        });
    });

    test("GET - status: 200 - check is result is sorted", () => {
      
      return request(app)
        .get("/api/articles?topic=mitch&sort_by=title&order_by=ASC")
        .expect(200)
        .then((response) => { 
          expect(response.body.articles).toBeSortedBy("title", { ascending: true, coerce: false})
        })
      })

      test("GET - status: 400 - Bad request", () => {
      
        return request(app)
          .get("/api/articles?topic=mitch&sort_by=id&order_by=ASC")
          .expect(400)
          .then((response) => { 
            expect(response.body.msg).toBe("Bad request")
          })
        })
})


describe('/api/articles/:article_id', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => { 
        
          expect(Object.keys(response.body.article).length).toBe(9);
          expect(typeof response.body.article.title).toBe("string");
          expect(typeof response.body.article.topic).toBe("string");
          expect(typeof response.body.article.author).toBe("string");
          expect(typeof response.body.article.body).toBe("string");
          expect(typeof response.body.article.created_at).toBe("string");
          expect(typeof response.body.article.votes).toBe("number");
          expect(typeof response.body.article.comment_count).toBe("string");
      });
  });

  test("GET - status: 404 - respond with Not Found!", () => {
    return request(app)
      .get("/api/articles/nnnn")
      .expect(404)
      .then((response) => { 
        expect(typeof response).toBe('object');
        expect(response.body.msg).toBe("Not Found!")
      });
  });
})



     
describe("POST-comment >>> /api/articles/:article_id/comments", () => {
  test('POST- status: 201- responds with the added comment', () => {
      const newComment = {
          "body": "this is my test_add_comment body",
          "username": "rogersop"
      }
      return request(app)
          .post('/api/articles/5/comments')
          .send(newComment).expect(201).then(({ body }) => {
            expect(body.addedComment.author).toBe("rogersop");

          })
   })

   test('POST- status: 203- responds with Non-Authoritative Information', () => {

    const newComment = {
        "body": "this is my test_add_comment body",
        "username": "Mas"
    }
    return request(app)
        .post('/api/articles/5/comments')
        .send(newComment)
        .expect(203)
        .then(({ body }) => {
           expect(body.msg).toBe("Non-Authoritative Information");

        })
})
})



describe("PATCH-Article >>> /api/articles/:article_id", () => {
  test('PATCH- status: 202- responds with the updated article', () => {
      const votesUpdate = { inc_votes : 1 };
      return request(app)
          .patch('/api/articles/2')
          .send(votesUpdate).expect(202).then(({ body }) => {
            expect(body.updatedArticle.votes).toBe(1);

          })
   })
   test('PATCH- status: 202- responds with the updated article', () => {
    const votesUpdate = { inc_votes : -5 };
    return request(app)
        .patch('/api/articles/1')
        .send(votesUpdate).expect(202).then(({ body }) => {
          expect(body.updatedArticle.votes).toBe(95);

        })
 })

   test('PATCH- status: 404 - respond with Not Found!"', () => {
    const votesUpdate = { inc_votes : -5 };
    return request(app)
        .post('/api/articles/nonsense')
        .send(votesUpdate)
        .expect(404)
        .then(({ body }) => {
           expect(body.msg).toBe("Not Found!");

        })
})

})


describe('DELETE - >>>> /api/comments/:comment_id ', () => {
  test("DELETE - status: 204 , respond with no content", () => {
    return request(app)
    .delete("/api/comments/1")
      .expect(204)
      .then((response) => { 
        expect(typeof response).toBe('object');
      });
  });

  test("DELETE - status: 404 , respond with Not Found", () => {
    return request(app)
    .delete("/api/comments/nonesense")
      .expect(404)
      .then((response) => { 
        expect(response.body.msg).toBe("Not Found!")
      });
  });

  test("DELETE - status: 404 , respond with Not Found", () => {
    return request(app)
    .delete("/api/comments/999999")
      .expect(404)
      .then((response) => { 
        expect(response.body.msg).toBe("Not Found!")
      });
  });
}) 

describe('/api/users', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        response.body.users.forEach((user) => {
          expect(Object.keys(user).length).toBe(3);
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        })
      });
  });

  test("GET - status: 200 - respond with a user", () => {
    return request(app)
      .get("/api/users?username=tickle122")
      .expect(200)
      .then((response) => {
        
          expect(Object.keys(user).length).toBe(3);
          expect(typeof response.body.user.username).toBe("string");
          expect(typeof response.body.user.name).toBe("string");
          expect(typeof response.body.user.avatar_url).toBe("string");

      });
  });
})
