import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { iUser } from '../../types/user.inteface';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-user',
  imports: [UserFormComponent, CommonModule, LoadingComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  user: iUser | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUser(userId);
    }
  }

  getUser(id: string): void {
    this.loading = true;
    this.userService.getUserService(id).subscribe({
      next: (data: iUser) => {
        this.user = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        console.error('Error al obtener el usuario:', error);
      },
    });
  }
}
