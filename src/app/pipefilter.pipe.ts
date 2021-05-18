import { Pipe, PipeTransform } from '@angular/core';
import { Marchand } from './shared/marchand.model';

@Pipe({
  name: 'pipefilter'
})
export class PipefilterPipe implements PipeTransform {

  transform(Marchands :Marchand[],searchValue:any ,type:string): any {
     if(!Marchands || !searchValue)
     {
       console.log(searchValue)

      return Marchands;
    }
    if(type =="nom")
    return Marchands.filter(marchand=>marchand.nom?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    if(type =="matricule")
    return Marchands.filter(marchand=>marchand.matricule?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    if(type =="service")
    return Marchands.filter(marchand=>marchand.service?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
   }

}
