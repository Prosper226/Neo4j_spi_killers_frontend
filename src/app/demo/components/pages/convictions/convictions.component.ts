import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {ContinentModel} from "../../../model/continent.model";
import {ContinentsService} from "../../../service/continents.service";
import {ConvictionsService} from "../../../service/convictions.service";

@Component({
    templateUrl: './convictions.component.html',
    providers: [MessageService, ConvictionsService]
})
export class ConvictionsComponent implements OnInit {

    rowsPerPageOptions = [5, 10, 20];

    convictionsList: ContinentModel[] = []

    cols: any[] = [];

    constructor(private  convictionService: ConvictionsService, private messageService: MessageService) { }

    ngOnInit() {

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'label', header: 'Label' },
            { field: 'uri', header: 'Uri' }
        ];

        this.convictionService.getAllConvictions().subscribe(
            (res) => {
                console.log(res)
                this.convictionsList = res
            }
        )
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
