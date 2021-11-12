import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { Ipost } from '../models/post.model';
@Injectable({
    providedIn: 'root',
})
export class PostService {
    private REST_API_SERVER = 'http://localhost:3000';
    // public currentComments$!: BehaviorSubject<any>;

    constructor(private httpClient: HttpClient) {}
    getPosts(page?: number, limit?: number): Observable<any> {
        let params = new HttpParams();

        // Begin assigning parameters

        params = params.append('_page', page ? page : 1);
        params = params.append('_limit', limit ? limit : 20);

        return this.httpClient
            .get(this.REST_API_SERVER + '/posts', { responseType: 'json', params })
            .pipe(
                tap(_ => this.log('fetched posts')),
                catchError(err => 'error'),
            );
        // .subscribe(res, err);
    }
    getAllPosts(): Observable<any> {
        return this.httpClient.get(this.REST_API_SERVER + '/posts', { responseType: 'json' }).pipe(
            tap(_ => this.log('fetched posts')),
            catchError(err => 'error'),
        );
    }
    createPost(postData: Ipost) {
        let post = new Post();
        post = { ...postData, comments: [] };
        this.httpClient
            .post(this.REST_API_SERVER + '/posts', postData)
            .pipe(catchError(err => 'error'));
    }
    getPostById(id: string) {
        let params = new HttpParams();
        params = params.append('id', id);

        return this.httpClient.get(`${this.REST_API_SERVER}/posts`, {
            responseType: 'json',
            params,
        });
        //     .pipe(
        //         map(res => {
        //             this.currentComments$.next(res);
        //             return res;
        //         }),
        //     ),
        // catchError(err => {
        //     console.log(err);
        //     return err;
        // })
    }
    postComment(commentData: any) {
        console.log(commentData);
        return this.httpClient.post(`${this.REST_API_SERVER}/comments`, commentData).pipe(
            map(res => {
                console.log('REEE', res);
            }),
            catchError(err => {
                console.log(err);
                return err;
            }),
        );
    }
    getCommentsByPostId(id: number) {
        let params = new HttpParams();
        params = params.append('postId', id);
        params = params.append('_sort', 'created_at');
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

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    private log(message: string) {
        console.log(`Posts: ${message}`);
    }
}
