import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.auth.cantAccessThisPage(route.data['id'])) {
      return true
    } else {

      this.router.navigate(['/home'], { replaceUrl: true })
      return false
    }

  }

  constructor(private auth: AuthenticationService, private router: Router) { }



}
