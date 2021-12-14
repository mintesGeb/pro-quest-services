import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catagory'
})
export class CatagoryPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.toUpperCase();
  }

}
