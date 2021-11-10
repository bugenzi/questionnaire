import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dataService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
        });
        console.log(this.registerForm);
        this.registerForm.valueChanges.subscribe(val => console.log(val));
    }

    onSubmit() {
        this.dataService.sendUserRegister(this.registerForm.value).subscribe(
            res => {
                alert('sign up sucesfull');
                console.log(res);
                this.registerForm.reset();
                this.router.navigate(['login']);
            },
            err => console.log(err),
        );
    }
}
