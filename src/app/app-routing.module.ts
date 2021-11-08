import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
    { path: '/', component: HomeComponent },
    {
        path: 'question',
        component: PostComponent,
        children: [
            {
                path: 'question/:id', //:type is dynamic here
                component: PostComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
