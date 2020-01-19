import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { SkillService } from 'src/app/service/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCandidateComponent } from 'src/app/platform/new-candidate/new-candidate.component';
import { NewSkillComponent } from './new-skill/new-skill.component';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { isNull, isUndefined } from 'util';
import { Candidate } from '../shared/model/candidate';
import { Skill } from '../shared/model/skill';
@Component({
  selector: 'platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  constructor(private _dialog: MatDialog, private _candidateService: CandidateService, private _skillService: SkillService) { }
  private _allCandidates: any;
  private showCandidates: boolean;
  private _candidate: Candidate;
  private _skills: Skill[];
  private _searchSkill: Skill;
  private _string: string;
  private object: any;
  ngOnInit() {
    this.showCandidates = false;
  }
  listOfCandidates() {
    this.showCandidates = false;
    this._candidateService.getAllCandidates().subscribe(candidates => {

      this._allCandidates = candidates;
      console.log("Candidates : ", this._allCandidates);
      this.showCandidates = true;

    });
  }
  listOfSkills() {
    this.showCandidates = false;
    this._skillService.getAllSkills().subscribe(skills => {

      this._skills = skills;
      console.log("Skills : ", this._skills);
      let dialog = this._dialog.open(SkillsListComponent, {

        width: '50%',
        data: this._skills,
      });
      dialog.afterClosed().subscribe(data => {
        // Do stuff after the dialog has closed
        if (!isUndefined(data)) {

          console.log("Seraching for candidates with skills: ", data)


          this._string = JSON.stringify(data);
          JSON.parse(this._string);
          console.log("OVO" + this._string, JSON.parse(this._string))
          this.object = JSON.parse(this._string);
          console.log("Saljem", this.object.data)
          this._searchSkill = new Skill(this.object.data);
          console.log(this._searchSkill)

          this._candidateService.findCandidatesBySkills(this._searchSkill).subscribe(candidates => {
            this._allCandidates = candidates;
            console.log("Candidates with skills found: ", this._allCandidates);
            this.showCandidates = true;
          });
        }

      });
    });



  }
  getLeft() {

  }

  newSkill() {
    this.showCandidates = false;
    let dialog = this._dialog.open(NewSkillComponent, {
      width: '27%',
    });

  }
  newCandidate() {
    this.showCandidates = false;
    let dialog = this._dialog.open(NewCandidateComponent, {
      width: '31%',

    });
  }
  showProfile() {
    this._allCandidates = false;
  }
  check(checked: any): boolean {
    return !checked;
  }



}

