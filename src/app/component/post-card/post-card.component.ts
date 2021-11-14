import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
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
    userId!: number;

    @Input()
    id?: number;

    like = this.points;
    likeActive: boolean = false;
    dislikeActive: boolean = false;
    notificationData = new Notification();

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private authService: AuthService,
        private datePipe: DatePipe,
        private notificationService: NotificationService,
    ) {
        this.notificationData.sender = this.authService.currentUserValue.username;
    }
    ngOnInit(): void {}
    setDislike() {
        this.dislikeActive = !this.dislikeActive;
        this.points = this.dislikeActive ? this.points - 1 : this.points + 1;
        this.postService.handlePostLike(this.id, this.points).subscribe();
    }
    setLike() {
        this.likeActive = !this.likeActive;
        this.points = this.likeActive ? this.points + 1 : this.points - 1;
        this.postService.handlePostLike(this.id || this.id, this.points).subscribe();
    }

    handleLike() {
        if (this.dislikeActive) {
            this.setLike();
            this.setDislike();
        }
        this.setLike();
        this.notificationData.reciverId = this.userId;
        this.notificationData.created_at = this.datePipe.transform(new Date(), 'M/d/yy, h:mm a')!;
        this.notificationData.message = `${this.authService.currentUserValue.username} has liked your question`;
        this.notificationService.saveNotification(this.notificationData).subscribe();
    }

    handleDislike() {
        if (this.likeActive) {
            this.setDislike();
            this.setLike();
        }
        this.setDislike();
        this.notificationData.reciverId = this.userId;
        this.notificationData.created_at = this.datePipe.transform(new Date(), 'M/d/yy, h:mm a')!;
        this.notificationData.message = `${this.authService.currentUserValue.username} has disliked your question`;
        this.notificationService.saveNotification(this.notificationData).subscribe();
    }
}
