# Troubleshooting Guide

## Jenkins Pipeline Not Triggering

If the pipeline does not start automatically, check the following:

- Ensure the GitHub repository is connected correctly
- Verify Jenkins Multibranch Pipeline configuration
- Confirm that branch indexing is enabled

## API Not Responding

If the API endpoint is not accessible:

1. Check if Docker containers are running

docker ps

2. Restart containers if needed

docker compose restart

## Database Connection Issues

If the backend cannot connect to MongoDB:

- Verify the MongoDB container is running
- Check the database connection string in the configuration file
- Ensure both services are part of the same Docker network

## Docker Build Errors

If Docker fails to build the image:

1. Stop running containers

docker compose down

2. Rebuild the containers

docker compose up --build

This usually resolves most build-related problems.