// network.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Network } from 'vis-network/standalone/esm/vis-network';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";


@Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
    standalone: true,
    styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
    @ViewChild('networkContainer', { static: true }) networkContainer: ElementRef;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // this.sampleGraph()
        this.loadNetworkData('/graph/killers-continents');
    }

    loadNetworkData(endpoint: string): void {
        this.http.get<any>(`${environment.api}${endpoint}`)
            .subscribe(data => {
                console.log(data)
                const nodes = data.nodes;
                const edges = data.edges;

                const networkData = { nodes, edges };
                const options = {
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
                        color: { inherit: "from" },
                        smooth: {
                            type: "continuous",
                        },
                        arrows: {
                            to: { enabled: true, scaleFactor: 1 }
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
                const network = new Network(this.networkContainer.nativeElement, networkData, options);
            });
    }

    sampleGraph(): void{
        const nodes = [
            { id: "K1", label: "Ted Bundy", type: "killer", title: "Ted Bundy\nType: Killer\nTed Bundy was an American serial killer who kidnapped, raped, and murdered numerous young women and girls during the 1970s.", color: { background: 'red' } },
            { id: "K2", label: "Jeffrey Dahmer", type: "killer", title: "Jeffrey Dahmer\nType: Killer\nJeffrey Dahmer, also known as the Milwaukee Cannibal, was an American serial killer and sex offender who committed the murder and dismemberment of 17 men and boys.", color: { background: 'red' } },
            { id: "V1", label: "Victim A", type: "victim", title: "Victim A\nType: Victim\nVictim A was one of the many victims of Ted Bundy.", color: { background: 'green' } },
            { id: "V2", label: "Victim B", type: "victim", title: "Victim B\nType: Victim\nVictim B was another victim of Ted Bundy.", color: { background: 'green' } },
            { id: "V3", label: "Victim C", type: "victim", title: "Victim C\nType: Victim\nVictim C was one of the victims of Jeffrey Dahmer.", color: { background: 'green' } }
        ];

        // Liens entre les tueurs et les victimes
        const edges = [
            { from: "K1", to: "V1", color: { color: 'blue' }, title: "Ted Bundy killed Victim A." },
            { from: "K1", to: "V2", color: { color: 'blue' }, title: "Ted Bundy killed Victim B." },
            { from: "K2", to: "V3", color: { color: 'blue' }, title: "Jeffrey Dahmer killed Victim C." },
            { from: "K1", to: "K2", color: { color: 'yellow' }, title: "Ted Bundy killed Jeffrey Dahmer." }
        ];

        const data = {
            nodes: nodes,
            edges: edges
        };
        const options = {
            nodes: {
                shape: "dot",
                scaling: {
                    min: 10,
                    max: 30,
                },
                font: {
                    size: 12,
                    face: "Tahoma",
                },
            },
            edges: {
                width: 2,
                color: { inherit: "from" },
                smooth: {
                    type: "continuous",
                },
                arrows: {
                    to: { enabled: true, scaleFactor: 1 }
                },
            },
            physics: {
                stabilization: false,
                barnesHut: {
                    gravitationalConstant: -80000n,
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
        const network = new Network(this.networkContainer.nativeElement, data, options);

    }

}
