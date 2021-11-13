// Domain model
export class Post {
    id?: number;
    userId!: number;
    username!: string;
    title!: string;
    desc!: string;
    points: number = 0;
    created_at!: string;
    comments?: [];
}
