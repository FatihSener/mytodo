import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyTodoItem } from '../../models/mytodo-item';
import { MyTodoItemService } from '../../services/mytodo-item.service';

@Component({
  selector: 'app-mytodo-item-list',
  templateUrl: './mytodo-item-list.component.html',
  styleUrls: ['./mytodo-item-list.component.css'],
  providers: [MyTodoItemService]
})
export class MyTodoItemListComponent implements OnInit {

  constructor( private formBuilder: FormBuilder, private mytodoItemService: MyTodoItemService) { 
    this.createForm();
  }

  @ViewChild("description") descriptionInput: ElementRef;
  private createForm() {
    this.mytodoForm = this.formBuilder.group({
      item: ''
    })
  }

  mytodoForm: FormGroup;
  selectedMyTodoItem: MyTodoItem;
  mytodoItems: MyTodoItem[] = [];

  ngOnInit() {
    this.mytodoItemService.getMyTodoItems().subscribe(
      mytodoItems => this.mytodoItems = mytodoItems
    );
  }

  onSubmit(model) {
    const mytodoItemToSave: MyTodoItem = {
      id: this.selectedMyTodoItem ? this.selectedMyTodoItem.id : null,
      description: model.item
    }
    if(!this.selectedMyTodoItem){
      this.mytodoItemService.saveMyTodoItem(mytodoItemToSave).subscribe(mytodoItem => this.mytodoItems.push(mytodoItem));
    }else{
      this.mytodoItemService.updateMyTodoItem(mytodoItemToSave).subscribe(result => this.mytodoItems.filter(
       (mytodoItem =>this.isSameMyTodoItem(result, mytodoItem)
      ))[0].description = result.description);
    }

    this.selectedMyTodoItem  = null;
    this.mytodoForm.reset();
  }

  private isSameMyTodoItem(searchBy: MyTodoItem, lookingFor: MyTodoItem) {
    return searchBy.id === lookingFor.id;
  }

  deleteMyTodoItem(mytodoItemToRemove: MyTodoItem, event) {
    event.stopPropagation();

    this.mytodoItemService.deleteMyTodoItem(mytodoItemToRemove).subscribe(
      res => {
        this.mytodoItems = this.mytodoItems.filter(
          mytodoItem => mytodoItem.id !== mytodoItemToRemove.id
        )

        this.descriptionInput.nativeElement.focus();
      }
    )
  }

  selectMyTodoItem(mytodoItem: MyTodoItem) {
    this.selectedMyTodoItem = mytodoItem;
    this.mytodoForm.controls["item"].setValue(mytodoItem.description);
    this.descriptionInput.nativeElement.focus();
  }
}
