# Bootree Users API

Bootree Users API is a microservice for handling user authentication and registration, including JWT-based authentication and OpenAPI documentation.

## Overview

This project provides an API for user registration, login, and authentication, with JWT-based security and Swagger documentation.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ecuation/bootree-users users
    cd users
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    MONGO_URI=your_mongo_uri
    MODERATION_ACTIVE=true
    ```

## Tests

All endpoints have test for happy paths and unhappy paths, you can run tests by the following command

1. 
    ```sh
    npm run test
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints documentation (Swagger)

There is swagger documentation in path to view an test endpoints [here](http://bootree.test/api/users/api-docs)

## Diagrams

Architecture and API Figma diagrams [here](https://www.figma.com/deck/kClBxJfOraS0cWa2JjpLCS/Building-a-scalable-microservices-architecture-presentation?node-id=1-1053&t=EVK31kJ8Xx8vq604-1)