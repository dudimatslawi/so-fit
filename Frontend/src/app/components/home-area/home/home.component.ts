import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { TrainersListComponent } from '../trainers-list/trainers-list.component';
import { RouterLink } from '@angular/router';
import UserModel from '../../../models/user.model';
import { appStore } from '../../../redux/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselComponent, TrainersListComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
