import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private dataService: AuthService, private router: Router) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
            ]),
        });
    }

    onSubmit() {
        this.dataService.login(this.loginForm.value).subscribe(data => {
            console.log(data);
            if (data === undefined) this.loginForm.get('password')?.setErrors({ incorrect: true });
            else this.router.navigateByUrl('/');
        });
    }

    get email() {
        return this.loginForm.get('email')!;
    }
    get password() {
        return this.loginForm.get('password')!;
    }
}
