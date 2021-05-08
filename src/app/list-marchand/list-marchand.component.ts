import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor() {}
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
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        nom: `Ouedghiri Mohamed ${i}`,
        adress: `Qte Dakhla Rue Ahram N24`,
        cin: 'FA15268',
        ntel: '0670957962',
        activiter: 'Boucherie',
        status: 'active',
        datenaissance: new Date('dd/mm/yyyy'),
        matricul: '10265',
        soldecourant: 2500.9,
        service: `QODS`,
      });
    }
    this.listOfData = data;
    this.updateEditCache();
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
