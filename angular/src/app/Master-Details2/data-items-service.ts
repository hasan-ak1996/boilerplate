import { analyzeAndValidateNgModules } from '@angular/compiler';
import { OnInit } from '@angular/core';
import {Injectable} from'@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateItem2InputDTO, GetItem2OutputDTO, Order2ServiceProxy} from '@shared/service-proxies/service-proxies';

@Injectable()
export class DataItemsService {
    lines  : CreateItem2InputDTO[] =[];
    linesForUpdate : GetItem2OutputDTO[] = [];
    deletedItem : GetItem2OutputDTO [] = [];
    id: number;
    addItem(item : CreateItem2InputDTO){
        this.lines.push(item);
    }
    deleteItem(index){
       this.lines.splice(index,1);
    }
    getItemByIndex(index){
        return this.lines[index];
    }
    getItemForEdit(index){
        return this.linesForUpdate[index];
    }
    addItemForEdit(item : GetItem2OutputDTO){
        item.id = 0 ;
        this.linesForUpdate.push(item);
    }
    deleteItemForEdit(index){
        var delItem = this.linesForUpdate.splice(index,1);
        if(delItem[0].id != 0){
            this.deletedItem.push(delItem[0]);
        }
    }
}

