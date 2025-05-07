import { Component, inject, Inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { iUser } from '../../types/user.inteface';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../components/loading/loading.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserCardComponent, UserCardComponent, LoadingComponent,  FormsModule, SearchPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private userService: UserServiceService = inject(UserServiceService);
  private router = inject(Router);
  users: iUser[] = [];
  user: iUser | null = null;
  loading: boolean = false;
  error: string = '';
  searchTerm: string = '';
  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsersService().subscribe({
      next: (data: iUser[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        this.error = 'Error al obtener los usuarios';
        console.error('Error al encontrar los usuarios:', error);
      },
    });
  }
  navigateNewUser() {
    this.router.navigate(['/new-user']);
  }
  deleteUser(id: string): void {
    this.userService.deleteUserService(id).subscribe({
      next: (res: any) => {
        this.getUsers();
      },
      error: (error: any) => {
        console.error('Error al eliminar el usuario:', error);
      },
    });
  }
}
