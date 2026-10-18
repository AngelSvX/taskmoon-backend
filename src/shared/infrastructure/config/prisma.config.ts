import { registerAs } from "@nestjs/config";

export default registerAs('prisma', () => {
    return {
        databaseUrl: process.env.DATABASE_URL,
        databaseUser: process.env.DATABASE_USER,
        databasePassword: process.env.DATABASE_PASSWORD,
        databaseName: process.env.DATABASE_NAME,
        databaseHost: process.env.DATABASE_HOST,
        databasePort: process.env.DATABASE_PORT,
    }
})