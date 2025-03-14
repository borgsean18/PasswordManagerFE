#!/bin/bash

# Function to display help message
show_help() {
  echo "Usage: ./run.sh [option]"
  echo "Options:"
  echo "  dev         - Run in development mode"
  echo "  build       - Build the Docker image"
  echo "  start       - Start the Docker container"
  echo "  compose     - Start with Docker Compose (frontend and backend)"
  echo "  stop        - Stop Docker containers"
  echo "  help        - Show this help message"
}

# Check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
  fi
}

# Check if Docker Compose is installed
check_docker_compose() {
  if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
  fi
}

# Run in development mode
run_dev() {
  echo "Starting in development mode..."
  npm run dev
}

# Build Docker image
build_docker() {
  check_docker
  echo "Building Docker image..."
  docker build -t password-manager-frontend .
}

# Start Docker container
start_docker() {
  check_docker
  echo "Starting Docker container..."
  # Use host.docker.internal to connect to services running on the host machine
  # For Linux, you might need to use the host's IP address
  docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_URL=${BACKEND_URL:-http://host.docker.internal:3001} password-manager-frontend
}

# Start with Docker Compose
start_compose() {
  check_docker_compose
  echo "Starting with Docker Compose..."
  # You can override the backend URL in docker-compose.yml by setting an environment variable
  # Example: BACKEND_URL=http://192.168.1.100:3001 ./run.sh compose
  if [ ! -z "$BACKEND_URL" ]; then
    export NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL
    echo "Using backend URL: $NEXT_PUBLIC_BACKEND_URL"
  fi
  docker-compose up -d
}

# Stop Docker containers
stop_docker() {
  check_docker
  echo "Stopping Docker containers..."
  docker-compose down
}

# Main script logic
case "$1" in
  dev)
    run_dev
    ;;
  build)
    build_docker
    ;;
  start)
    start_docker
    ;;
  compose)
    start_compose
    ;;
  stop)
    stop_docker
    ;;
  help|*)
    show_help
    ;;
esac 