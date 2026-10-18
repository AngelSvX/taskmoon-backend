import { SLUG_REPOSITORY } from "src/shared/domain/repository/SlugRepository";
import { SlugifyService } from "./slugify/slugify.service";

export const SlugProvider = {
    provide: SLUG_REPOSITORY,
    useClass: SlugifyService,
};
