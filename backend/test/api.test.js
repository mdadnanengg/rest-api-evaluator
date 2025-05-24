import request from "supertest";
import app from "../server";
import mongoose from "mongoose";

describe("API Evaluator", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/api-evaluator-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should evaluate Petstore API", async () => {
    const res = await request(app)
      .post("/api/evaluate")
      .send({ oasUrl: "https://petstore.swagger.io/v2/swagger.json" });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.summary).toBeDefined();
    expect(res.body.logs.length).toBeGreaterThan(0);
  });

  it("should handle invalid OAS URL", async () => {
    const res = await request(app)
      .post("/api/evaluate")
      .send({ oasUrl: "invalid-url" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});