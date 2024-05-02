import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { TrainerWorkoutsComponent } from './components/workouts-area/trainer-workouts/trainer-workouts.component';
import { CommentsListComponent } from './components/comments-area/comments-list/comments-list.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "trainer-workouts/:id", component: TrainerWorkoutsComponent },
    { path: "comments", component: CommentsListComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: Page404Component },
];
