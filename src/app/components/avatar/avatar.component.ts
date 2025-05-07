import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  listImages: string[] = [];
  @Input() showModal: boolean = false;
  @Output() imageSelected = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  selectImage(imageUrl: string): void {
    this.imageSelected.emit(imageUrl);
  }

  close(): void {
    this.closeModal.emit();
  }

  ngOnInit() {
    for (let index = 1; index < 25; index++) {
      this.listImages.push(`https://robohash.org/${index}`);
    }
  }
}
