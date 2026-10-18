import { Injectable } from "@nestjs/common";
import slugify from 'slugify';
import { customAlphabet } from 'nanoid';
import { SlugRepository } from "src/shared/domain/repository/SlugRepository";

const randomSuffix = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8);

@Injectable()
export class SlugifyService implements SlugRepository {
    constructor () {}

    generate(text: string): string {
        const base = slugify(text, { lower: true, strict: true })
        return `${base}-${randomSuffix()}`
    }

}
