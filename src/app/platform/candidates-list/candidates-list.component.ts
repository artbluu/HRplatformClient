import { Component, OnInit,Input} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Candidate } from 'src/app/shared/model/candidate'
import { CandidateService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  @Input("candidates") candidates : any;
  sortedCandidates : Candidate[];
  showProfile : boolean;
  _candidate : Candidate;
  _searchCand : Candidate;
  constructor(private _candidateService: CandidateService) {
    this.showProfile = false;
   }

  ngOnInit() {
    this.sortedCandidates = this.candidates;
    this.showProfile = false;
  }
  search(_search:string){
    this._searchCand = new Candidate();
    this._searchCand.name = _search;
    console.log(this._searchCand);
    this._candidateService.findCandidatesByName(this._searchCand).subscribe(candidates => {
     
      this.sortedCandidates = candidates;
      console.log("Candidates : ", this.sortedCandidates);
  
    }); 
    this.candidates = this.sortedCandidates;

  }
  showCandidate(candidate){
    console.log("Show candidate");
    this._candidate = candidate;
    this.showProfile = true;
  }
  

  sortData(sort: Sort) {
   
    const data = this.candidates.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCandidates = data;
      return;
    }

    this.sortedCandidates = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'phoneNumber': return compare(a.phoneNumber, b.phoneNumber, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'dateOfBirth': return compare(a.dateOfBirth, b.dateOfBirth, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


