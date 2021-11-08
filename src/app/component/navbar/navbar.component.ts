import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    host: {
        '(document:click)': 'showItems($event)',
    },
})
export class NavbarComponent {
    isToggled: boolean = true;

    constructor(private _eref: ElementRef) {}

    // ngOnInit(): void {
    // }

    // Navbar will have logout method using router property
    //
    // faUser = faUser;
    // isLoggedIn: boolean;
    // username: string;

    // constructor(private authService: AuthService, private router: Router) {}

    // ngOnInit() {
    //     this.authService.loggedIn.subscribe((data: boolean) => (this.isLoggedIn = data));
    //     this.authService.username.subscribe((data: string) => (this.username = data));
    //     this.isLoggedIn = this.authService.isLoggedIn();
    //     this.username = this.authService.getUserName();
    // }

    // goToUserProfile() {
    //     this.router.navigateByUrl('/user-profile/' + this.username);
    // }

    // logout() {
    //     this.authService.logout();
    //     this.isLoggedIn = false;
    //     this.router.navigateByUrl('');
    // }
    showItems(event?: Event) {
        // Needs optimization
        let eventListiner = this._eref.nativeElement.contains(event?.target);

        if (eventListiner) {
            this.isToggled = !this.isToggled;
        } else if (!eventListiner) {
            this.isToggled = false;
        }
        // this.isToggled = !this.isToggled;
        // console.log('is Toggled', this.isToggled);
    }
}
