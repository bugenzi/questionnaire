import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
    @Input()
    desc: string = '';

    @Input()
    title: string = '';

    @Input()
    username: string = '';

    @Input()
    points!: number;

    @Input()
    created_at: string = '';

    @Input()
    userId: string = '';

    @Input()
    id!: number;

    like = this.points;
    likeActive: boolean = false;
    dislikeActive: boolean = false;
    constructor(private postService: PostService) {}
    setDislike() {
        this.dislikeActive = !this.dislikeActive;
        this.points = this.dislikeActive ? this.points - 1 : this.points + 1;
        this.postService.handlePostLike(this.id, this.points).subscribe(res => console.log(res));
    }
    setLike() {
        this.likeActive = !this.likeActive;
        this.points = this.likeActive ? this.points + 1 : this.points - 1;
        this.postService.handlePostLike(this.id, this.points).subscribe(res => console.log(res));
    }

    handleLike() {
        if (this.dislikeActive) {
            this.setLike();
            this.setDislike();
        }
        this.setLike();
    }

    handleDislike() {
        if (this.likeActive) {
            this.setDislike();
            this.setLike();
        }
        this.setDislike();
    }

    ngOnInit(): void {}
}
