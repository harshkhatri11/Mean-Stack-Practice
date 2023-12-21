import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  public transform(
    value: string,
    length: number | null,
    suffix: string = '...'
  ): string {
    const truncationLength: number = length ?? 300;
    return value.length > truncationLength
      ? `${value.slice(0, Math.ceil(truncationLength)).trim()}${suffix}`
      : value;
  }
}
