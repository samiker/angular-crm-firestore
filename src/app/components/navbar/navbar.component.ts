import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser = null;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService._is_authenticated()
                    .subscribe(user => this.currentUser = user)
  }


  logout(){
    this.authService._logout()
                    .then( res => {
                      this.flashMessage.show(
                        "Your Account has been logged out",
                      {
                        cssClass: "alert-success",
                        timeout: 5000
                      }
                      )
                      this.router.navigate(['/login'])
                  })
                    .catch( error => {
                      this.flashMessage.show(
                        error.message,
                      {
                        cssClass: "alert-danger",
                        timeout: 5000
                      }
                      )                      
                    })
  }
}
