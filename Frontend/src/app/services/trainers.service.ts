import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TrainerModel from '../models/trainer.model';
import { appConfig } from '../utils/app.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainersService {

    constructor(private http: HttpClient) { }

    public async getAllTrainers(): Promise<TrainerModel[]> {
        const observable = this.http.get<TrainerModel[]>(appConfig.trainerUrl); //returns an observable object
        const trainers = await firstValueFrom(observable);
        return trainers
    };

    public async getOneTrainer(id: number): Promise<TrainerModel> {
        const observable = this.http.get<TrainerModel>(appConfig.trainerUrl + id); //returns an observable object
        const trainer = await firstValueFrom(observable);
        return trainer
    }

}
