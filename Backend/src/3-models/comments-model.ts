import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CommentModel {
    id: number;
    userId: number;
    body: string;

    public constructor(comment: CommentModel) {
        this.id = comment.id;
        this.userId = comment.userId;
        this.body = comment.body;
    }
    // validation schema for comment
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        userId: Joi.number().required().min(1).integer(),
        body: Joi.string().required().min(2).max(1000),
    })


    public validateInsert(): void {
        // checking current object against the schema:
        const result = CommentModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    };


}