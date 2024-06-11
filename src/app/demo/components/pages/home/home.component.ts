import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    killers: any[] = [];

    constructor() { }

    ngOnInit(): void {
        console.log('here is home page.')
    }
}
