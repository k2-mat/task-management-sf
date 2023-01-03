import { LightningElement, track } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NoHeader from "@salesforce/resourceUrl/NoHeader";
import getTaskList from "@salesforce/apex/TaskManagementController.getTaskList";
import createTask from "@salesforce/apex/TaskManagementController.createTask";
import updateTask from "@salesforce/apex/TaskManagementController.updateTask";
import deleteTask from "@salesforce/apex/TaskManagementController.deleteTask";

import LightningConfirm from 'lightning/confirm';

export default class TaskManagement extends LightningElement {
  searchTitle = '';
  searchBody = '';

  @track searchResultTask;

  connectedCallback() {
    loadStyle(this, NoHeader).then((result) => {});
    this.reloadData();
  }

  changeSearchTitle(evt) {
    this.searchTitle = evt.target.value;

    getTaskList({title: this.searchTitle, body: this.searchBody})
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        showError('タスクを取得できませんでした。');
      })
  }

  changeSearchBody(evt) {
    this.searchBody = evt.target.value;

    getTaskList({title: this.searchTitle, body: this.searchBody})
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        showError('タスクを取得できませんでした。');
      })
  }

  handleReset() {
    this.searchTitle = '';
    this.searchBody = '';
    this.reloadData();
  }

  openModalNew(evt) {
    const modal = this.template.querySelector(
      "c-modal-task-form"
    );
    modal.show(evt.target.dataset.recordid);
  }

  handleSetInputValue(evt) {
    if (evt.detail.value) {
      if (evt.detail.value.Id) {
        updateTask({task: evt.detail.value})
          .then((result) => {
            this.showMessage('タスクを更新しました。');
            this.reloadData();
          }).catch((error) => {
            this.showError('タスクを更新できませんでした。');
          })
      } else {
        createTask({task: evt.detail.value})
          .then((result) => {
            this.showMessage('タスクを登録しました。');
            this.reloadData();
          }).catch((error) => {
            this.showError('タスクを登録できませんでした。');
          })
      }
    }
  }

  showMessage(message) {
    this.dispatchEvent(
      new ShowToastEvent({
          title: message,
          variant: "success"
      })
    );
  }

  showError(title, message) {
    this.dispatchEvent(
        new ShowToastEvent({
            title: title,
            message: message,
            variant: "error",
            mode: "sticky"
        })
    );
  }

  reloadData() {
    getTaskList()
      .then((result) => {
        this.searchResultTask = result;
      }).catch((error) => {
        showError('タスクを取得できませんでした。');
      });
  }

  async handleDeleteTask(evt) {
    const recordid = evt.target.dataset.recordid;
    const result = await LightningConfirm.open({
      message: '本当に削除しますか？',
      variant: 'headerless'
    });
    if (result) {
      deleteTask({recordid: recordid})
        .then((result) => {
          this.showMessage('タスクを削除しました。');
          this.reloadData();
        }).catch((error) => {
          showError('タスクを削除できませんでした。');
        });
    }
  }
}
