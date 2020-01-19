import { Component, OnInit,Inject  } from '@angular/core';
import { Skill } from 'src/app/shared/model/skill'
import { SkillService } from 'src/app/service/skill.service';
import { CandidateService } from 'src/app/service/candidate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.scss']
})
export class SkillsListComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,private _skillService: SkillService,
  private _candidateService: CandidateService) {

    this._id = this.dialogRef.id;
   }
  _skills : any;
  _id : string;
  _searchSkills: Skill[] = [];
  _searchSkillsString : string;
  hide : boolean;
  ngOnInit() 
    {
    this._id = this.dialogRef.id;
    this.hide = true;
    console.log("ID" + this.dialogRef.id);
    this._skills = this.data;
    this._searchSkillsString = '';
    if(!isNaN(compare(this.dialogRef.id))){
  
      this.hide = false;
    }

  }
  clickAddSkill(skill : Skill){   
    if(!isNaN(compare(this._id))){
     
      this._candidateService.addSkillToCandidate(this._id,skill).subscribe(data => {
        console.log("Skill addded " + skill);
        },
        error => {
        
          alert("Can't add skill");
        })

    }else {
     
      this._searchSkillsString = this._searchSkillsString + '@' + skill.name;
      console.log(this._searchSkills);
    }

  }
  findCandidateWithSkills(){

   this.dialogRef.close({data:this._searchSkillsString});
  }
  onCancel(){
    this.dialogRef.close();
  }
 
}

function compare(a: any) {
  return a.toString();
}