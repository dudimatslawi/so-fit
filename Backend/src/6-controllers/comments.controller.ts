import express, { NextFunction, Request, Response } from "express";
import { workoutService } from "../5-services/workouts-service";
import { WorkoutTypeModel } from "../3-models/workout-type-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { commentsService } from "../5-services/comments-service";
import { CommentModel } from "../3-models/comments-model";

class CommentsController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    // Register routes:
    private registerRoutes(): void {
        this.router.get("/comments", this.getAllComments);
        this.router.get("/users/:id", this.getUserById);
        this.router.get("/comments/:id(\\d+)", this.getOneComment);
        this.router.post("/comments", this.addComment);
        this.router.delete("/comments/:id(\\d+)", this.deleteComment);
    }

    // GET http://localhost:4000/api/___
    private async getAllComments(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const comments = await commentsService.getAllComments();
            response.json(comments)
        }
        catch (err: any) { next(err); }
    }

    private async getOneComment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            const comment = await commentsService.getOneComment(id);
            response.json(comment)
        }
        catch (err: any) { next(err); }
    }

    private async addComment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const comment = new CommentModel(request.body);
            const addedComment = await commentsService.addComment(comment);
            response.status(StatusCode.Created).json(addedComment);
        }
        catch (err: any) { next(err); }
    }

    private async deleteComment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            await commentsService.deleteComment(id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err) }
    }
    private async getUserById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            const user = await commentsService.getUserById(id);
            response.json(user)
        }
        catch (err: any) { next(err); }
    }

}

const commentsController = new CommentsController();
export const commentsRouter = commentsController.router;
