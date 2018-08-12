import { Component, OnInit } from '@angular/core';

import { PbacService } from '../shared/pbac.service';

import { ActingUser } from '../shared/actingUser.model';
import { ActionType, Role } from '../shared/actionType.model';
import { ObjectData, Request, RequestObject } from '../shared/request.model';
import { Transaction } from '../shared/transaction.model';
import { Provenance } from '../shared/provenance.model';
import { CaseAction, DefaultCase } from '../shared/defaultCase.model';
import { DefaultOnlineGardingSystem } from '../shared/defaultOnlineGardingSystem.model';
import { ParkingReportsSystem } from '../shared/defaultParkingReportsSystem.model';


@Component({
  selector: 'app-pbac',
  templateUrl: './pbac.component.html',
  styleUrls: ['./pbac.component.css']
})
export class PbacComponent implements OnInit {

  public defaultRequests: DefaultCase;
  public isInitDefaultRequestsIndex: number = -1;

  public casesNames: Array<string>;
  public loadCase: string;
  public selectedCase: string;
  public caseDataHasLoad: Boolean = false;

  public actionTypes: Array<ActionType>;
  public users: Array<ActingUser>;
  public objects: Array<ObjectData>;

  public newRequest: Request;
  public selectedActionType: ActionType;
  public inputRoles: Array<Role>;

  public previousTransactions: Array<{transaction: Transaction, provenance: Provenance}>;

  constructor(private pbacService: PbacService) { }

  ngOnInit() {
    this.pbacService.getAllCases().subscribe(data => {
      this.casesNames = data;
    });
  }

  initCase(selectedCase) {
    if (!selectedCase) {
      return;
    }

    this.pbacService.init().subscribe(done => {
      this.caseDataHasLoad = false;
      this.loadCase = selectedCase;
      this.users = new Array();
      this.objects = new Array();
      this.previousTransactions = new Array();
      this.initRequest();

      this.pbacService.getCaseActionTypes(this.loadCase).subscribe(data => {
        this.actionTypes = data;
        this.caseDataHasLoad = true;

        if (this.isInitDefaultRequestsIndex !== -1) {
          this.nextDefaultRequestsMode();
        }
      });
    });
  }

  uploadNewCase(event) {
      if (event.target.files) {
        if (event.target.files.length === 1 && event.target.files[0]) {
            this.pbacService.upload(event.target.files[0]).subscribe(
            ok => {
              this.pbacService.getAllCases().subscribe(data => {
                this.casesNames = data;
                this.casesNames.forEach(cse => this.initCase(cse));
              });
              alert('File has been uploaded successfully.');
            },
            error =>  {
                alert('error - Failed to upload file.' +  error);
            });
        } else {
            alert('error - Need to choose jdon file to upload.');
        }
    }
  }

  initRequest() {
    this.newRequest = new Request();
    this.selectedActionType = undefined;
    this.inputRoles = undefined;
  }

  loadDefaultRequests(selectedCase) {
    if (selectedCase === 'OnlineGardingSystem') {
      this.defaultRequests = new DefaultOnlineGardingSystem();
    } else if (selectedCase === 'ParkingReportsSystem') {
      this.defaultRequests = new ParkingReportsSystem();
    } else {
      return;
    }

    this.isInitDefaultRequestsIndex = 0;
    this.initCase(selectedCase);
  }

  nextDefaultRequestsMode() {
    if (this.isInitDefaultRequestsIndex >= this.defaultRequests.program.length) {
      this.isInitDefaultRequestsIndex = -1;
      return;
    }

    const action = this.defaultRequests.program[this.isInitDefaultRequestsIndex];
    switch (action.action) {
      case CaseAction.CREATE_USER:
        this.createUser();
        break;
      case CaseAction.CREATE_REQUEST:

        this.newRequest = new Request(
          this.users[action.data.userIndex].id,
          this.actionTypes[action.data.actionTypeIndex].name,
          this.actionTypes[action.data.actionTypeIndex].roles.filter(r => r.input)
            .map((r, i) => new RequestObject(this.objects[action.data.objectsindexes[i]], r))
        )
        this.onSubmit();
        break;
    }
  }

  createUser() {
    this.pbacService.createUser().subscribe(data => {
      this.users.push(data);

      if (this.isInitDefaultRequestsIndex !== -1) {
        this.isInitDefaultRequestsIndex++;
        this.nextDefaultRequestsMode();
      }
    });
  }

  changeActionType() {
    this.inputRoles = this.selectedActionType.roles.filter(r => r.input);
    this.newRequest.objects = new Array(this.inputRoles.length);
    this.inputRoles.forEach((role, index) => this.newRequest.objects[index] = new RequestObject(undefined, role));
    this.newRequest.actionTypeName = this.selectedActionType.name;
  }

  onSubmit() {
    this.pbacService.processRequest(this.loadCase, this.newRequest).subscribe(transaction => {
      this.initRequest();
      this.objects = this.objects.concat(transaction.outputObjects);

      this.pbacService.getLastProvenanceData(this.loadCase).subscribe(provenance => {
        this.previousTransactions.push({transaction: transaction, provenance: provenance});

        if (this.isInitDefaultRequestsIndex !== -1) {
          this.isInitDefaultRequestsIndex++;
          this.nextDefaultRequestsMode();
        }
      });
    },
    error => {
      alert('Falied to procees the request.');
      this.isInitDefaultRequestsIndex = -1;
    });
  }
}
