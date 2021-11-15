import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';
@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private httpClient: HttpClient) {}
    private _notification$ = new BehaviorSubject<[]>([]);
    saveNotification(data: Notification) {
        return this.httpClient
            .post<[]>(`${environment.REST_API_SERVER}/notifications`, data)
            .subscribe(res => {
                this.setNewNotification(res);
            });
    }
    getNotifications(id: number) {
        let params = new HttpParams();
        params = params.append('reciverId', id);
        params = params.append('_sort', 'created_at');
        params = params.append('_order', 'desc');
        return this.httpClient
            .get<[]>(`${environment.REST_API_SERVER}/notifications`, { params })
            .subscribe(res => {
                this.setNewNotification(res);
                this.notification$;
            });
    }

    setNewNotification(data: []) {
        if (!data) {
            return;
        }

        this._notification$.next(data);
    }
    get notification$(): Observable<[]> {
        return this._notification$.asObservable();
    }
}
