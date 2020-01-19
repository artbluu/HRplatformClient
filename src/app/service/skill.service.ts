import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Skill } from 'src/app/shared/model/skill'

@Injectable()
export class SkillService{

    constructor(private _apiService:ApiService){

    }

    getAllSkills(){
        return this._apiService.get("http://localhost:9090/api/skills/getAllSkills").pipe(
            map(skills => {
                console.log("All skills retrieved.");
                console.log(skills);
                return skills;
            })
          )

    }
    addNewSkill(skill: Skill)
    {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.post("http://localhost:9090/api/skills/addNewSkill",skill ,editHeaders).pipe(
      map(result => {
        console.log("New skill added.");
      })
    )
    }
    getLeftSkills(id:string){
      return this._apiService.get("http://localhost:9090/api/skills/getLeftSkills/"+ id).pipe(
          map(skills => {
              console.log("All left skills retrieved.");
              console.log(skills);
              return skills;
          })
        )
  }
 
  }



   
