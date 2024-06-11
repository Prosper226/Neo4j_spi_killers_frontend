import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {KillersService} from "../../../service/killers.service";
import {MessageService} from "primeng/api";
import {NetworkComponent} from "../killers/network/network.component";
import {CountryService} from "../../../service/country.service";
import {ConvictionsService} from "../../../service/convictions.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [MessageService, NetworkComponent, KillersService, CountryService, ConvictionsService]
})
export class HomeComponent implements OnInit {
    killers: any[] = [];

    constructor(private killerService: KillersService, private router: Router) { }

    ngOnInit(): void {
        console.log('here is home page.')
        this.loadKillers();
    }

    loadKillers(): void {
        this.killerService.getAllKillersForHome().subscribe(data => {
            this.killers = data;
        });
    }

    viewKiller(id: string): void {
        this.router.navigate(['/killers', id]);
    }

    addKiller(): void {
        this.router.navigate(['/killers/add']);
    }

    viewGraph(): void {
        this.router.navigate(['/graph/complete']);
    }
}
