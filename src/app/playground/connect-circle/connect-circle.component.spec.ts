import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectCircleComponent } from './connect-circle.component';

describe('ConnectCircleComponent', () => {
  let component: ConnectCircleComponent;
  let fixture: ComponentFixture<ConnectCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
