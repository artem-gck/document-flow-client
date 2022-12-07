import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private userId: string;

  constructor(
    private route: Router, 
    private httpClient: HttpClient, 
    private oidcSecurityService: OidcSecurityService) { 
      this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
        this.userId = userData.sub;   
    });
  }

  getTasksByOwner(status : string): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(`tasks1/users/${this.userId}?status=${status}`);
  }

  getTasksByPerformer(status : string): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(`tasks1/performer/${this.userId}?status=${status}`);
  }

  getAllTasksByOwner(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(`tasks1/users/${this.userId}`);
  }

  getTask(id: string): Observable<TaskModel> {
    return this.httpClient.get<TaskModel>(`tasks/${id}`);
  }

  updateTask(task: TaskModel): Observable<string> {
    return this.httpClient.put<string>(`tasks/${task.id}`, task);
  }

  deleteTask(id: string): Observable<string> {
    return this.httpClient.delete<string>(`tasks/${id}`);
  }

  addTask(task: TaskModel): Observable<string> {
    return this.httpClient.post<string>(`tasks`, task);
  }
}
