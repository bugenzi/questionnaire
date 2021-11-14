import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentCardComponent } from './component/comment-card/comment-card.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotificationComponent } from './component/notification/notification.component';
import { PostCardComponent } from './component/post-card/post-card.component';
import { PostDialogComponent } from './component/post-dialog/post-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        PostDialogComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        PostComponent,
        ProfileComponent,
        PostCardComponent,
        CommentCardComponent,
        // DataService,
        NotificationComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent],
    exports: [FormsModule, ReactiveFormsModule],
})
export class AppModule {}
