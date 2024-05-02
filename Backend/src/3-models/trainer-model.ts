import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class TrainerModel {
    id: number;
    firstName: string;
    lastName: string;
    image: UploadedFile;
    imageUrl: string;

    public constructor(trainer: TrainerModel) {
        this.id = trainer.id;
        this.firstName = trainer.firstName;
        this.lastName = trainer.lastName;
        this.image = trainer.image;
        this.imageUrl = trainer.imageUrl;
    }
    // validation schema for trainer
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(40),
        lastName: Joi.string().required().min(2).max(55),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200),
    })

    // validation schema for user
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(40),
        lastName: Joi.string().required().min(2).max(55),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),
    })

    public validateInsert(): void {
        // checking current object against the schema:
        const result = TrainerModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    };

    public validateUpdate(): void {
        // checking current object against the schema:
        const result = TrainerModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }


}