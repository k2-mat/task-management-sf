import { LightningElement } from 'lwc';
import getTaskList from "@salesforce/apex/TaskManagementController.getTaskList";

export default class TaskManagement extends LightningElement {
  searchResultTask;

  connectedCallback() {
    getTaskList().then((result) => {
      this.searchResultTask = result;
    }).catch((error) => {

    })
  }
}
