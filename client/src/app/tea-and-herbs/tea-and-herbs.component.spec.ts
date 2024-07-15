import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaAndHerbsComponent } from './tea-and-herbs.component';

describe('TeaAndHerbsComponent', () => {
  let component: TeaAndHerbsComponent;
  let fixture: ComponentFixture<TeaAndHerbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaAndHerbsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeaAndHerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
