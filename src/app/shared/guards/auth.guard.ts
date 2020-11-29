import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { SnackServices } from '../services/snack.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private snack: SnackServices) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}
