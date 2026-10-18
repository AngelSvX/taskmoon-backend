export interface SlugRepository {
    generate(text: string): string;
}

export const SLUG_REPOSITORY = Symbol('SLUG_REPOSITORY');
