import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { iUser } from '../../types/user.inteface';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule, AvatarComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  private userservice = inject(UserServiceService);
  private router = inject(Router);
  @Input() user: iUser | null = null;
  @Input() isEditMode: boolean = false;
  showModal: boolean = false;
  userForm!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: [this.user?.first_name || ''],
      second_name: [this.user?.second_name || ''],
      email: [this.user?.email || ''],
      avatar: [this.user?.avatar || ''],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid && this.isEditMode === true) {
      this.edit();
    }
    if (this.userForm.valid && this.isEditMode === false) {
      this.save();
    }
  }
  openModal() {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onImageSelected(imageUrl: string): void {
    this.userForm.get('avatar')?.setValue(imageUrl);
    this.closeModal();
  }

  save() {
    this.userservice.createUserService(this.userForm.value).subscribe({
      next: (res: any) => {
        this.userForm.reset();
        this.router.navigate(['/user-list']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  edit() {
    this.userservice
      .updateUserService(this.user?.id ?? '', this.userForm.value)
      .subscribe({
        next: (res: any) => {
          this.userForm.reset();
          this.router.navigate(['/user-list']);
        },
        error: (err: any) => {
          this.error = err.toString();
        },
      });
  }
}
