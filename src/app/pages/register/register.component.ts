import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        this.registerForm = new FormGroup({
            username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
            ]),
        });

        this.registerForm.valueChanges.subscribe(val => console.log(val));
    }

    onSubmit() {
        this.dataService.sendUserRegister(this.registerForm.value).subscribe(
            res => {
                this.registerForm.reset();
                this.router.navigate(['login']);
            },
            err => console.log(err),
        );
    }
    get username() {
        // console.log(tihs)
        return this.registerForm.get('username')!;
    }
    get email() {
        return this.registerForm.get('email')!;
    }
    get password() {
        return this.registerForm.get('password')!;
    }
}
