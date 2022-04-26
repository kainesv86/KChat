export interface User {
        email: string;
        id: string;
        username: string;
        name: string;
        description: string;
        avatarUrl: string;
}

export enum RelationshipStatus {
        NONE = "NONE",
        FRIEND = "FRIEND",
        BLOCK = "BLOCK",
        PENDING = "PENDING",
}
