import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) { }

  client: Client = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    balance: 0,
    active: false
  };

  id = "";
  ngOnInit() {
    this.id = this.route.snapshot.params.idclient;
    this.clientService._getClient(this.id)
                      .subscribe(
                        (client: Client) => {
                        this.client = client;                      
                      }
                      )
  }


  updateClient(form){
    if (form.valid){
      this.client.id = this.id;
      this.clientService._updateClient(this.client)
          .then((res) => this.router.navigate(['/']))
          .catch((error) => console.log(error));
    }
    else {
      alert('form invalid');
    }
  }



}
