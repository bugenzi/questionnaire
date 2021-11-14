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
    sizeSub!: Subscription; //variables for managing subscriptions
    dataSub!: Subscription;

    page!: number; //current page
    //current page
    limit!: number; //page limit
    //page limit
    //page limit
    sort!: string; //property by which table is sorted
    //property by which table is sorted
    //property by which table is sorted
    order!: string; //ascending or descending order
    //ascending or descending order
    //ascending or descending order
    end!: number; //last page
    //last page

    //last page
    errorMessage!: string | null; //error message
    //error message

    size!: number; //total data size
    postsData: Array<any> = []; //data displayed in table
    noData!: boolean; //true if empty table
    //true if empty table

    //true if empty table
    buttonArray!: Array<number>; //button values for pagination
    //button values for pagination

    constructor(
        private http: HttpClient,
        private postService: PostService,
        private modalService: ModalService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.isLoggedIn$ = this.authService.currentUser;
        this.isLoggedIn$.subscribe(() => {
            this.user = this.authService.currentUserValue;
        });
        this.page = 1; //initialize variables
        this.limit = 20;
        this.sort = 'id';
        this.order = 'asc';
        this.errorMessage = null;
        this.buttonArray = [1, 2, 3];
        this.dataSub = this.postService.getPosts().subscribe(
            data => {
                console.log(data);
                //subscribe to server's response
                this.postsData = data; //assign server's response to a variable
                this.noData = false;
                this.errorMessage = ''; //no error occured, so there is no error message
            },
            error => {
                //in case of error
                this.connectionErrorHandler(); //call function connectionErrorHandler
            },
        );
        this.sizeSub = this.postService.getAllPosts().subscribe(
            data => (this.size = data.lenght),
            err => console.log(err),
        );
    }

    getData() {
        this.end = Math.ceil(this.size / this.limit); //calculate last page
        //if the url seems complicated, read the documentation of json-server on github
        this.dataSub = this.postService.getPosts(this.page).subscribe(
            data => {
                //subscribe to server's response
                this.postsData = data; //assign server's response to a variable
                this.noData = false;
                this.errorMessage = ''; //no error occured, so there is no error message
            },
            error => {
                //in case of error
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

    changeSorting(column: string, order: string) {
        this.sort = column; //refresh variables
        this.order = order;

        this.getData(); //call function getData
    }

    connectionErrorHandler() {
        this.postsData = []; //no data to display
        this.noData = true;
        this.errorMessage = 'Probably json-server isnt running'; //display error message
    }

    ngOnDestroy() {
        this.sizeSub.unsubscribe(); //end subscriptions
        this.dataSub.unsubscribe();
    }

    toggleModalPost() {
        this.modalService.handleOpen1();
        // console.log(this.modalService.getModalValue);
    }
}
