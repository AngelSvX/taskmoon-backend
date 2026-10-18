import { Module } from "@nestjs/common";
import { SlugProvider } from "./slug.provider";

@Module({
    exports: [SlugProvider],
    providers: [SlugProvider]
})

export class SlugModule {}
