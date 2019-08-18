import { TestBed, inject, async} from '@angular/core/testing';
import { HttpModule, Http, Response, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { MyTodoItemService } from './mytodo-item.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MyTodoItem } from '../models/mytodo-item';

describe('MyTodoItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MyTodoItemService, MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should be created', inject([MyTodoItemService], (service: MyTodoItemService) => {
    expect(service).toBeTruthy();
  }));

  describe('saveMyTodoItem', () => {
    it("should return mytodo item", async(inject([MyTodoItemService, MockBackend], (service, backend) => {
      backend.connections.subscribe(c => {
        c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify({description: "test", id: 5})})))
      })

      let mytodoItem = new MyTodoItem();

      service.saveMyTodoItem(mytodoItem).subscribe(response => {
        expect(response.id).toEqual(5);
        expect(response.description).toEqual("test");
      })
    })));
  });

  describe('updateMyTodoItem', () => {
    it("should return mytodo item", async(inject([MyTodoItemService, MockBackend], (service, backend) => {
      backend.connections.subscribe(c => {
        c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify({description: "test", id: 5})})))
      })

      let mytodoItem = new MyTodoItem();

      service.updateMyTodoItem(mytodoItem).subscribe(response => {
        expect(response.id).toEqual(5);
        expect(response.description).toEqual("test");
      })
    })));
  });

  describe('getMyTodoItems', () => {
    it("should return two mytodo items", async(inject([MyTodoItemService, MockBackend], (service, backend) => {
      backend.connections.subscribe(c => {
        c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(
        [
          {description: "test2", id: 2},
          {description: "test5", id: 5}
        ]
        )})))
      })

      service.getMyTodoItems().subscribe(response => {
        expect(response.length).toEqual(2);

        expect(response[0].id).toEqual(2);
      })
    })));
  });

  describe('deleteMyTodoItem', () => {
    it("should have a 200 response on success", async(inject([MyTodoItemService, MockBackend],(service, backend) => {
      backend.connections.subscribe(c => {
        c.mockRespond(new Response(new ResponseOptions({ status: 200 })))
      });

      let mytodoItem = new MyTodoItem();
      mytodoItem.description = "test";
      mytodoItem.id = 42;

      service.deleteMyTodoItem(mytodoItem).subscribe(response => {
        expect(response).toEqual({});
      })
    })));
  });
});