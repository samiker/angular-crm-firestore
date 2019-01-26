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

}
