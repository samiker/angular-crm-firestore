import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = "";
  password = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  register(){
    this.authService._register(this.email, this.password)
                    .then( res=>console.log(res) )
                    .catch( error => console.log(error))
  }

}
