import Joi from "joi";
import { ValidationError } from "./client-errors";

export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }
    // validation schema for user
    private static validationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(40),
        lastName: Joi.string().required().min(2).max(55),
        email: Joi.string().required().min(8).max(70).email(),
        password: Joi.string().required().min(6).max(70),
    })

        // checking current object against the schema:
        public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }


}