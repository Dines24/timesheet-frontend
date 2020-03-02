import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    const auth = localStorage.getItem('auth_token')? true: false;
    if(!auth){
      this.route.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
