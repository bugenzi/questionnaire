import { Ipost } from './post.model';

// Domain model
export class Post implements Ipost {
    id = 0;
    username = '';
    title = '';
    desc = '';
    comments = [];
}
