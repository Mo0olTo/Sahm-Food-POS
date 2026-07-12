import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemNav } from './sidebar-item-nav';

describe('SidebarItemNav', () => {
  let component: SidebarItemNav;
  let fixture: ComponentFixture<SidebarItemNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemNav],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarItemNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
