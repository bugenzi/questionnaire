import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
    showModal: boolean = true;
    postForm!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
            ]),
            post: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
            ]),
        });
    }
    toggleModal() {
        this.showModal = !this.showModal;
    }

    get title() {
        return this.postForm.get('title')!;
    }
    get post() {
        return this.postForm.get('post')!;
    }
    onSubmit() {
        let postData = new Post();
        postData.title = this.postForm.get('title')!.value;
        postData.desc = this.postForm.get('desc')!.value;
        postData.id = this.authService.currentUserValue.id;
        postData.created_at = this.datePipe.transform(new Date(), 'MM-dd hh mm ss')!;

        console.log(this.postForm.value);
    }
}
