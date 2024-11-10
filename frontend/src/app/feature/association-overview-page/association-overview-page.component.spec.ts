import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationOverviewPageComponent } from './association-overview-page.component';

describe('AssociationPageComponent', () => {
  let component: AssociationOverviewPageComponent;
  let fixture: ComponentFixture<AssociationOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
