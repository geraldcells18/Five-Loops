import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranspoPage } from './transpo.page';

describe('TranspoPage', () => {
  let component: TranspoPage;
  let fixture: ComponentFixture<TranspoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TranspoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranspoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
