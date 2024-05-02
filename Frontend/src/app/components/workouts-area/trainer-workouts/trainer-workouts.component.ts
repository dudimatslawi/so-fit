import { Component, OnInit } from '@angular/core';
import TrainerModel from '../../../models/trainer.model';
import WorkoutModel from '../../../models/workout.model';
import { TrainersService } from '../../../services/trainers.service';
import { WorkoutsService } from '../../../services/workouts.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trainer-workouts',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './trainer-workouts.component.html',
    styleUrl: './trainer-workouts.component.css'
})
export class TrainerWorkoutsComponent implements OnInit {
    public trainer: TrainerModel;
    public workouts: WorkoutModel[];

    public constructor(private trainersService: TrainersService,
        private workoutsService: WorkoutsService,
        private activatedRoute: ActivatedRoute,) { }

    public async ngOnInit(): Promise<void> {
        try {
            const id = +this.activatedRoute.snapshot.params["id"];
            this.trainer = await this.trainersService.getOneTrainer(id);
            this.workouts = await this.workoutsService.getWorkoutsByTrainerId(id);
        }
        catch (err: any) {
            alert(err.message)
        }
    }
}
