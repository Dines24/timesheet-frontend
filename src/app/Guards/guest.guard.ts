import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { ApiService } from './../api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate  {
  constructor( private route: Router){}
  // export class GuestGuard   {
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const guest = localStorage.getItem('auth_token')? false: true;
      if(!guest){
        this.route.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    
}
