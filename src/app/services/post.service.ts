import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Ipost } from '../models/post.model';
@Injectable({
    providedIn: 'root',
})
export class PostService {
    private REST_API_SERVER = environment.REST_API_SERVER;
    // public currentComments$!: BehaviorSubject<any>;

    constructor(private httpClient: HttpClient) {}
    getPosts(isPopular: boolean, page?: number, limit?: number): Observable<any> {
        let params = new HttpParams();
        if (isPopular) {
            params = params.append('_sort', 'points');
            params = params.append('_order', 'desc');
        } else if (!isPopular) {
            params = params.append('_sort', 'created_at');
            params = params.append('_order', 'asc');
        }
        params = params.append('_page', page ? page : 1);
        params = params.append('_limit', limit ? limit : 20);

        return this.httpClient
            .get(this.REST_API_SERVER + '/posts', { responseType: 'json', params })
            .pipe(
                tap(_ => this.log('fetched posts')),
                catchError(err => 'error'),
            );
    }
    getAllPosts(): Observable<any> {
        return this.httpClient.get(this.REST_API_SERVER + '/posts', { responseType: 'json' }).pipe(
            tap(_ => this.log('fetched posts')),
            catchError(err => 'error'),
        );
    }
    createPost(postData: Ipost) {
        let post = new Post();
        post = postData;
        console.log(post);
        return this.httpClient.post(this.REST_API_SERVER + '/posts', postData);
    }
    getPostById(id: string | number, byUser: boolean = false) {
        let params = new HttpParams();
        if (byUser) {
            params = params.append('userId', id);
        } else {
            params = params.append('id', id);
        }
        params = params.append('_sort', 'created_at');
        params = params.append('_order', 'desc');
        return this.httpClient.get(`${this.REST_API_SERVER}/posts`, {
            responseType: 'json',
            params,
        });
    }
    handlePostLike(id?: number, points?: number) {
        return this.httpClient.patch(
            `${this.REST_API_SERVER}/posts/${id}`,
            { points },
            {
                responseType: 'json',
            },
        );
    }
    handleCommentLike(id?: number, points?: number) {
        return this.httpClient.patch(
            `${this.REST_API_SERVER}/comments/${id}`,
            { points },
            {
                responseType: 'json',
            },
        );
    }

    postComment(commentData: any) {
        return this.httpClient.post(`${this.REST_API_SERVER}/comments`, commentData).pipe(
            map(res => {}),
            catchError(err => {
                console.log(err);
                return err;
            }),
        );
    }
    getCommentsByPostId(id: number) {
        let params = new HttpParams();
        params = params.append('postId', id);
        params = params.append('_sort', 'points');
        params = params.append('_order', 'desc');

        return this.httpClient
            .get(`${this.REST_API_SERVER}/comments`, {
                params,
            })
            .pipe(
                tap(_ => this.log('fetched posts')),
                catchError(err => 'error'),
            );
    }
    getCommentsByUser(name: string) {
        let params = new HttpParams();
        params = params.append('username', name);

        return this.httpClient
            .get(`${this.REST_API_SERVER}/comments`, {
                params,
            })
            .pipe(
                tap(_ => this.log('fetched posts')),
                catchError(err => 'error'),
            );
    }

    private log(message: string) {
        console.log(`Posts: ${message}`);
    }
}
