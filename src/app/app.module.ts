import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PostCardComponent } from './component/post-card/post-card.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';
import { RegisterComponent } from './pages/register/register.component';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        PostCardComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        PostComponent,
        // DataService,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [FormsModule, ReactiveFormsModule],
})
export class AppModule {}
