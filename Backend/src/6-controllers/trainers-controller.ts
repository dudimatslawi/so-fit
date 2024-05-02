import express, { NextFunction, Request, Response } from "express";
import { WorkoutTypeModel } from "../3-models/workout-type-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { trainersService } from "../5-services/trainers-service";
import { TrainerModel } from "../3-models/trainer-model";
import { securityMiddleware } from "../4-middleware/security-middleware";

class TrainersController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    // Register routes:
    private registerRoutes(): void {
        this.router.get("/trainers", this.getAllTrainers);
        this.router.get("/trainers/:id(\\d+)", this.getOneTrainer);
        this.router.post("/trainers", this.addTrainer);
        this.router.put("/trainers/:id(\\d+)", this.updateTrainer);
        this.router.delete("/trainers/:id(\\d+)", this.deleteTrainer);
        this.router.get("/trainers/images/:imageName", this.getImage);
    }

    // GET http://localhost:4000/api/___
    private async getAllTrainers(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const trainers = await trainersService.getAllTrainers();
            response.json(trainers)
        }
        catch (err: any) { next(err); }
    }

    private async getOneTrainer(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            const trainer = await trainersService.getOneTrainer(id);
            response.json(trainer)
        }
        catch (err: any) { next(err); }
    }

    private async addTrainer(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const trainer = new TrainerModel(request.body);
            const addedTrainer = await trainersService.addTrainer(trainer);
            response.status(StatusCode.Created).json(addedTrainer);
        }
        catch (err: any) { next(err); }
    }

    private async updateTrainer(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            request.body.id = +request.params.id;
            const trainer = new TrainerModel(request.body);
            const updatedTrainer = await trainersService.updateTrainer(trainer);
            
            response.json(updatedTrainer);
        }
        catch (err: any) { next(err) }
    }

    private async deleteTrainer(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            await trainersService.deleteTrainer(id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err) }
    }

    private async getImage(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath); // response the actual image file
        }
        catch (err: any) { next(err) }
    }
}

const trainersController = new TrainersController();
export const trainersRouter = trainersController.router;
