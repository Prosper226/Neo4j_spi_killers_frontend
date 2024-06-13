import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { Table } from 'primeng/table';
import {Router} from "@angular/router";
import {KillersService} from "../../service/killers.service";
import {ContinentModel} from "../../model/continent.model";
import {KillerModel} from "../../model/killer.model";
import {CountryService} from "../../service/country.service";
import {CountryModel} from "../../model/country.model";
import {ConvictionModel} from "../../model/conviction.model";
import {ConvictionsService} from "../../service/convictions.service";
import {forkJoin} from "rxjs";

@Component({
    templateUrl: './victims.component.html',
    providers: [MessageService, KillersService, CountryService, ConvictionsService]
})
export class VictimsComponent implements OnInit {

    formDialog: boolean = false;        // modal pour ajouter ou modifier un objet
    deleteDialog: boolean = false;      // modal pour confirmer la supprimer


    killer: KillerModel = {};           // objet
    killersList: KillerModel[] = []     // listes d'objets

    countriesList: CountryModel[] = []
    convictionsList: ConvictionModel[] = []

    submitted: boolean = false;


    cities: SelectItem[] = [];
    selectedDrop: SelectItem = { value: '' };
    // countrySelectedMulti: CountryModel[] = [];
    countrySelectedMulti: CountryModel[] = [];
    convictionSelectedMulti: ConvictionModel[] = [];
    maxSelections = 1;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService,
                private router: Router,
                private killerService : KillersService,
                private  countryService: CountryService,
                private convictionService: ConvictionsService) { }

    ngOnInit() {
        this.loadAll();
    }

    openNew() {
        this.killer = {};
        this.countrySelectedMulti = [];
        this.convictionSelectedMulti = [];
        this.submitted = false;
        this.loadCountries();
        this.loadConvictions();
        this.formDialog = true;
    }

    // edit(killer: KillerModel) {
    //     this.killer = { ...killer };
    //     this.loadCountries();
    //     this.loadConvictions();
    //     // this.countrySelectedMulti[0] = this.countriesList.find(e => this.killer.country )
    //     this.countrySelectedMulti = [this.countriesList.find(c => c.label == this.killer.nationality)]
    //     this.convictionSelectedMulti = this.convictionsList.filter(conviction => this.killer.convicted.includes(conviction.label));
    //     console.log(this.convictionSelectedMulti)
    //
    //     this.formDialog = true;
    // }

    edit(killer: KillerModel) {
        this.killer = { ...killer };

        // Charger les pays et les convictions
        forkJoin({
            countries: this.countryService.getAllCountries(),
            convictions: this.convictionService.getAllConvictions()
        }).subscribe(({ countries, convictions }) => {
            this.countriesList = countries;
            this.convictionsList = convictions;

            // Maintenant que les données sont chargées, vous pouvez effectuer les sélections
            this.countrySelectedMulti = [this.countriesList.find(c => c.label === this.killer.nationality)];
            this.convictionSelectedMulti = this.convictionsList.filter(conviction => this.killer.convicted.includes(conviction.label));


            // Ouvrir le formulaire de dialogue
            this.formDialog = true;
        });
    }


    hideDialog() {
        this.formDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        let country = this.extractId(this.countrySelectedMulti);
        let convictions = this.extractId(this.convictionSelectedMulti);
        this.killer.country = country[0];
        // @ts-ignore
        this.killer.convicted = convictions;
        console.log(this.killer);
        this.submitted = true;

        if (this.killer.id) {
            // updated
            this.killerService.updateKiller(this.killer).subscribe(
                (res) => {
                    console.log(res);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: '1 ligne a été mise à jour.',
                        life: 3000
                    });
                    this.loadAll();  // Recharger les données après mise à jour
                },
                (err) => {
                    console.error(err);
                }
            );
        } else {
            // created
            this.killerService.createKiller(this.killer).subscribe(
                (res) => {
                    console.log(res);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: '1 ligne nouvelle a été créée.',
                        life: 3000
                    });
                    this.loadAll();  // Recharger les données après création
                },
                (err) => {
                    console.error(err);
                }
            );
        }
        this.formDialog = false;
        this.killer = {};
        this.countrySelectedMulti = [];
        this.convictionSelectedMulti = [];
        // this.loadAll();  // Optionnel, selon où vous souhaitez appeler cette méthode
    }



    onSelectionChange(event) {
        if (this.countrySelectedMulti.length > this.maxSelections) {
            this.countrySelectedMulti.pop();
            alert(`Vous pouvez sélectionner jusqu'à ${this.maxSelections} nationalités.`);
        }
    }

    extractId(objects: any[]): string[] {
        if (!Array.isArray(objects)) {
            throw new Error("L'entrée doit être un tableau");
        }
        return objects.map(object => object.id);
    }

    delete(killer: KillerModel) {
        this.deleteDialog = true;
        this.killer = { ...killer };
    }

    confirmDelete() {
        this.deleteDialog = false;
        this.killerService.deleteKiller(this.killer.id).subscribe(
            (res) => {
                console.log(res)
                this.loadAll();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: '1 ligne supprimée', life: 3000 });
            }
        )
        this.killer = {};
    }

    loadAll(){
        this.killerService.getAllKillers().subscribe(
            (res) => {
                console.log(res)
                this.killersList = res
            }
        )
    }

    loadCountries(){
        this.countryService.getAllCountries().subscribe(
            (res) => {
                console.log(res)
                this.countriesList = res
            }
        )
    }

    loadConvictions(){
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

    showNodeGhaph(killer: KillerModel){
        // console.log(student.matricule)
        this.router.navigate(['graph/node/', killer.id])
    }
}
