const request = require("supertest");
const app = require("../../app");
describe("Test GET/launches", () => {
  test("it should respond with 200 sucess code", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST/launches", () => {
  test("it should respond with 200 sucess code", () => {});
  test("it should check missing properties", () => {});
  test("it should check invalid dates", () => {});
});
