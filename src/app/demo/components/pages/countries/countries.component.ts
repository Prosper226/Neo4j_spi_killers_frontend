import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {ContinentModel} from "../../../model/continent.model";
import {ContinentsService} from "../../../service/continents.service";
import {CountryModel} from "../../../model/country.model";
import {CountryService} from "../../../service/country.service";

@Component({
    templateUrl: './countries.component.html',
    providers: [MessageService, CountryService]
})
export class CountriesComponent implements OnInit {

    rowsPerPageOptions = [5, 10, 20];

    countriesList: CountryModel[] = []

    cols: any[] = [];

    constructor(private  countryService: CountryService, private messageService: MessageService) { }

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
}
