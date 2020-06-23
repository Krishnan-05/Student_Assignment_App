import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectlistPage } from './subjectlist.page';

describe('SubjectlistPage', () => {
  let component: SubjectlistPage;
  let fixture: ComponentFixture<SubjectlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
