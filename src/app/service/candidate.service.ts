import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/shared/model/candidate'
import { Skill } from 'src/app/shared/model/skill'
@Injectable()
export class CandidateService {

  constructor(private _apiService: ApiService) {

  }

  getAllCandidates() {
    return this._apiService.get("http://localhost:9090/api/candidates/allSorted").pipe(
      map(candidates => {
        console.log("All candidates retrieved.");
        console.log(candidates);
        return candidates;
      })
    )

  }
  addNewCandidate(candidate: Candidate) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9090/api/candidates/addNewCandidate", candidate, editHeaders).pipe(
      map(result => {
        console.log("Candidate added.");
      })
    )
  }
  addSkillToCandidate(id: string, skill: Skill) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9090/api/candidates/addSkillToCandidate/" + id, skill, editHeaders).pipe(
      map(skills => {
        console.log("All left skills retrieved.");
        console.log(skills);
        return skills;
      })
    )
  }
  deleteCandidate(id: string) {
    return this._apiService.delete("http://localhost:9090/api/candidates/deleteCandidate/" + id).pipe(
      map(candidates => {
        console.log("Left candidates");
        console.log(candidates);
        return candidates;
      })
    )
  }
  removeSkillFromCandidate(id: string, skill: Skill) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9090/api/candidates/removeSkillFromCandidate/" + id, skill, editHeaders).pipe(
      map(skills => {
        console.log(skills);
        return skills;
      })
    )
  }
  findCandidatesByName(candidate : Candidate) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9090/api/candidates/findCandidatesByName",candidate,editHeaders).pipe(
      map(candidates => {
        console.log("Found candidates : ");
        console.log(candidates);
        return candidates;
      })
    )

  }
  findCandidatesBySkills(skill : any) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9090/api/candidates/findCandidatesBySkills",skill,editHeaders).pipe(
      map(candidates => {
        console.log("Found candidates with given skills : ");
        console.log(candidates);
        return candidates;
      })
    )

  }


}