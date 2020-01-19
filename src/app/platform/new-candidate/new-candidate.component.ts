import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Candidate } from 'src/app/shared/model/candidate'
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/service/candidate.service';
@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {

  private _candidate: Candidate;
  registerForm: FormGroup;
  submitted = false;
  maxDate: any;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _candidateService : CandidateService,private datePipe: DatePipe) {
   
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  }

  ngOnInit() {
    this._candidate = new Candidate();
  

    this.registerForm = this.formBuilder.group({

      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required]

    });
  }

  get f() { return this.registerForm.controls; }
  onCancel(){
    this.dialogRef.close();
  }
  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
    this._candidate.name = this.registerForm.value.name;
    this._candidate.surname = this.registerForm.value.surname;
    this._candidate.phoneNumber = this.registerForm.value.phoneNumber;
    this._candidate.email = this.registerForm.value.email;
    this._candidate.dateOfBirth = this.registerForm.value.dateOfBirth;
    this._candidateService.addNewCandidate(this._candidate).subscribe(data => {
    this.dialogRef.close();
    },
    error => {
    
      alert("Registration of new candidate failed,use different email!");
      this.registerForm.patchValue({  
       email: ""
    });  
      console.log(this._candidate)
     
    })
  }
 
}
