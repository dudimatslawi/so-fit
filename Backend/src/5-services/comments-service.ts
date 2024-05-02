import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { TrainerModel } from "../3-models/trainer-model";
import { OkPacketParams } from "mysql2";
import { CommentModel } from "../3-models/comments-model";
import { UserModel } from "../3-models/user-model";

class CommentsService {

        // Get all trainers:
        public async getAllComments(): Promise<CommentModel[]> {
            const sql = `SELECT * FROM comments`;
            const comments = await dal.execute(sql);
            return comments
        }
    
        public async getOneComment(id: number): Promise<CommentModel> {
            const sql = `SELECT * FROM comments WHERE id = ?`
            const comments = await dal.execute(sql, [id]);
            const comment = comments[0];
            if (!comment) throw new ResourceNotFoundError(id);
            return comment
        }

        public async addComment(comment: CommentModel): Promise<CommentModel> {

            // validate the insert vacation:
            comment.validateInsert();
        
            const sql = `INSERT INTO comments(userId, body)
            VALUES(?,?)`;
            const info: OkPacketParams = await dal.execute(sql, [comment.userId, comment.body]);
            comment = await this.getOneComment(info.insertId);
            return comment
        }
    
        public async deleteComment(id: number): Promise<void> {
    
            // create sql:
            const sql = `DELETE from comments where id = ?`;
    
            const info: OkPacketParams = await dal.execute(sql, [id]);
    
            if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
        
        }

        public async getUserById(id: number): Promise<UserModel>{
            const sql = `SELECT * FROM users WHERE id = ?`
            const users = await dal.execute(sql, [id]);
            const user = users[0];
            if (!user) throw new ResourceNotFoundError(id);
            return user
        }
    
}
export const commentsService = new CommentsService();