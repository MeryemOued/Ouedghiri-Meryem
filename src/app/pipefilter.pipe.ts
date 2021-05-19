import { Pipe, PipeTransform } from '@angular/core';
import { Marchand } from './shared/marchand.model';

@Pipe({
  name: 'pipefilter'
})
export class PipefilterPipe implements PipeTransform {

  transform(Marchands :Marchand[],searchValue:any): Marchand[] {
     if(!Marchands || !searchValue)
     {
       console.log(searchValue)

      return Marchands;
    }
    return Marchands.filter(marchand=>
      marchand.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      marchand.matricule?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.cin?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.service?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.activiter?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    
   }

}