import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {KillersService} from "../../service/killers.service";
import {MessageService} from "primeng/api";
import {CountryService} from "../../service/country.service";
import {ConvictionsService} from "../../service/convictions.service";
import {KillerModel} from "../../model/killer.model";
import {MatDialog} from "@angular/material/dialog";
import {Network} from "vis-network";
import { DataSet } from 'vis-network/standalone';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    providers: [MessageService, KillersService, CountryService, ConvictionsService]
})
export class LandingComponent implements OnInit{

    // constructor(public layoutService: LayoutService, public router: Router, private killerService: KillersService) { }
    killers: KillerModel[] = [];
    filteredKillers: KillerModel[] = [];
    selectedKiller: KillerModel = null;
    showModal: boolean = false;
    searchTerm: string = '';

    constructor(private killerService: KillersService,  private router: Router, public dialog: MatDialog, private http: HttpClient) {}

    ngOnInit(): void {
        this.killerService.getAllKillersForHome().subscribe(data => {
            this.killers = data;
            this.filteredKillers = data;
        });
    }

    ngAfterViewInit(): void {
        this.initializeNetwork();
    }

    filterKillers(): void {
        this.filteredKillers = this.killers.filter(killer =>
            killer.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            killer.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            killer.nationality.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    openDetailModal(killer: any): void {
        this.selectedKiller = killer;
        this.showModal = true;
        setTimeout(() => this.initializeNetwork(), 100); // Delay to ensure modal is visible
    }

    closeModal(): void {
        this.showModal = false;
    }

    initializeNetwork2(): void {
        if (this.showModal && this.selectedKiller) {
            const container = document.getElementById('network');
            const data = {
                nodes: [
                    { id: 1, label: 'Killer', shape: 'circularImage', image: this.selectedKiller.image },
                    { id: 2, label: 'Victim 1' },
                    { id: 3, label: 'Victim 2' },
                    // Add more nodes as necessary
                ],
                edges: [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    // Add more edges as necessary
                ]
            };
            const options = {};
            new Network(container, data, options);
        }
    }

    viewGraph(killer: KillerModel): void {
        // Implement the logic to view the graph for a specific killer
        console.log(`Viewing graph for killer with ID: ${killer.id}`);
        this.router.navigate(['graph/node/', killer.id])
    }

    initializeNetwork(): void {
        if (this.showModal && this.selectedKiller) {
            const container = document.getElementById('network');
            let endpoint = `/graph/node/${this.selectedKiller.id}`
            this.http.get<any>(`${environment.api}${endpoint}`)
                .subscribe(data => {
                    console.log(data)
                    const nodes = data.nodes;
                    const edges = data.edges;

                    const networkData = {nodes, edges};
                    const options:any = {
                        nodes: {
                            shape: "dot",
                            scaling: {
                                min: 20,
                                max: 30,
                            },
                            font: {
                                size: 12,
                                face: "Tahoma",
                            },
                        },
                        edges: {
                            width: 5,
                            color: {inherit: "from"},
                            smooth: {
                                type: "continuous",
                            },
                            arrows: {
                                to: {enabled: true, scaleFactor: 1}
                            },
                        },
                        physics: {
                            stabilization: false,
                            barnesHut: {
                                gravitationalConstant: -80000,
                                springConstant: 0.001,
                                springLength: 200,
                            },
                        },
                        interaction: {
                            tooltipDelay: 200,
                            hideEdgesOnDrag: true,
                            navigationButtons: true, // Show zoom buttons
                            keyboard: true, // Enable keyboard controls
                            zoomView: true // Enable zooming
                        },
                    };
                    // @ts-ignore
                    const network = new Network(container, networkData, options);
                });
        }
    }
}
