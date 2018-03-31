import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IFruit } from '../fruits/fruit';

export class FruitData implements InMemoryDbService {

    createDb() {
        const fruit: any =
            [
               
                {
                    "message": "a age out validation Message ",
                    "propertyPath": "age_out"
                },
                {
                    "message": " c color fake validation message ",
                    "propertyPath": "color_fake"
                },
                {
                    "message": "b age out validation message ",
                    "propertyPath": "age_out"
                },

                

            ]



        return { fruit };
    }
}
