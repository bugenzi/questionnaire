import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

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

    constructor(private dataService: AuthService, private modalService: ModalService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.dataService.currentUser;
        this.isLoggedIn$.subscribe(() => {
            this.user = this.dataService.currentUserValue;
        });
    }
    handleLogout() {
        this.dataService.logout();
        this.ngOnInit();
    }

    showItems() {
        // if (this.isToggled === true) {
        //     this.isToggled = false;
        // } else {
        //     this.isToggled = true;
        // }
        // Needs optimization
        console.log(this.isToggled);
        this.isToggled = !this.isToggled;
    }

    toggleModalNotifications() {
        this.modalService.handleOpen2();
    }
}
