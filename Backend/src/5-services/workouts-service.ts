import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { TrainerModel } from "../3-models/trainer-model";
import { WorkoutTypeModel } from "../3-models/workout-type-model";
import { appConfig } from "../2-utils/app-config";
import { ResourceNotFoundError } from "../3-models/client-errors";

class WorkoutService {

    public async getAllWorkoutTypes(): Promise<WorkoutTypeModel[]> {
        const sql = `SELECT * FROM workout_types`;
        const workoutTypes = await dal.execute(sql);
        return workoutTypes
    }

    public async getOneWorkout(id: number): Promise<WorkoutTypeModel> {
        const sql = `SELECT * FROM workout_types WHERE id = ?`
        const workouts = await dal.execute(sql, [id]);
        const workout = workouts[0];
        if (!workout) throw new ResourceNotFoundError(id);
        return workout
    }

    public async getWorkoutsByTrainerId(trainerId: number): Promise<WorkoutTypeModel[]> {
        const sql = `SELECT * FROM workout_types WHERE trainerId = ?`
        const workouts = await dal.execute(sql, [trainerId]);
        return workouts
    }


    public async addWorkout(workout: WorkoutTypeModel): Promise<WorkoutTypeModel> {

        // validate the insert vacation:
        workout.validateInsert();

        const sql = `INSERT INTO workout_types(name, description, durationInMins, trainerId)
        VALUES(?,?,?,?)`;

        const info: OkPacketParams = await dal.execute(sql, [workout.name, workout.description, workout.durationInMins, workout.trainerId]);
        workout = await this.getOneWorkout(info.insertId);
        return workout
    }

    public async updateWorkout(workout: WorkoutTypeModel): Promise<WorkoutTypeModel> {
        // validate updated vacation:
        workout.validateUpdate();

        const sql = `UPDATE workout_types SET
        name = ?,
        description = ?,
        durationInMins = ?,
        trainerId = ?
        WHERE id = ?
        `;
        const info: OkPacketParams = await dal.execute(sql, [workout.name, workout.description, workout.durationInMins, workout.trainerId, workout.id]);
        if (info.affectedRows === 0) throw new ResourceNotFoundError(workout.id);
        workout = await this.getOneWorkout(workout.id);
        return workout
    }

    public async deleteWorkout(id: number): Promise<void> {

        // create sql:
        const sql = `DELETE from workout_types where id = ?`;

        const info: OkPacketParams = await dal.execute(sql, [id]);

        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

    }

}

export const workoutService = new WorkoutService();
