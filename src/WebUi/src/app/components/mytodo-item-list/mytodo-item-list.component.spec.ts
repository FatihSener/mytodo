import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyTodoItemListComponent } from './mytodo-item-list.component';
import { MyTodoItemService } from '../../services/mytodo-item.service';
import { MyTodoItemServiceStub } from '../../services/mytodo-item.service.stub';
import { Observable } from 'rxjs/Rx';
import { MyTodoItem } from '../../models/mytodo-item';

describe('MyTodoItemListComponent', () => {
  let component: MyTodoItemListComponent;
  let fixture: ComponentFixture<MyTodoItemListComponent>;
  let mytodoItemService: MyTodoItemService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTodoItemListComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [MyTodoItemServiceStub]
    })
    .overrideComponent(MyTodoItemListComponent, {set: { providers: [{provide: MyTodoItemService, useClass: MyTodoItemServiceStub}]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTodoItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mytodoItemService = fixture.debugElement.injector.get(MyTodoItemService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe("onSubmit", () => {
    it("should add a mytodo item to the mytodo item array", () => {
      spyOn(mytodoItemService, 'saveMyTodoItem').and.returnValue(Observable.of({id: 1, description: "test"}));
      component.onSubmit({item: "test"});

      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        fixture.detectChanges();
        expect(component.mytodoItems.length).toEqual(1);
      }); 
    });

    it("should update a mytodo item and update array", () => {
      spyOn(mytodoItemService, 'updateMyTodoItem').and.returnValue(Observable.of({id: 42, description: "test"}));
    
      let selectedMyTodoItem = new MyTodoItem();
      selectedMyTodoItem.description = "demo";
      selectedMyTodoItem.id = 42;

      let oldMyTodoItem = new MyTodoItem();
      oldMyTodoItem.description = "demo";
      oldMyTodoItem.id = 42;

      component.mytodoItems.push(oldMyTodoItem);

      component.selectedMyTodoItem = selectedMyTodoItem;

      component.onSubmit({item: "test"});

      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        fixture.detectChanges();
        expect(component.mytodoItems.length).toEqual(1);
        expect(component.mytodoItems[0].id).toEqual(42);
        expect(component.mytodoItems[0].description).toEqual("test");
        expect(component.selectedMyTodoItem).toBeNull();
      }); 
    });
  });

  describe("ngOnInit", () => {
    it("should add two MyTodoItems to the mytodoItems array", () => {
      spyOn(mytodoItemService, 'getMyTodoItems').and.returnValue(Observable.of([
        {id: 1, item: "test1"},
        {id: 2, item: "test2"}
      ]));
      component.ngOnInit();

      fixture.detectChanges()
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(component.mytodoItems.length).toEqual(2);
      });
    });
  });

  describe("deleteMyTodoItem", () => {
    it("should remove a mytodo item from the mytodo item array", () => {
      

      let mytodoItem1 = new MyTodoItem();
      mytodoItem1.description = "test";
      mytodoItem1.id = 42;

      let mytodoItem2 = new MyTodoItem();
      mytodoItem2.description = "test";
      mytodoItem2.id = 43;

      spyOn(mytodoItemService, 'deleteMyTodoItem').and.returnValue(Observable.of(mytodoItem1));
      component.mytodoItems.push(mytodoItem1);
      component.mytodoItems.push(mytodoItem2);

      component.deleteMyTodoItem(mytodoItem1);

      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        fixture.detectChanges();
        expect(component.mytodoItems.length).toEqual(1);
      }); 
    });
  });

  describe("selectMyTodoItem", () => {
    it("set selectedMyTodoItem", () => {
      let mytodoItem = new MyTodoItem();
      mytodoItem.description = "demo";
      mytodoItem.id = 42;

      component.selectMyTodoItem(mytodoItem);

      expect(component.selectedMyTodoItem.description).toEqual("demo");
      expect(component.selectedMyTodoItem.id).toEqual(42);
    });
  });
});
