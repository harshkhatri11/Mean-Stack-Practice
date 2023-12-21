import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(list: any, searchText: string): any[] {
    if (!list) {
      return [];
    }
    if (!searchText) {
      return list;
    }

    // Method 1 for case sensitive

    // const value = list.replace(
    //   searchText,
    //   `<span class='highlight'>${searchText}</span>`
    // );
    // return value;

    // Method 2 for case  insensitive

    const re = new RegExp(searchText, 'gi');
    const match = list.match(re);

    if (!match) {
      return list;
    }

    const value = list.replace(
      re,
      `<span class='highlight'>${match[0]}</span>`
    );
    return value;
  }
}
