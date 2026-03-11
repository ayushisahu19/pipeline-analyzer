# Project Plan

## Project Title
Multi-Branch Pipeline Analyzer

## Introduction
Continuous Integration and Continuous Deployment (CI/CD) pipelines run automatically whenever developers push code changes. These pipelines generate useful data such as build duration, success or failure status,& testing results. However, this data is often scattered across build logs and is not easy to analyze.

The goal of this project is to build a system that collects and analyzes pipeline metrics from Jenkins multibranch pipelines and provides useful insights about branch performance.

## Objectives
The main objectives of this project are:
- Implement a Jenkins Multibranch Pipeline connected to a GitHub repository
- Automatically build and test code whenever changes are pushed
- Collect pipeline execution metrics such as build time and build status
- Store pipeline metrics in a MongoDB database
- Provide API endpoints that allow analysis of pipeline performance across branches

## Scope of the Project
This project focuses on monitoring CI/CD pipeline performance across multiple branches. The system collects pipeline metrics and allows users to view analytics such as:
- Total pipeline runs for a branch
- Success rate of builds
- Average build time

The project demonstrates how DevOps practices can be used to automate development workflows and analyze system performance.

## Project Timeline
Stage 1  
- Setup the Node.js application  
- Create basic API endpoints  
- Write initial tests  

Stage 2  
- Configure Jenkins locally  
- Implement Jenkins Multibranch Pipeline  
- Connect GitHub repository  

Stage 3  
- Implement pipeline metrics storage  
- Integrate MongoDB database  
- Create analytics endpoint  
