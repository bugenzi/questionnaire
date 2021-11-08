import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

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
        alert(this.loginForm.value);
    }
}
