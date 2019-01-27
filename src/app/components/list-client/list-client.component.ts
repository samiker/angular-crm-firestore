import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];
  authenticated = 0;
  
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.clientService._getClients()
                      .subscribe(
                        (res: Client[]) => this.clients = res
                        );
  }

  removeClient(id) {
    this.clientService._removeClient(id)
    .then((res) => console.log(res))
    .catch((error) => console.error(error))
  }

  
  toggleActive(client) {
    
    this.clientService._setActive(
      client.id,
      {
      active: !client.active
      }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

}
