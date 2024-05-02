import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // validation schema for credentials model
    private static validationSchema = Joi.object({
        email: Joi.string().required().min(8).max(70).email(),
        password: Joi.string().required().min(6).max(100)
    })

    // checking current object against the schema:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)

    }

}
