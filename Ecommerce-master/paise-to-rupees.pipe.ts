import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paiseToRupees'
})
export class PaiseToRupeesPipe implements PipeTransform {

  constructor(private currencyPipe:CurrencyPipe){}

  transform(value: number):string | null {
    if(!value){
      return "";
    }
    const rupees: number= value/100;

    return this.currencyPipe.transform(rupees,'INR');
  }

}
