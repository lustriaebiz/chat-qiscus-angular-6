import { Injectable } from '@angular/core';
import { iUser } from 'src/app/interfaces/iUser';

const users: iUser[] = [
  { username: 'Lustria', email: 'lustria@gmail.com', password: 'password' },
  { username: 'Ebiz', email: 'ebiz@gmail.com', password: 'password' },
];

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  getUsers(): Promise<iUser[]> {
    return Promise.resolve(users)
  }
  
}
