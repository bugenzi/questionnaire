import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    host: {
        '(document:click)': 'showItems($event)',
    },
})
export class NavbarComponent implements OnInit {
    isToggled: boolean = true;
    isLoggedIn$!: Observable<User>;
    user!: User;
    showModal = false;

    constructor(
        private _eref: ElementRef,
        private dataService: AuthService,
        private storageService: LocalStorageService,
    ) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.dataService.currentUser;
        this.isLoggedIn$.subscribe(() => {
            this.user = this.dataService.currentUserValue;
        });

        console.log(this.user);
    }
    handleLogout() {
        this.dataService.logout();
        this.ngOnInit();
    }

    showItems(event?: Event) {
        // Needs optimization
        let eventListiner = this._eref.nativeElement.contains(event?.target);

        if (eventListiner) {
            this.isToggled = !this.isToggled;
        } else if (!eventListiner) {
            this.isToggled = false;
        }
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }
}
