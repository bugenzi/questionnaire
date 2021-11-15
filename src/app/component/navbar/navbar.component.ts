import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    isToggled: boolean = true;
    isLoggedIn$!: Observable<User>;
    user!: User;
    showModal = false;
    notificationCount!: number;

    constructor(
        private dataService: AuthService,
        private modalService: ModalService,
        private notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.dataService.currentUser;
        this.isLoggedIn$.subscribe(() => {
            this.user = this.dataService.currentUserValue;
        });
        this.notificationService.notification$.subscribe((res: []) => {
            this.notificationCount = res.length;
        });
    }
    handleLogout() {
        this.dataService.logout();
        this.ngOnInit();
    }

    showItems() {
        this.isToggled = !this.isToggled;
    }

    toggleModalNotifications() {
        this.modalService.handleOpen2();
    }
}
