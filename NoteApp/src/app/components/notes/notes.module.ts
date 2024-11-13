import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/guard.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HeaderComponent } from './sections/header/header.component';
import { MenuComponent } from './sections/menu/menu.component';
import { NoteComponent } from './sections/note/note.component';
import { NoteDetailsComponent } from './notes/modals/note-details/note-details.component';
import { ConfirmDeletionComponent } from './notes/modals/confirm-deletion/confirm-deletion.component';
import { LucideAngularModule, Moon, Sun, Plus, LogOut, Trash2, Edit, Eye } from 'lucide-angular';
import { NotesService } from './model/services/notes.service';
import { ManageNoteComponent } from './notes/modals/manage-note/manage-note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunicationService } from './model/services/communication.service';
import { NotesPipe } from './model/pipes/notes.pipe';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LucideAngularModule.pick({ Moon, Sun, Plus, LogOut, Trash2, Edit, Eye }),
    ReactiveFormsModule,
  ],
  declarations: [
    NotesComponent,
    HeaderComponent,
    MenuComponent,
    NoteComponent,
    ConfirmDeletionComponent,
    NoteDetailsComponent,
    ManageNoteComponent,
    NotesPipe,
  ],
  providers: [NotesService, CommunicationService],
})
export class NotesModule {}
