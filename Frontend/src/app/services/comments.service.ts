import { HttpClient } from "@angular/common/http";
import WorkoutModel from "../models/workout.model";
import { appConfig } from "../utils/app.config";
import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import CommentModel from "../models/comment.model";
import UserModel from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class CommentsService {
    constructor(private http: HttpClient) { }

    public async getAllComments(): Promise<CommentModel[]> {
        const observable = this.http.get<CommentModel[]>(appConfig.commentsUrl); //returns an observable object
        const comments = await firstValueFrom(observable);
        return comments
    };

    public async getOneComment(id: number): Promise<CommentModel> {
        const observable = this.http.get<CommentModel>(appConfig.commentsUrl + id); //returns an observable object
        const comment = await firstValueFrom(observable);
        return comment
    }

    public async addComment(comment: CommentModel): Promise<void> {
        const observable = this.http.post<CommentModel>(appConfig.commentsUrl, comment);
        const addedComment = await firstValueFrom(observable);
        console.log(addedComment);
    }

    public async getUserNameById(id: number): Promise<string> {
        const observable = this.http.get<UserModel>(appConfig.usersUrl + id); //returns an observable object
        const user = await firstValueFrom(observable);
        return `${user.firstName} ${user.lastName}`
    }





}