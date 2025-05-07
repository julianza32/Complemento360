import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUser } from '../types/user.inteface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  private url = 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1';

  getUsersService(): Observable<iUser[]>{
    return this.http.get<iUser[]>(this.url + '/users');
  }
  getUserService(id: string): Observable<iUser>{
    return this.http.get<iUser>(this.url + '/users/' + id) ;
  }
 
  createUserService(user: iUser): Observable<any>{
    return this.http.post(this.url + '/users', user);
  }
  updateUserService(id: string, user: any): Observable<any>{
    return this.http.put(this.url + '/users/' + id, user);
  }
  
  deleteUserService(id: string) : Observable<any>{
    return this.http.delete(this.url + '/users/' + id);
  }

}
