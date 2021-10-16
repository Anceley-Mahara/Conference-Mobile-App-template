import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the FacebookvideosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'facebookvideos',
})
export class FacebookvideosPipe implements PipeTransform {

  constructor(private dom: DomSanitizer){

  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args) {
    //return value.toLowerCase();
    //console.log(value);
return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
