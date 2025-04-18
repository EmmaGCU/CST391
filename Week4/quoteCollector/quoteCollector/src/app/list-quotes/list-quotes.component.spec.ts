import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuotesComponent } from './list-quotes.component';

describe('ListQuotesComponent', () => {
  let component: ListQuotesComponent;
  let fixture: ComponentFixture<ListQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
