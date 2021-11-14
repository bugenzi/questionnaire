import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post-modal',
    templateUrl: './post-dialog.component.html',
    styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
    showModal!: boolean;
    postForm!: FormGroup;
    public showModal$!: Observable<boolean>;
    constructor(
        private authService: AuthService,
        private datePipe: DatePipe,
        private postService: PostService,
        private modalService: ModalService,
    ) {}

    ngOnInit(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
            ]),
            post: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(120),
            ]),
        });
        this.showModal$ = this.modalService.getModalValue1;
        this.showModal$.subscribe(res => (this.showModal = res));
        // this.showModal.
        console.log(this.showModal);
    }
    toggleModal() {
        this.modalService.handleOpen1();
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
        postData.desc = this.postForm.get('post')!.value;
        postData.userId = this.authService.currentUserValue.id;
        postData.username = this.authService.currentUserValue.username;
        postData.created_at = this.datePipe.transform(new Date(), 'MM-dd hh mm ss')!;

        this.postService.createPost(postData).subscribe(
            res => console.log(res),
            err => console.log(err),
        );
    }
}
