import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
    posts: [] = [];
    constructor(
        // private fb: FormBuilder,
        private postService: PostService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        // console.log('hello');
        // this.postService.getPosts().subscribe(
        //     res => console.log(res),
        //     err => console.log(err),
        // );
    }
}
