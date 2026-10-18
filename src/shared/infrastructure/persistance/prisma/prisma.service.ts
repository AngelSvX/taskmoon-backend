import { Inject, Injectable, Logger } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "generated/prisma/client";
import prismaConfig from "../../config/prisma.config";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(
        @Inject(prismaConfig.KEY)
        configuration: ConfigType<typeof prismaConfig>,
    ) {
        const adapter = new PrismaMariaDb({
            host: configuration.databaseHost,
            user: configuration.databaseUser,
            password: configuration.databasePassword,
            database: configuration.databaseName,
            port: parseInt(configuration.databasePort || '2121'),
        })

        const logger = new Logger('PrismaService')

        super({ adapter })

    }
}