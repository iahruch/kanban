import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board;
  constructor(public boardService: BoardService) {}

  ngOnInit(): void {}
  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }
}
