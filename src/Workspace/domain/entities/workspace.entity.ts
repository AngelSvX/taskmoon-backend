export enum WorkspaceStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived'
}

export type WorkspacePrimitives = Readonly<{
    id: number,
    owner_id: number,
    name: string,
    description: string,
    icon: string,
    slug: string,
    status: WorkspaceStatus
    settings: string,
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
}>

export class Workspace {
    private constructor(
        readonly id: number,
        readonly owner_id: number,
        readonly name: string,
        readonly description: string,
        readonly icon: string,
        readonly slug: string,
        readonly status: WorkspaceStatus,
        readonly settings: string,
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly deleted_at: Date | null,
    ){}

    static fromPrimitives(props: WorkspacePrimitives): Workspace {
        return new Workspace(
            props.id,
            props.owner_id,
            props.name,
            props.description,
            props.icon,
            props.slug,
            props.status,
            props.settings,
            new Date(props.created_at),
            new Date(props.updated_at),
            props.deleted_at ? new Date(props.deleted_at) : null,
        )
    }

    toPrimitives(): WorkspacePrimitives {
        return {
            id: this.id,
            owner_id: this.owner_id,
            name: this.name,
            description: this.description,
            icon: this.icon,
            slug: this.slug,
            status: this.status,
            settings: this.settings,
            created_at: this.created_at.toISOString(),
            updated_at: this.updated_at.toISOString(),
            deleted_at: this.deleted_at?.toISOString() ?? null,
        }
    }

    static create(props: {owner_id: number, name: string, slug: string, description: string, icon: string}): Workspace {
        return new Workspace(
            0,
            props.owner_id,
            props.name,
            props.description,
            props.icon,
            props.slug,
            WorkspaceStatus.ACTIVE,
            'default',
            new Date(),
            new Date(),
            null,
        )
    }

    active(): Workspace {
        if (this.status === WorkspaceStatus.ACTIVE) {
            throw new Error('Workspace already active')
        }
        return this.withStatus(WorkspaceStatus.ACTIVE)
    }

    archive(): Workspace {
        if (this.status === WorkspaceStatus.ARCHIVED) {
            throw new Error('Workspace already archived')
        }
        return this.withStatus(WorkspaceStatus.ARCHIVED)
    }

    update(props: {name?: string, description?: string, icon?: string}): Workspace {
        return new Workspace(
            this.id,
            this.owner_id,
            props.name ?? this.name,
            props.description ?? this.description,
            props.icon ?? this.icon,
            this.slug,
            this.status,
            this.settings,
            this.created_at,
            new Date(),
            this.deleted_at
        )
    }

    private withStatus(status: WorkspaceStatus): Workspace {
        return new Workspace(
            this.id,
            this.owner_id,
            this.name,
            this.description,
            this.icon,
            this.slug,
            status,
            this.settings,
            this.created_at,
            new Date(),
            this.deleted_at
        )
    }

    get Id(): number {
        return this.id;
    }
    get OwnerId(): number {
        return this.owner_id;
    }
    get Name(): string {
        return this.name;
    }
    get Description(): string {
        return this.description;
    }
    get Icon(): string {
        return this.icon;
    }
    get Slug(): string {
        return this.slug;
    }
    get Status(): WorkspaceStatus {
        return this.status;
    }
    get Settings(): string {
        return this.settings;
    }
    get CreatedAt(): Date {
        return this.created_at;
    }
    get UpdatedAt(): Date {
        return this.updated_at;
    }
    get DeletedAt(): Date | null {
        return this.deleted_at;
    }

}