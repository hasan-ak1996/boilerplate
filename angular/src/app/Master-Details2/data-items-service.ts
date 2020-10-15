import {Injectable} from'@angular/core';
import { CreateItem2InputDTO} from '@shared/service-proxies/service-proxies';

@Injectable()
export class DataItemsService {
    lines  : CreateItem2InputDTO[] =[];
}
