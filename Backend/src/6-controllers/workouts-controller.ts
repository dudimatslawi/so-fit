import express, { NextFunction, Request, Response } from "express";
import { workoutService } from "../5-services/workouts-service";
import { WorkoutTypeModel } from "../3-models/workout-type-model";
import { StatusCode } from "../3-models/enums";

class WorkoutsController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    // Register routes:
    private registerRoutes(): void {
        this.router.get("/workouts", this.getAllWorkouts);
        this.router.get("/workouts/:id(\\d+)", this.getOneWorkout);
        this.router.get("/workoutsByTrainerId/:trainerId(\\d+)", this.getWorkoutByTrainerId);
        this.router.post("/workouts", this.addWorkout);
        this.router.put("/workouts/:id(\\d+)", this.updateWorkout);
        this.router.delete("/workouts/:id(\\d+)", this.deleteWorkout);
    }

    // GET http://localhost:4000/api/___
    private async getAllWorkouts(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const workouts = await workoutService.getAllWorkoutTypes();
            response.json(workouts)
        }
        catch (err: any) { next(err); }
    }

    private async getOneWorkout(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            const workout = await workoutService.getOneWorkout(id);
            response.json(workout)
        }
        catch (err: any) { next(err); }
    }

    private async getWorkoutByTrainerId(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const trainerId = +request.params.trainerId
            const workouts = await workoutService.getWorkoutsByTrainerId(trainerId);
            response.json(workouts)
        }
        catch (err: any) { next(err); }
    }

    private async addWorkout(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const workout = new WorkoutTypeModel(request.body);
            const addedWorkout = await workoutService.addWorkout(workout);
            response.status(StatusCode.Created).json(addedWorkout);
        }
        catch (err: any) { next(err); }
    }

    private async updateWorkout(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.id = +request.params.id;
            const workout = new WorkoutTypeModel(request.body);
            const updatedWorkout = await workoutService.updateWorkout(workout);
            console.log(updatedWorkout);
            
            response.json(updatedWorkout);
        }
        catch (err: any) { next(err) }
    }

    private async deleteWorkout(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            await workoutService.deleteWorkout(id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err) }
    }
}

const workoutsController = new WorkoutsController();
export const workoutsRouter = workoutsController.router;
