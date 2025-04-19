import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'plusOne',
})
export class PlusOnePipe implements PipeTransform {

  transform(value: number): string {
    return (value + 1).toString();
  }

}
