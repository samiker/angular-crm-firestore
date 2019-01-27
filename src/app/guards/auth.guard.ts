import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //user = null;

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean> {
      
    return this.authService._is_authenticated().pipe(
      map(user => {
        if(user) {
          return true
        }else {
          this.router.navigate(['/login'])
          return false;
        }
      })
    );
    
    // if (this.user){
    //   console.log("hello");
    //   return true;
    // }
    // else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    //return this.user ? true : false;
    //return !!this.user; //python & js
  }
}
