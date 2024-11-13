import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommunicationService {

  private _getNotes: Subject<void> = new Subject<void>();
  private _searchTerm: Subject<string> = new Subject<string>();

  constructor() {}

  public get getNotes(): Observable<void> {
    return this._getNotes.asObservable();
  }

  public get searchTerm(): Observable<string> {
    return this._searchTerm.asObservable();
  }

  public updateNotes(): void {
    this._getNotes.next();
  }

  public searchNotes(term: string): void {
    this._searchTerm.next(term);
  }

}
