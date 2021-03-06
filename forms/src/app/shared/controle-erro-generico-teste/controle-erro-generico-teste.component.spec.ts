import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControleErroGenericoTesteComponent } from './controle-erro-generico-teste.component';

describe('ControleErroGenericoTesteComponent', () => {
  let component: ControleErroGenericoTesteComponent;
  let fixture: ComponentFixture<ControleErroGenericoTesteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleErroGenericoTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleErroGenericoTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
