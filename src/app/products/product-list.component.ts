import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { IFruit } from '../fruits/fruit';
import { ValidationMessage } from '../fruits/validationMessage';
import { IValidationErrors } from '../fruits/validationErrors';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    fruit:IFruit;

    validationMessages: ValidationMessage[];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {

        // this.productService.getArrayasObservable().subscribe (
        //     (f :IFruit) => {
        //         this.fruit =f;
        //         console.log( "-------Orange ----- "  + JSON.stringify(this.fruit))
        //     }
        // );

        this.productService.getFruit().subscribe (
            (vms :ValidationMessage[]) => {
                this.validationMessages =vms;
                console.log( "-------Apple Fruit ----- "  + JSON.stringify(this.validationMessages))
            }
        );

        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
