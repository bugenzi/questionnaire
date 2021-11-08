import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../models/register';
import { IRegister } from '../models/register.model';

export class StateService {
    private userData$ = new BehaviorSubject<IRegister>(new Register());

    public setUserData = (userData: IRegister) => this.userData$.next(userData);
    public getUserData = (): Observable<IRegister> => this.userData$.asObservable();
    public resetUserData = () => this.userData$.next(new Register());
}
