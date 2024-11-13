import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'my',
    loadChildren: () =>
      import('./components/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
