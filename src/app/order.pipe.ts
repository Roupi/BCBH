import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any, propName: string, increscent: boolean): any {

    if (increscent){
      return value.sort(
        (a, b) => {
          if (a[propName] > b[propName]){
            return 1;
          } else {
            return -1;
          }
        }
      );
    } else {
      return value.sort(
        (a, b) => {
          if (a[propName] < b[propName]){
            return 1;
          } else {
            return -1;
          }
        }
      );
    }
  }

}
