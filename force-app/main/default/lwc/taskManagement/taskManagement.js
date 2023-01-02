import { LightningElement } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import NoHeader from "@salesforce/resourceUrl/NoHeader";
import getTaskList from "@salesforce/apex/TaskManagementController.getTaskList";

export default class TaskManagement extends LightningElement {
  searchResultTask;
  searchTitle = '';
  searchBody = '';

  connectedCallback() {
    loadStyle(this, NoHeader).then((result) => {});
    getTaskList()
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        console.log(error);
      })
  }

  changeSearchTitle(evt) {
    this.searchTitle = evt.target.value;

    getTaskList({title: this.searchTitle, body: this.searchBody})
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        console.log(error);
      })
  }

  changeSearchBody(evt) {
    this.searchBody = evt.target.value;

    getTaskList({title: this.searchTitle, body: this.searchBody})
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        console.log(error);
      })
  }

  handleReset() {
    this.searchTitle = '';
    this.searchBody = '';

    getTaskList()
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        console.log(error);
      })
  }
}
