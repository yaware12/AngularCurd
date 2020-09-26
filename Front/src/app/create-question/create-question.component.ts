import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Router, NavigationEnd   } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  question: Question = new Question();
  submitted = false;

  constructor(private questionService: QuestionService,
              private router: Router) { }

  ngOnInit() {
  }

  newQuestion(): void {
    this.submitted = false;
    this.question = new Question();
  }

  save() {
    this.questionService.createQuestion(this.question)
      .subscribe(data => console.log(data), error => console.log(error));
    this.question = new Question();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
  //  this.router.navigate(['/questions']);
    location.reload();
  }
}
