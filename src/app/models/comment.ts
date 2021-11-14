export class Comments {
    desc!: string;
    id!: number;
    username!: string;
    postId!: number;
    userId!: number;
    created_at = Date();
    points: number = 0;
}
