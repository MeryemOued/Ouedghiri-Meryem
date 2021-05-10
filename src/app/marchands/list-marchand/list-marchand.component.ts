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

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  i = 0;
  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        nom: ` ${this.i}`,
        adress: ``,
        cin: '8',
        ntel: '',
        activiter: '',
        status: '',
        datenaissance: new Date('dd/mm/yyyy'),
        matricul: '',
        soldecourant: 0,
        service: ``,
      },
    ];
    this.i++;
  }
  marchandObj:any
    // NAVIGATE TO ADD MARCHAND WITH DATA

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  ngOnInit(): void {
this.service.refreshTable();

    this.updateEditCache();
  }
  EditMarchand(selectedRow :Marchand){
    this.service.FormData=selectedRow;
    // this.router.navigate(['/addmarchand']),{
    //   queryParams:{}
    // }

    // console.log(this.marchandObj.nom);
    }
  copylistOfData = [...this.listOfData];

  search(search: any) {
    console.log(search);
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (
          value[keys[i]] &&
          value[keys[i]].toString().toLocaleLowerCase().includes(search)
        ) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.listOfData = targetValue;
  }
}
