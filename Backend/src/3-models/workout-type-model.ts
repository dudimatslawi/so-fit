import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";
export class WorkoutTypeModel {
    id: number;
    name: string;
    description: string;
    durationInMins: number;
    trainerId: number;

    public constructor(workout: WorkoutTypeModel) {
        this.id = workout.id;
        this.name = workout.name;
        this.description = workout.description;
        this.durationInMins = workout.durationInMins;
        this.trainerId = workout.trainerId
    }
    // validation schema to insert vacation:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        name: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(1000),
        durationInMins: Joi.number().integer().required().min(10).max(200),
        trainerId: Joi.number().required().integer().min(1),
    })

    // validation schema to update vacation:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        name: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(1000),
        durationInMins: Joi.number().integer().required().min(10).max(200),
        trainerId: Joi.number().required().integer().min(1),

    })

    public validateInsert(): void {
        // checking current object against the schema:
        const result = WorkoutTypeModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    };

    public validateUpdate(): void {
        // checking current object against the schema:
        const result = WorkoutTypeModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }

}