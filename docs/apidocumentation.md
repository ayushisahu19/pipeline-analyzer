# API Documentation

## Base URL

http://localhost:5000/api

## Create Pipeline Run

Endpoint:

POST /pipeline

Description:

This endpoint stores pipeline execution metrics sent by Jenkins.

Example request body:

{
  "branch": "main",
  "buildTime": 120,
  "status": "SUCCESS",
  "vulnerabilities": 0
}

## Get All Pipeline Runs

Endpoint:

GET /pipeline

Description:

Returns a list of all pipeline executions stored in the database.

Example response:

[
  {
    "branch": "main",
    "buildTime": 120,
    "status": "SUCCESS"
  }
]

## Get Branch Summary

Endpoint:

GET /pipeline/summary/:branch

Description:

Provides aggregated analytics for a specific branch.

Example request:

/pipeline/summary/main

Example response:

{
  "branch": "main",
  "totalRuns": 5,
  "successRate": 80,
  "averageBuildTime": 115
}