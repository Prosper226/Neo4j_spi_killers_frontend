import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ContinentModel} from "../../model/continent.model";
import {ConvictionsService} from "../../service/convictions.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './convictions.component.html',
    providers: [MessageService, ConvictionsService]
})
export class ConvictionsComponent implements OnInit {

    rowsPerPageOptions = [5, 10, 20];

    convictionsList: ContinentModel[] = []

    cols: any[] = [];

    constructor(private  convictionService: ConvictionsService, private messageService: MessageService, private router: Router) { }

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

    showNodeGhaph(conviction: ContinentModel){
        // console.log(student.matricule)
        this.router.navigate(['graph/node/', conviction.id])
    }

}
