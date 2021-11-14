import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
    isOpenSubject1$ = new BehaviorSubject<boolean>(false);
    isOpen1$!: Observable<boolean>;
    isOpenSubject2$ = new BehaviorSubject<boolean>(false);
    isOpen2$!: Observable<boolean>;
    constructor() {
        this.isOpenSubject1$ = new BehaviorSubject<boolean>(false);
        this.isOpen1$ = this.isOpenSubject1$.asObservable();
        this.isOpenSubject2$ = new BehaviorSubject<boolean>(false);
        this.isOpen2$ = this.isOpenSubject2$.asObservable();
    }

    handleOpen1() {
        this.isOpenSubject1$.next(!this.isOpenSubject1$.value);
    }
    handleOpen2() {
        this.isOpenSubject2$.next(!this.isOpenSubject2$.value);
    }

    get getModalValue1(): Observable<boolean> {
        return this.isOpenSubject1$;
    }
    get getModalValue2(): Observable<boolean> {
        return this.isOpenSubject2$;
    }
}
