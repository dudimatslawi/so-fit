import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { TrainerModel } from "../3-models/trainer-model";
import { OkPacketParams } from "mysql2";

class TrainersService {

        // Get all trainers:
        public async getAllTrainers(): Promise<TrainerModel[]> {
            const sql = `SELECT *, CONCAT(?, imageName) as imageUrl FROM trainers`;
            const trainers = await dal.execute(sql, [appConfig.baseImageUrl]);
            return trainers
        }
    
        public async getOneTrainer(id: number): Promise<TrainerModel> {
            const sql = `SELECT *, CONCAT(?, imageName) as imageUrl FROM trainers WHERE id = ?`
            const trainers = await dal.execute(sql, [appConfig.baseImageUrl, id]);
            const trainer = trainers[0];
            if (!trainer) throw new ResourceNotFoundError(id);
            return trainer
        }

        public async addTrainer(trainer: TrainerModel): Promise<TrainerModel> {

            // validate the insert vacation:
            trainer.validateInsert();
    
            const imageName = await fileSaver.add(trainer.image);
    
            const sql = `INSERT INTO trainers(firstName, lastName, imageName)
            VALUES(?,?,?)`;
            const info: OkPacketParams = await dal.execute(sql, [trainer.firstName, trainer.lastName, imageName]);
            trainer = await this.getOneTrainer(info.insertId);
            return trainer
        }

        public async updateTrainer(trainer: TrainerModel): Promise<TrainerModel> {
            // validate updated vacation:
            trainer.validateUpdate();
            // get old image name:
            const oldImageName = await this.getImageName(trainer.id);
    
            // update image in the hard disc:
            const newImageName = trainer.image ? await fileSaver.update(oldImageName, trainer.image) : oldImageName;
    
            const sql = `UPDATE trainers SET
            firstName = ?,
            lastName = ?,
            imageName = ?
            WHERE ID = ?
            `;
            const info: OkPacketParams = await dal.execute(sql, [trainer.firstName, trainer.lastName, newImageName, trainer.id]);
            if (info.affectedRows === 0) throw new ResourceNotFoundError(trainer.id);
            trainer = await this.getOneTrainer(trainer.id);
            return trainer
        }
    
        public async deleteTrainer(id: number): Promise<void> {
            // get image name:
            const imageName = await this.getImageName(id);
    
            // create sql:
            const sql = `DELETE from trainers where id = ?`;
    
            const info: OkPacketParams = await dal.execute(sql, [id]);
    
            if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    
            // delete image from hared disc:
            await fileSaver.delete(imageName);
    
        }
    
        private async getImageName(id: number): Promise<string> {
            // create sql:
            const sql = `SELECT imageName FROM trainers WHERE id= ?`;
            // execute:
            const trainers = await dal.execute(sql, [id]);
            // extract product:
            const trainer = trainers[0];
    
            if (!trainer) return null;
    
            const imageName = trainer.imageName;
    
            return imageName
        }

}
export const trainersService = new TrainersService();