import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from './service/custom-validators'
import { RegisterUser } from './models/registerUser';
import { AuthService } from './service/auth.service';
import { LoginRequest } from './models/loginRequest';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register-login',
    imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register-login.component.html',
    styleUrl: './register-login.component.css'
})
export class RegisterLoginComponent {

  loginActive: boolean = true;

  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },
    {
      validators: confirmPasswordValidator('password', 'confirmPassword')
    })

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(public authService: AuthService, private router: Router) { }

  get passwordsDontMatch(): boolean | undefined {
    return this.registerForm.hasError('passwordsMismatch') && this.registerForm.get('confirmPassword')?.touched;
  }

  changeActiveTab(tab: any) {
    this.loginActive = (tab === 'register') ? false : true;
  }

  onSubmitRegister() {
    const fullName = this.registerForm.get('fullName')?.value ?? '';
    const [firstName = '', lastName = ''] = fullName.split(' ');

    var user: RegisterUser = {
      firstName: firstName,
      lastName: lastName,
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!,
      username: this.registerForm.get('email')?.value!
    };
    this.authService.RegisterUser(user).subscribe(res => { console.log(res) });
  }

  onSubmitLogin() {
    const loginRequest: LoginRequest = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    }

    this.authService.loginUser(loginRequest).subscribe((token: string) => { 
      this.router.navigate(['/home'])
     });
  }
}
