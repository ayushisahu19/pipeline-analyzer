
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
 
const app = require("../src/app");
const PipelineRun = require("../src/models/PipelineRun");
 
let mongod;
 
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});
 
afterEach(async () => {
  // keep test cases independent of each other
  await PipelineRun.deleteMany({});
});
 
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
 
describe("POST /api/pipeline (real app + real DB)", () => {
  test("creates a pipeline run and persists it to MongoDB", async () => {
    const res = await request(app)
      .post("/api/pipeline")
      .send({
        branch: "main",
        buildTime: 120,
        status: "SUCCESS",
        vulnerabilities: 2,
      });
 
    expect(res.statusCode).toBe(201);
    expect(res.body.branch).toBe("main");
 
    // confirm it actually landed in the database, not just the response
    const saved = await PipelineRun.findOne({ branch: "main" });
    expect(saved).not.toBeNull();
    expect(saved.buildTime).toBe(120);
    expect(saved.status).toBe("SUCCESS");
  });
 
  test("rejects a run missing required fields", async () => {
    const res = await request(app)
      .post("/api/pipeline")
      .send({ branch: "main" }); // missing buildTime and status
 
    // schema marks buildTime/status as required, so this should fail, not 201
    expect(res.statusCode).toBe(500);
  });
});
 
describe("GET /api/pipeline/summary/:branch (real app + real DB)", () => {
  test("computes success rate and average build time from real data", async () => {
    await PipelineRun.create([
      { branch: "dev", buildTime: 100, status: "SUCCESS" },
      { branch: "dev", buildTime: 200, status: "FAILED" },
      { branch: "dev", buildTime: 300, status: "SUCCESS" },
    ]);
 
    const res = await request(app).get("/api/pipeline/summary/dev");
 
    expect(res.statusCode).toBe(200);
    expect(res.body.totalRuns).toBe(3);
    expect(res.body.successRate).toBeCloseTo((2 / 3) * 100, 1);
    expect(res.body.averageBuildTime).toBeCloseTo(200, 1);
  });
 
  test("returns zeroed summary for a branch with no runs", async () => {
    const res = await request(app).get("/api/pipeline/summary/nonexistent");
 
    expect(res.statusCode).toBe(200);
    expect(res.body.totalRuns).toBe(0);
    expect(res.body.successRate).toBe(0);
  });
});