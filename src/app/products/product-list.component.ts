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
    validationErrors: IValidationErrors

    constructor(private productService: ProductService) { }

    ngOnInit(): void {


        this.productService.getFruit().subscribe (
            (result :any) => {
                this.validationErrors =result;
                console.log( "-------Apple Fruit ----- "  + JSON.stringify(this.validationErrors))
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
