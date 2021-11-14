import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comment';
import { Notification } from 'src/app/models/notification';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
    id!: string | null;
    post!: Post;
    user!: User;
    commentForm!: FormGroup;
    comments!: any;
    constructor(
        // private fb: FormBuilder,
        private postService: PostService,
        private router: ActivatedRoute,
        private authService: AuthService,
        private datePipe: DatePipe,
        private notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.id = this.router.snapshot.paramMap.get('id');
        this.user = this.authService.currentUserValue;
        this.postService.getPostById(this.id!).subscribe((data: any) => {
            this.post = data[0];
            this.postService.getCommentsByPostId(this.post.id!).subscribe(
                res => {
                    console.log(this.post);
                    this.comments = res;
                },
                err => console.log(err),
            );
        });

        this.user = this.authService.currentUserValue;
        if (this.user !== null) {
            this.commentForm = new FormGroup({
                comment: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(120),
                ]),
            });
        }
    }
    postComment() {
        let commentData = new Comments();
        commentData.desc = this.commentForm.get('comment')!.value;
        commentData.username = this.user.username;
        commentData.userId = this.user.id;
        commentData.postId = this.post.id!;
        commentData.created_at = this.datePipe.transform(commentData.created_at, 'M/d/yy, h:mm a')!;

        let notificationData = new Notification();
        notificationData.created_at = commentData.created_at;
        notificationData.reciverId = this.post.userId;
        (notificationData.sender = this.user.username),
            (notificationData.message = `${notificationData.sender} wrote an answer on your post`);
        this.postService.postComment(commentData).subscribe(
            res => {
                this.notificationService
                    .saveNotification(notificationData)
                    .subscribe(data => console.log(data));
                this.getComments();
            },
            err => console.log(err),
        );
    }
    get comment() {
        return this.commentForm.get('comment')!;
    }
    getComments() {
        this.postService.getPostById(this.id!).subscribe((data: any) => {
            this.post = data[0];
            this.postService.getCommentsByPostId(this.post.id!).subscribe(
                res => {
                    console.log(this.post);
                    this.comments = res;
                },
                err => console.log(err),
            );
        });
    }
}
