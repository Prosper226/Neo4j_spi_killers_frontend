import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {CountryModel} from "../../model/country.model";
import {CountryService} from "../../service/country.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './countries.component.html',
    providers: [MessageService, CountryService]
})
export class CountriesComponent implements OnInit {

    rowsPerPageOptions = [5, 10, 20];

    countriesList: CountryModel[] = []

    cols: any[] = [];

    constructor(private  countryService: CountryService, private messageService: MessageService, private router: Router) { }

    ngOnInit() {

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'label', header: 'Label' },
            { field: 'capital', header: 'Capital' },
            { field: 'continent', header: 'Continent' },
            { field: 'area', header: 'Area' },
            { field: 'uri', header: 'Uri' }
            // m9?_(P3@Bazfe-A
        ];

        this.countryService.getAllCountries().subscribe(
            (res) => {
                console.log(res)
                this.countriesList = res
            }
        )
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showNodeGhaph(country: CountryModel){
        // console.log(student.matricule)
        this.router.navigate(['graph/node/', country.id])
    }
}
