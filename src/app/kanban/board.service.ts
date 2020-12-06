import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { BoardInterface, TasksInterface } from './board.model';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async createBoard(data: BoardInterface) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  async deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  updateTasks(boardId: string, tasks: TasksInterface[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  removeTask(boardId: string, task: TasksInterface) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({ tasks: firebase.firestore.FieldValue.arrayRemove(task) });
  }

  getUserBoards(): any {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<BoardInterface>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      tap((m) => console.log(m))
    );
  }

  sortBoards(boards: BoardInterface[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('boards').doc(b.id));

    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    console.log('refs1 ', refs);
    batch.commit();
  }
}
