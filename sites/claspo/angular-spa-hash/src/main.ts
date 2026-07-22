import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ActivatedRoute,
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
  withHashLocation
} from '@angular/router';

const pages = {
  page1: {
    title: 'Page 1',
    blockText: 'Click target block on Page 1'
  },
  page2: {
    title: 'Page 2',
    blockText: 'Click target block on Page 2'
  },
  page3: {
    title: 'Page 3',
    blockText: 'Click target block on Page 3'
  }
} as const;

type PageKey = keyof typeof pages;

@Component({
  selector: 'app-test-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>{{ title }}</h1>
      <p>Angular SPA hash-routing test page</p>

      <div class="targets" aria-label="Click targets">
        <button type="button" class="test-button">Test click</button>
        <button type="button" class="target-block">{{ blockText }}</button>
      </div>
    </section>
  `
})
class TestPageComponent {
  title: string;
  blockText: string;
  private page: PageKey;

  constructor(route: ActivatedRoute) {
    const routePage = route.snapshot.data['page'] as PageKey | undefined;
    this.page = routePage ?? 'page1';
    this.title = pages[this.page].title;
    this.blockText = pages[this.page].blockText;
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page1' },
  { path: 'page1', component: TestPageComponent, data: { page: 'page1' } },
  { path: 'page2', component: TestPageComponent, data: { page: 'page2' } },
  { path: 'page3', component: TestPageComponent, data: { page: 'page3' } },
  { path: '**', redirectTo: 'page1' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <main class="shell">
      <nav class="nav" aria-label="Page navigation">
        <a routerLink="/page1" routerLinkActive="active">Go to Page 1</a>
        <a routerLink="/page2" routerLinkActive="active">Go to Page 2</a>
        <a routerLink="/page3" routerLinkActive="active">Go to Page 3</a>
      </nav>

      <router-outlet />
    </main>
  `
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation())
  ]
}).catch((error) => console.error(error));
