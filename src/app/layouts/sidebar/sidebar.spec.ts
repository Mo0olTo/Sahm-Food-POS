import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { Sidebar } from './sidebar';

@Component({ template: '' })
class StubKitchen {}

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar, StubKitchen],
      providers: [
        provideRouter([
          { path: 'dashboard', children: [] },
          { path: 'kitchen', component: StubKitchen },
          { path: 'search', children: [] },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the three primary nav items', () => {
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.sidebar__link') as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Orders');
    expect(links[1].textContent).toContain('Kitchen');
    expect(links[2].textContent).toContain('Search');
  });

  it('marks the active link with aria-current=page after navigation', async () => {
    await router.navigateByUrl('/kitchen');
    fixture.detectChanges();
    const active = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement | null;
    expect(active).toBeTruthy();
    expect(active?.textContent).toContain('Kitchen');
  });
});
