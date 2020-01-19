import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/shared/model/skill'
import { SkillService } from 'src/app/service/skill.service'
@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.scss']
})
export class NewSkillComponent implements OnInit {

  skillForm: FormGroup;
  skill : Skill;
  submitted : boolean;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _skillService : SkillService){ }

  ngOnInit() {
    this.skill = new Skill('');
    this.submitted = false;
    this.skillForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(10)]]

    });
  }
  get f() { return this.skillForm.controls; }
  onCancel(){
    this.dialogRef.close();
  }
  onSubmit() {
    this.submitted = true;
  
    if (this.skillForm.invalid) {
      return;
    }
    this.skill.name = this.skillForm.value.name;
   
    this._skillService.addNewSkill(this.skill).subscribe(data => {
    this.dialogRef.close();
    },
    error => {
    
      alert("Skill with same name already exists!");
      this.skillForm.patchValue({  
       name: ""
    });  
    })
  }
}
