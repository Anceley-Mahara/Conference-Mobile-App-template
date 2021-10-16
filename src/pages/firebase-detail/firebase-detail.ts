//import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
    selector: 'post-detail',
    templateUrl: 'firebase-detail.html'
})
export class FirebaseDetail {
    selectedItem: any;

    constructor(public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

}
/**
 * Generated class for the PostDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
