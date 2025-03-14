# Password Manager Frontend

A secure password manager frontend built with Next.js.

## Features

- User authentication (login/register)
- Password management (create, read, update, delete)
- Password strength indicators
- Password generation
- Search and filter passwords
- Group passwords by category

## Running with Docker

### Using Docker Compose

```bash
# Build and start the frontend container
docker-compose up -d

# View logs
docker-compose logs -f
```

### Connecting to Your Backend

By default, the frontend will try to connect to a backend at `http://host.docker.internal:3001`. This works for backends running on your host machine (outside Docker).

To connect to your backend running in a different Docker container or on another server:

1. **Using environment variables when starting the container:**

```bash
# For Docker run
BACKEND_URL=http://your-backend-url:3001 ./run.sh start

# For Docker Compose
BACKEND_URL=http://your-backend-url:3001 ./run.sh compose
```

2. **Using Docker networks:**

If your backend is running in Docker, you can create a shared network:

```bash
# Create a shared network (do this once)
docker network create password-manager-network

# In your backend's docker-compose.yml, add:
networks:
  default:
    external:
      name: password-manager-network

# Then in this project's docker-compose.yml, modify:
networks:
  frontend-network:
    external:
      name: password-manager-network
```

Then update the `NEXT_PUBLIC_BACKEND_URL` to use the backend service name.

### Using Docker Only (Frontend)

```bash
# Build the image
docker build -t password-manager-frontend .

# Run the container
docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:3001 password-manager-frontend
```

Replace `http://your-backend-url:3001` with the actual URL of your backend service.

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
