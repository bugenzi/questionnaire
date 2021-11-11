import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/storage.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dataService: AuthService,
        private router: Router,
        private storageService: LocalStorageService,
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.dataService.login(this.loginForm.value).subscribe(data => {
            this.router.navigateByUrl('/');
        });
    }
}
