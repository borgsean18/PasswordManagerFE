# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# The build process will use environment variables from .env
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Set environment variable for the backend URL
# This can be overridden at runtime with docker run -e
# For Mac/Windows, host.docker.internal points to the host machine
# For Linux, you might need to use the host's IP address
ENV NEXT_PUBLIC_BACKEND_URL=http://host.docker.internal:3001

# Define the command to run your app
CMD ["npm", "start"]