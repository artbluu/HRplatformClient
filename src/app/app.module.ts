import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformComponent } from './platform/platform.component';

import { HttpClientModule } from '@angular/common/http';
import { CandidatesListComponent } from './platform/candidates-list/candidates-list.component';
//angular material
import {MatSortModule,MatTableModule,MatDialogModule} from '@angular/material';
import {MatToolbarModule,MatMenuModule,MatGridListModule} from '@angular/material';
//dialogs
import { NewCandidateComponent } from './platform/new-candidate/new-candidate.component';
import { NewSkillComponent } from './platform/new-skill/new-skill.component';
import { SkillsListComponent } from './platform/skills-list/skills-list.component';
//date
import {DatePipe} from '@angular/common';
//form
import { ReactiveFormsModule } from '@angular/forms';
//service
import { CandidateService } from './service/candidate.service';
import { ApiService } from './service/api.service';
import { SkillService } from './service/skill.service';
import { CandidateProfileComponent } from './platform/candidate-profile/candidate-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    PlatformComponent,
    CandidatesListComponent,
    NewCandidateComponent,
    NewSkillComponent,
    SkillsListComponent,
    CandidateProfileComponent
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'platform', component: PlatformComponent },
    ]
    ),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,

    ReactiveFormsModule
    
    
  ],
  providers: [
    
    ApiService,
    CandidateService,
    SkillService,
    DatePipe,

  ],
  entryComponents: [ //Dialog
    NewCandidateComponent,
    NewSkillComponent,
    SkillsListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

