import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/v1/questions';

  constructor(private http: HttpClient) { }

   getQuestion(id: number): Observable<any> {
     return this.http.get(`${this.baseUrl}/${id}`);
  }

   createQuestion(questions: any): Observable<any> {
     return this.http.post(`${this.baseUrl}`, questions);
   }

   updateQuestion(id: number, value: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/${id}`, value);
   }

   deleteQuestion(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
   }

  getQuestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

 }
