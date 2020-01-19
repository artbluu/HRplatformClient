import { Component, OnInit,Input } from '@angular/core';
import { Candidate} from 'src/app/shared/model/candidate'
import { Skill } from 'src/app/shared/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { SkillsListComponent } from 'src/app/platform/skills-list/skills-list.component';
import { CandidateService } from 'src/app/service/candidate.service';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  @Input("_candidate") _candidate : any;
  private _skills : any;
  private _candidateId : any;
  private hide : boolean;
  constructor(private _skillService: SkillService,private _dialog: MatDialog, private _candidateService: CandidateService) { 
    this.hide = true;
  }

  ngOnInit() {
  }
  addNewSkill(){
  
    this._candidateId = this._candidate.id;
    console.log(this._candidate.id);
    this._skillService.getLeftSkills(this._candidateId).subscribe(skills => {
     
      this._skills = skills;
      console.log("Skills : ", this._skills);
          let dialog = this._dialog.open(SkillsListComponent, {

            width: '50%',
            id: this._candidateId,
            data: this._skills,
          
        });
        dialog.afterClosed().subscribe(() => {
          // Do stuff after the dialog has closed
          this.hide = false;
      });
    }); 

  }
  removeSkill(skill){
    this._candidateService.removeSkillFromCandidate(this._candidate.id,skill).subscribe(data => {
      console.log("Removed skill " + skill);
      },
      error => {
      
        alert("Can't remove skill from candidate");
      })
   

  }
  deleteCandidate(){
    this._candidateService.deleteCandidate(this._candidate.id).subscribe(candidates => {
  
      this.hide = false;
      console.log("Candidates : ",candidates);
  
    }); 
  }
}
