import { IRegister } from './register.model';

// Domain model
export class Register implements IRegister {
    username = '';
    email = '';
    password = '';
    posts?: any[] = [];
}
