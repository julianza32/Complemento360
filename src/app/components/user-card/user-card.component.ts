import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../../types/user.inteface';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  private router = inject(Router);
  private userService = inject(UserServiceService);
  @Input() user: iUser = {} as iUser;
  @Output() delete = new EventEmitter<string>(); // Emite el ID del usuario a eliminar

  showDialog: boolean = false;
  idUser: string = '';
  onEdit(id: string) {
    this.router.navigate(['/user', id]);
  }
  onDelete(id: string) {
    this.showDialog = true;
    this.idUser = id;
  }

  confirmDelete(): void {
    this.delete.emit(this.user.id);
    this.closeDialog();
  }

  closeDialog(): void {
    this.showDialog = false;
    this.idUser = '';
  }
}
