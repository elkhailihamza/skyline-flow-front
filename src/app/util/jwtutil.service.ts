import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtutilService {

  constructor(private readonly jwtHelper: JwtHelperService) {}

  isJwtValid(token: string): boolean {
      if (!token || token === '') {
          return false;
      }
      const parts = token.split('.');
      if (parts.length !== 3) {
          return false;
      }
      const decoded = this.jwtHelper.urlBase64Decode(parts[1]);
      if (!decoded) {
          return false;
      }
      return true;
  }
}
