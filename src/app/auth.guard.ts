import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authenticationService: AuthenticationService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser=this.authenticationService.currentUserValue;
    if(currentUser)
    return true;
    this.router.navigate(['/login']);
    return false;
  }
  
}