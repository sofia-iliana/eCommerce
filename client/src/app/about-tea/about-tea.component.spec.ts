import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeaComponent } from './about-tea.component';

describe('AboutTeaComponent', () => {
  let component: AboutTeaComponent;
  let fixture: ComponentFixture<AboutTeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutTeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
