import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";

class AuthService {
    public async register(user: UserModel): Promise<string> {

        // execute validation
        user.validate();

        // check if email is taken:
        const isTaken = await this.isEmailTaken(user.email);

        if (isTaken) throw new ValidationError("email already taken");

        user.password = cyber.hashPassword(user.password);

        // create sql:
        const sql = `insert into users(firstName, lastName, email, password)
                    values(?, ?, ?, ?)`
        // execute:
        const info: OkPacketParams = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password]);

        // set back auto increment id:
        user.id = info.insertId;

        // create new token:
        const token = cyber.getNewToken(user);

        return token
    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.validate();

        // hash password for comparing hashes:
        credentials.password = cyber.hashPassword(credentials.password);

        // create prepared statement:
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

        // execute:
        const users: OkPacketParams = await dal.execute(sql, [credentials.email, credentials.password]);

        const user = users[0]

        if (!user) throw new UnauthorizedError("incorrect email or password")

        // create new token:
        const token = cyber.getNewToken(user);

        return token
    }

    // check if email is already exist in database: 
    private async isEmailTaken(email: string): Promise<boolean> {
        const sql = `SELECT EXISTS(select * from users where email = ?) AS isTaken`;
        const result = await dal.execute(sql, [email]);
        const isTaken = result[0].isTaken;

        return isTaken === 1;
    }

}
export const authService = new AuthService();
