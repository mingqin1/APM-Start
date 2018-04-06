import { Injectable, group } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { catchError, tap, map, groupBy, flatMap, toArray } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/groupBy';


import { IProduct } from './product';

import { IFruit } from '../fruits/fruit';
import { ValidationMessage } from '../fruits/validationMessage';
import { IValidationErrors } from '../fruits/validationErrors';
import { IUser } from '../user/user';

@Injectable()
export class ProductService {
    private productsUrl = 'api/products';
    private fruitUrl = 'api/fruit';

    constructor(private http: HttpClient) { }



    getFruit(): Observable<IValidationErrors> {

        let dict = { alice: 34, bob: 24, chris: 62 };
        let people = [];

        for (var name in dict) {
            people.push(name + ": " + dict[name]);
        }
        
        console.log(  ' people:' + people);

        let fruit: IFruit;
        let validErrors: IValidationErrors;

        let aValidationMessage = {
            message: 'a validation Message ',
            type: 'warning'
        };

        let bValidationMessage = {
            message: 'b validation message ',
            type: 'datal'
        };


        let validationMessages: ValidationMessage[];

        validationMessages = [aValidationMessage, bValidationMessage];


         validErrors = {
           ['']: null
           
         }
       
        validErrors['ago_out']=validationMessages;
        validErrors['color_fake']=validationMessages;

        delete validErrors[''];

        alert (  Object.keys(validErrors).length);

        fruit = {
            name: 'apple',
            validationErrors: validErrors
        }

      
        //groupby is working

        // const message = [
        //     {
        //         "message": " c color fake validation message ",
        //         "propertyPath": "color_fake"
        //     },

        //     {
        //         "message": "a age out validation Message ",
        //         "propertyPath": "age_out"
        //     },
        //     {
        //         "message": " c color fake validation message ",
        //         "propertyPath": "color_fake"
        //     },
        //     {
        //         "message": "b age out validation message ",
        //         "propertyPath": "age_out"
        //     },


        // ];

        // const source = from(message);

        // //group by propetyPath
        // const example = source.pipe(
        //     groupBy(message => message.propertyPath),

        // ).pipe(
        //      // return each item in group as array
        //      flatMap(group => group.pipe(toArray()  ))


        // );
        // const subscribe = example.subscribe(val => console.log(JSON.stringify(val)));


        return this.http.get<ValidationMessage[]>(this.fruitUrl)
            .pipe(
                map((responses:any) => {
                    let validationMessages: Array<ValidationMessage> = [];
                    let keys: Array<string> = new Array<string>();

                    let result: IValidationErrors;
                    if (responses) {
                        responses.forEach((response) => {
                            validationMessages.push(
                                new ValidationMessage(response.message,
                                    response.propertyPath)
                            );
                            keys.push(response.propertyPath);
                        })
                    }
                    // result key size after removing duplicated ones
                    let keyTypes = keys.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });

                    // result key matched array of valiationMessage
                    let vidaMsgArry = new Array<Array<ValidationMessage>>(keyTypes.length);
                    let i: number;
                    for (i = 0; i < keyTypes.length; i++) {
                        vidaMsgArry[i] = new Array<ValidationMessage>();
                    }

                    validationMessages.forEach((validationMessage) => {
                        vidaMsgArry[keyTypes.indexOf(validationMessage.type)].push(validationMessage);

                    })

                    console.log("0  " + JSON.stringify(vidaMsgArry[0]));
                    console.log("0  " + JSON.stringify(keyTypes[0]));
                    console.log("1  " + JSON.stringify(vidaMsgArry[1]));
                    console.log("1  " + JSON.stringify(keyTypes[1]));
                    console.log (  "vidaMsgArry size  " +  vidaMsgArry.length);


                    return validationMessages;
                }),
                tap(data => alert("data apple fruit===== " + JSON.stringify(data))),
                catchError(this.handleError)
            )
            // .pipe(
            //     map(responses => {
            //         return responses;
            //     }),
            //     tap(data => alert("data apple fruit===== " + JSON.stringify(data))),
            //     catchError(this.handleError)
            // )

        //     .pipe(
        //         groupBy(message => message.propertyPath),
        //         // return each item in group as array
        //         flatMap((group) => group.pipe(

        //             reduce((acc, cur) => [...acc, cur], [])),
        //         ),

        //         tap(data => console.log("data apple fruit===== " + JSON.stringify(data))),
        // )
        //     .pipe(
        //         map(res => <IFruit>{
        //             name: '1223'
        //         }),
        //         tap(data => alert("data apple fruit===== " + JSON.stringify(data))),
        //         catchError(this.handleError)
        //     );


    }


    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
             simi changes tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<IProduct>(url)
            .pipe(
                tap(data => console.log('Data: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (product.id === 0) {
            return this.createProduct(product, headers);
        }
        return this.updateProduct(product, headers);
    }

    deleteProduct(id: number): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers: headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                catchError(this.handleError)
            );
    }

    private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        product.id = null;
        return this.http.post<IProduct>(this.productsUrl, product, { headers: headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers: headers })
            .pipe(
                tap(data => console.log('updateProduct: ' + product.id)),
                catchError(this.handleError)
            );
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            'id': 0,
            productName: '',
            productCode: '',
            category: '',
            tags: [],
            releaseDate: '',
            price: 0,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }

    private handleError(err: HttpErrorResponse): ErrorObservable {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return new ErrorObservable(errorMessage);
    }

}
