import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';
@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private httpClient: HttpClient) {}

    saveNotification(data: Notification) {
        return this.httpClient.post(`${environment.REST_API_SERVER}/notifications`, data);
    }
    getNotifications(id: number) {
        let params = new HttpParams();
        params = params.append('reciverId', id);
        params = params.append('_sort', 'created_at');
        params = params.append('_order', 'asc');
        return this.httpClient.get<[]>(`${environment.REST_API_SERVER}/notifications`, { params });
    }
}
