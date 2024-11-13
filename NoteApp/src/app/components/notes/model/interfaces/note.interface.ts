export interface Note {
  createdAt: string
  isPinned: boolean
  modifiedAt: string
  note: string
  title: string
  userId: string
  noteId: string
}

export interface UpdateNote{
  title?: string
  note?: string
  isPinned?: boolean
}

export interface CreateNote{
  title: string
  note: string
}
