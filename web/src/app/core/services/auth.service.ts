import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isLoggedIn(): boolean{
    // Lógica para verificar si el usuario está autenticado
    return !!localStorage.getItem('token'); // solo un ejemplo simple
  }
}
