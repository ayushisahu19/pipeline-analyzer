const request = require("supertest");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/api/pipeline", (req, res) => {
  res.status(201).json({ message: "Pipeline run created" });
});

describe("Pipeline API Integration Tests", () => {

  test("POST /api/pipeline should create pipeline run", async () => {

    const res = await request(app)
      .post("/api/pipeline")
      .send({
        branch: "main",
        buildTime: 120,
        status: "SUCCESS"
      });

    expect(res.statusCode).toBe(201);

  });

});