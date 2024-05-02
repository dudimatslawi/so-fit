import { Component, Input, OnInit } from '@angular/core';
import TrainerModel from '../../../models/trainer.model';
import { TrainersService } from '../../../services/trainers.service';
import { CommonModule } from '@angular/common';
import { TrainerWorkoutsComponent } from '../../workouts-area/trainer-workouts/trainer-workouts.component';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-trainers-list',
    standalone: true,
    imports: [CommonModule, TrainerWorkoutsComponent, RouterLink],
    templateUrl: './trainers-list.component.html',
    styleUrl: './trainers-list.component.css'
})
export class TrainersListComponent implements OnInit {
    public trainers: TrainerModel[];
    

    public constructor(private trainersService: TrainersService) { }
    public async ngOnInit(): Promise<void> {
        try {
            this.trainers = await this.trainersService.getAllTrainers();
            this.trainers.forEach(trainer => trainer.hovered = false);
        }
        catch (err: any) {
            alert(err.message)
        }
    }

}
