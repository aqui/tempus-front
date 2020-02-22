import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCardsComponent } from './operation-cards.component';

describe('OperationCardsComponent', () => {
  let component: OperationCardsComponent;
  let fixture: ComponentFixture<OperationCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
