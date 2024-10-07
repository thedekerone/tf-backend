# Project Name

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Running Prisma

To set up and run Prisma, follow these steps:

1. Install the Prisma CLI as a development dependency:

    ```bash
    npm install @prisma/cli --save-dev
    ```

2. Initialize Prisma in your project:

    ```bash
    npx prisma init
    ```

3. Configure your database connection in the `prisma/.env` file. Here is an example of the default environment variable:
  ```env
        DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
        ```
  Replace the connection string with your own database connection URL.

4. Generate Prisma Client:

    ```bash
    npx prisma generate
    ```

5. Run Prisma migrations to set up your database schema:

    ```bash
    npx prisma migrate dev --name init
    ```

7. Run Prisma Studio to explore your database:

    ```bash
    npx prisma studio


