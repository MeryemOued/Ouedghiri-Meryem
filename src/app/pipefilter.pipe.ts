import { Pipe, PipeTransform } from '@angular/core';
import { Marchand } from './shared/marchand.model';

@Pipe({
  name: 'pipefilter'
})
export class PipefilterPipe implements PipeTransform {

  transform(Marchands :Marchand[],searchValue:any): Marchand[] {
    console.log("pipe Search")
     if(!Marchands || !searchValue)
     {
       console.log(searchValue)

      return Marchands;
    }
    console.log(searchValue)
    return Marchands.filter(marchand=>
      // console.log(marchand.platforms?.label),
      // console.log(searchValue)
      // console.log(marchand.platforms?.idPlatform) ||
      marchand.firstname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      marchand.lastname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      marchand.matricule?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.cin?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.platforms?.label?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      marchand.activities?.label?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
    );
    
   }

}