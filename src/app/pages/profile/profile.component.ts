import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    user!: User;
    posts!: any;
    totalAnswers!: any;
    constructor(
        private postService: PostService,
        private router: ActivatedRoute,
        private authService: AuthService,
    ) {
        if (this.router.snapshot.routeConfig?.path === 'profile/me') {
            this.user = this.authService.currentUserValue;
            this.postService
                .getCommentsByUser(this.user.username)
                .subscribe(res => (this.totalAnswers = res));
            console.log(this.user);
            this.postService.getPostById(this.user.id, true).subscribe(res => (this.posts = res));
        } else {
            let id = this.router.snapshot.paramMap.get('id');
            this.authService.getUserById(id!).subscribe(res => {
                this.user = res[0];
                this.postService
                    .getCommentsByUser(this.user.username)
                    .subscribe(res => (this.totalAnswers = res));
            });
            this.postService.getPostById(id!, true).subscribe(res => (this.posts = res));
        }
    }

    ngOnInit(): void {}
}
