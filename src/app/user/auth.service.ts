import { Injectable } from '@angular/core';
import { Builder } from '../shared/Builder';

import { IUser } from './user';

@Injectable()
export class AuthService {
    currentUser: IUser | null;
    redirectUrl: string;

    constructor() { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };

        this.currentUser = Builder<IUser>()
            .id(1)
            .isAdmin(true)
            .userName('tester tester')
            .build();
    }

    logout(): void {
        this.currentUser = null;
    }
}
