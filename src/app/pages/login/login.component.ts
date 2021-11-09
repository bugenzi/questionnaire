import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            // username: ['', [Validators.required, Validators.maxLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
        console.log(this.loginForm);
        this.loginForm.valueChanges.subscribe(val => console.log(val));
    }

    onSubmit() {
        this.dataService.getUserLogin(this.loginForm.value);
    }
}
