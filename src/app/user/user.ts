/* Defines the user entity */
import { Builder } from '../shared/Builder';

export interface IUser {
    id: number;
    userName: string;
    isAdmin: boolean;
}

const userInfor = Builder<IUser>()
    .id(1)
    .isAdmin(true)
    .userName('tester tester')
    .build();

let aUserInfor = Builder<IUser>()
    .id(1)
    .isAdmin(true)
    .userName('tester tester')
    .build();