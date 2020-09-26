import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Observable<Question[]>;

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.questions = this.questionService.getQuestionsList();
  }

   deleteQuestion(id: number) {
     this.questionService.deleteQuestion(id)
       .subscribe(
        data => {
           console.log(data);
           this.reloadData();
        },
         error => console.log(error));
   }

  questionDetails(id: number) {
    this.router.navigate(['details', id]);
  }
}
