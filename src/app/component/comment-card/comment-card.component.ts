import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.html',
    styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
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
    userId!: number;

    @Input()
    id!: number;
    constructor(
        private postService: PostService,
        private datePipe: DatePipe,
        private notificationService: NotificationService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.currentUser;
        this.authUser = this.authService.currentUserValue;
        if (this.authUser) {
            this.notificationData.sender = this.authUser.username;
            this.notificationData.reciverId = this.userId;
        }
    }
    isLoggedIn$!: Observable<User>;
    authUser!: User;
    notificationData = new Notification();
    like = this.points;
    likeActive: boolean = false;
    dislikeActive: boolean = false;

    setDislike() {
        this.dislikeActive = !this.dislikeActive;
        this.points = this.dislikeActive ? this.points - 1 : this.points + 1;
        this.postService.handleCommentLike(this.id, this.points).subscribe();
    }
    setLike() {
        this.likeActive = !this.likeActive;
        this.points = this.likeActive ? this.points + 1 : this.points - 1;
        this.postService.handleCommentLike(this.id || this.id, this.points).subscribe();
    }

    handleLike() {
        if (this.dislikeActive) {
            this.setLike();
            this.setDislike();
        }
        this.setLike();
        this.notificationData.created_at = this.datePipe.transform(new Date(), 'M/d/yy, h:mm a')!;
        this.notificationData.message = `${this.authService.currentUserValue.username} has liked your answer`;
        this.notificationService.saveNotification(this.notificationData);
    }

    handleDislike() {
        if (this.likeActive) {
            this.setDislike();
            this.setLike();
        }
        this.setDislike();
        this.notificationData.created_at = this.datePipe.transform(new Date(), 'M/d/yy, h:mm a')!;
        this.notificationData.message = `${this.authService.currentUserValue.username} has disliked your answer`;
        this.notificationService.saveNotification(this.notificationData);
    }
}
