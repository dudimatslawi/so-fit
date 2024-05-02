import { Component, OnInit } from '@angular/core';
import { appStore } from '../../../redux/store';
import UserModel from '../../../models/user.model';
import { Router } from '@angular/router';
import TrainerModel from '../../../models/trainer.model';
import CommentModel from '../../../models/comment.model';
import { CommentsService } from '../../../services/comments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-comments-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './comments-list.component.html',
    styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit {
    public user: UserModel;
    public comment = new CommentModel();
    public comments: CommentModel[];

    public constructor(private router: Router, public commentsService: CommentsService) { }

    public async ngOnInit(): Promise<void> {
        this.user = appStore.getState().user
        if (!this.user) {
            alert("To write comment you must be logged in")
            this.router.navigateByUrl("/home")
        }

        await this.loadCommentsWithUserNames();
    }


    public async loadCommentsWithUserNames() {
        // Fetch comments
        this.comments = await this.commentsService.getAllComments();

        // Fetch user names for each comment
        await Promise.all(this.comments.map(async comment => {
            comment.userName = await this.getUserNameById(comment.userId);
        }));
    }

    async getUserNameById(userId: number): Promise<string> {
        const user = await this.commentsService.getUserNameById(userId);
        return user;
    }

    public async send(): Promise<void> {
        try {
            this.comment.userId = this.user.id;
            await this.commentsService.addComment(this.comment);
            alert("comment successfully added.");
            this.comments = await this.commentsService.getAllComments();
            // After adding the comment, reload all comments with user names
            await this.loadCommentsWithUserNames();

        }
    catch(err: any) {
        alert(err.message)
    }
}
}

