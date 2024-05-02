import { HttpClient } from "@angular/common/http";
import WorkoutModel from "../models/workout.model";
import { appConfig } from "../utils/app.config";
import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class WorkoutsService {
    public id: number;
    public name: string;
    public description: string;
    public durationInMins: number;
    public trainerId: number;

    constructor(private http: HttpClient) { }

    public async getAllWorkouts(): Promise<WorkoutModel[]> {
        const observable = this.http.get<WorkoutModel[]>(appConfig.workoutsUrl); //returns an observable object
        const workouts = await firstValueFrom(observable);
        return workouts
    };

    public async getOneWorkout(id: number): Promise<WorkoutModel> {
        const observable = this.http.get<WorkoutModel>(appConfig.workoutsUrl + id); //returns an observable object
        const workout = await firstValueFrom(observable);
        return workout
    }

    public async getWorkoutsByTrainerId(trainerId: number): Promise<WorkoutModel[]> {
        const observable = this.http.get<WorkoutModel[]>(appConfig.workoutsByTrainerIdUrl + trainerId); //returns an observable object
        const workouts = await firstValueFrom(observable);
        return workouts
    }




}