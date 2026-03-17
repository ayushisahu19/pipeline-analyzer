# Deployment Guide

## Overview

This document describes how to deploy the Multi-Branch Pipeline Analyzer using Docker.

The system consists of two main services:

- Node.js API
- MongoDB database

Both services are deployed using Docker containers.

## Requirements

Before deployment, make sure the following tools are installed:

- Docker
- Docker Compose

## Deployment Steps

Step 1: Clone the repository

git clone <repository-url>

Step 2: Navigate to the project folder

cd pipeline-analyzer

Step 3: Start the containers

docker compose up --build

Docker will build the application image and start the services.

## Verifying the Deployment

To verify the containers are running, use:

docker ps

You should see containers for the Node.js API and MongoDB.

## Accessing the Application

Once deployed, the API will be available at:

http://localhost:5000/api/pipeline
