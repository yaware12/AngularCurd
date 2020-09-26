import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  id: number;
  question: Question;

  constructor(private route: ActivatedRoute,private router: Router,private questionService: QuestionService) { }

  ngOnInit() {
    this.question = new Question();

    this.id = this.route.snapshot.params['id'];

    this.questionService.getQuestion(this.id)
      .subscribe(data => {
        console.log(data)
        this.question = data;
      }, error => console.log(error));
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.id, this.question)
      .subscribe(data => console.log(data), error => console.log(error));
    this.question = new Question();
    this.gotoList();
  }

  onSubmit() {
    this.updateQuestion();
  }

  gotoList() {
    setTimeout(() => {
      this.router.navigate(['/questions']);
    }, 200 );
// this.router.navigate(['/questions']);
  }
}
