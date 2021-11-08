import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
        });
        console.log(this.registerForm);
        this.registerForm.valueChanges.subscribe(val => console.log(val));
    }

    onSubmit() {
        alert(this.registerForm.value);
    }
}
