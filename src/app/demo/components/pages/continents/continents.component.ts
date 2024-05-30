import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {ContinentModel} from "../../../model/continent.model";
import {ContinentsService} from "../../../service/continents.service";

@Component({
    templateUrl: './continents.component.html',
    providers: [MessageService, ContinentsService]
})
export class ContinentsComponent implements OnInit {

    rowsPerPageOptions = [5, 10, 20];

    continentList: ContinentModel[] = []

    cols: any[] = [];

    constructor(private  continentService: ContinentsService, private messageService: MessageService) { }

    ngOnInit() {

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'label', header: 'Label' },
            { field: 'area', header: 'Area' },
            { field: 'uri', header: 'Uri' }
        ];

        this.continentService.getAllContinents().subscribe(
            (res) => {
                console.log(res)
                this.continentList = res
            }
        )
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
