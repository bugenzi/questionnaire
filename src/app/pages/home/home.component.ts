import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    isLoggedIn$!: Observable<User>;
    user!: User;
    postsData: any;
    sizeSub!: Subscription;
    dataSub!: Subscription;
    sortPopular!: boolean;
    page!: number;
    limit!: number;

    order!: string;
    end!: number;
    errorMessage!: string | null; //error message
    //error message

    size!: number;
    noData!: boolean;
    buttonArray!: Array<number>;

    constructor(
        private http: HttpClient,
        private postService: PostService,
        private modalService: ModalService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.sortPopular = false;
        this.page = 1; //initialize variables
        this.limit = 20;
        this.errorMessage = null;
        this.buttonArray = [1, 2, 3];

        this.getData();
        this.isLoggedIn$ = this.authService.currentUser;
        this.isLoggedIn$.subscribe(() => {
            this.user = this.authService.currentUserValue;
        });
    }

    getData() {
        this.end = Math.ceil(this.size / this.limit); //calculate last page

        this.dataSub = this.postService.getPosts(this.sortPopular, this.page, this.limit).subscribe(
            data => {
                this.postsData = data;
                this.noData = false;
                this.errorMessage = '';
            },
            error => {
                this.connectionErrorHandler(); //call function connectionErrorHandler
            },
        );
    }

    changePage(page: number) {
        this.page = page; //refresh page
        if (this.page == 1 || this.page == 2) {
            //depending on selected page, display the correct buttons for pagination
            this.buttonArray = [1, 2, 3];
        } else if (this.page == this.end || this.page == this.end - 1) {
            this.buttonArray = [this.end - 2, this.end - 1, this.end];
        } else {
            this.buttonArray = [this.page - 1, this.page, this.page + 1];
        }

        this.getData(); //call function getData
    }

    changeLimit(limit: string) {
        this.limit = Number(limit) > 0 ? Number(limit) : 10; //initialize limit if it is invalid
        this.page = 1; //set page to 1
        this.buttonArray = [1, 2, 3]; //display the correct buttons

        this.getData(); //call function getData
    }

    connectionErrorHandler() {
        this.postsData = []; //no data to display
        this.noData = true;
        this.errorMessage = 'Probably json-server isnt running'; //display error message
    }

    handleSort() {
        this.sortPopular = !this.sortPopular;
        this.getData();
    }
    toggleModalPost() {
        this.modalService.handleOpen1();
    }
}
