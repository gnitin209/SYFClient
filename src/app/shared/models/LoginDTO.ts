import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginDto {
    userEmail: any;
    userPassword: any;
}