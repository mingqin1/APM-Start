import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IFruit } from '../fruits/fruit';

export class FruitData implements InMemoryDbService {

    createDb() {
        const fruit= {
            "name": "apple",
            "validationErrors": {
                "ago_timeout": [
                    {
                        "message": "a validation Message ",
                        "type": "warning"
                    },
                    {
                        "message": "b validation message ",
                        "type": "datal"
                    }
                ],
                "pans_on_firs": [
                    {
                        "message": "a validation Message ",
                        "type": "warning"
                    },
                    {
                        "message": "b validation message ",
                        "type": "datal"
                    }
                ]
            }
        }
           
        return { fruit };
    }
}
