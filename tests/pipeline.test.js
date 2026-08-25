const request = require("supertest");
const express = require("express");

const app = express();

// Mock API endpoint
app.get("/api/pipeline", (req, res) => {
  res.status(200).json({ message: "Pipeline endpoint working" });
});

describe("Pipeline API Unit Tests", () => {
  test("GET /api/pipeline should return 200", async () => {
    const res = await request(app).get("/api/pipeline");
    expect(res.statusCode).toBe(200);
  });
});