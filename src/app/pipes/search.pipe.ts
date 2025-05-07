import { Pipe, PipeTransform } from '@angular/core';
import { iUser } from '../types/user.inteface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(users: iUser[], searchTerm: string): iUser[] {
    if (!users || !searchTerm) {
      return users;
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowerCaseTerm) ||
        user.second_name.toLowerCase().includes(lowerCaseTerm) ||
        user.email.toLowerCase().includes(lowerCaseTerm)
    );
  }
}