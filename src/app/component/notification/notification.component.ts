import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    showModal!: boolean;
    notifications!: any;
    userID!: number;
    // postForm!: FormGroup;
    public showModal2$!: Observable<boolean>;
    constructor(
        private modalService: ModalService,
        private notificationService: NotificationService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.showModal2$ = this.modalService.getModalValue2;
        this.showModal2$.subscribe(res => (this.showModal = res));
        this.userID = this.authService.currentUserValue.id;
        this.notificationService.getNotifications(this.userID).subscribe(res => {
            console.log(res);
            this.notifications = res;
        });
    }

    toggleModal() {
        this.modalService.handleOpen2();
    }
}
