# User Guide
## Overview
The Multi-Branch Pipeline Analyzer helps users analyze CI/CD pipeline performance across different branches. It collects pipeline metrics and provides simple analytics through API endpoints.

This guide explains how to run and use the system.

## Prerequisites
Before running the project, make sure the following tools are installed:
- Docker
- Docker Compose
- Node.js
- Jenkins

## Cloning the Repository
Clone the repository using:
git clone <repository-url>
Navigate into the project folder:
cd pipeline-analyzer

## Running the Application
To start the backend services, run:
docker compose up --build
This command will start the Node.js API and MongoDB database inside Docker containers.

## Accessing the API
Once the containers are running, you can access the API using:
http://localhost:5000/api/pipeline
This endpoint returns all stored pipeline runs.

## Viewing Analytics
To analyze pipeline performance for a specific branch, use:
/api/pipeline/summary/:branch
Example:
http://localhost:5000/api/pipeline/summary/main

This endpoint returns statistics such as total runs, success rate, and average build time.