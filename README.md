## Getting Started

Before running the application, please ensure you have the following setup:

1. API Key Configuration
To use the application, you will need to obtain a TMDB API key from https://www.themoviedb.org/settings/api. Once you have obtained the key, create a new file named .env in the root of the project and add the following line, replacing <YOUR_API_KEY> with your actual API key:

```bash
TMDB_API_KEY=<YOUR_API_KEY>
```

2. Building the Docker Image
To build the Docker image, navigate to the project root and run the following command:

```bash
docker build -t glance-care .
```
This will create a Docker image with the name glance-care.

3. Running the Container
To run the container, use the following command:

```bash
docker run --env-file .env glance-care
```
This will start a new container from the glance-care image, using the environment variables defined in the .env file.