import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marchand } from 'src/app/shared/marchand.model';
import { MarchandService } from 'src/app/shared/marchand.service';
interface ItemData {
  id: string;
  matricul: string;
  nom: string;
  adress: string;
  cin: string;
  ntel?: string;
  activiter: string;
  status: string;
  datenaissance: Date;
  soldecourant: number;
  service: string;
}

@Component({
  selector: 'app-list-marchand',
  templateUrl: './list-marchand.component.html',
  styleUrls: ['./list-marchand.component.css'],
})
export class ListMarchandComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  isCollapsed = false;
  constructor(public service: MarchandService,private route:ActivatedRoute,private router :Router) {}

  ngOnInit(): void {
this.service.refreshTable();
  }
  EditMarchand(selectedRow :Marchand){
    this.service.FormData=Object.assign({},selectedRow);
    }

}
