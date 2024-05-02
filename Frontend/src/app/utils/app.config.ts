import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
    providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()],
    
    registerUrl: "http://localhost:4000/api/register/",
    loginUrl: "http://localhost:4000/api/login/",
    commentsUrl: "http://localhost:4000/api/comments/",
    usersUrl: "http://localhost:4000/api/users/",
    trainerUrl: "http://localhost:4000/api/trainers/",
    workoutsUrl: "http://localhost:4000/api/workouts/",
    workoutsByTrainerIdUrl: "http://localhost:4000/api/workoutsByTrainerId/"
};
