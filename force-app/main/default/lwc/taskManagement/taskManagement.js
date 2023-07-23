import { LightningElement, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NoHeader from "@salesforce/resourceUrl/NoHeader";
import getTaskList from "@salesforce/apex/TaskManagementController.getTaskList";
import createTask from "@salesforce/apex/TaskManagementController.createTask";
import updateTask from "@salesforce/apex/TaskManagementController.updateTask";
import deleteTask from "@salesforce/apex/TaskManagementController.deleteTask";

import LightningConfirm from "lightning/confirm";

export default class TaskManagement extends LightningElement {
    searchTitle = "";
    searchBody = "";

    @track searchResultTask;

    connectedCallback() {
        loadStyle(this, NoHeader).then(() => {});
        this.reloadData();
    }

    changeSearchTitle(evt) {
        this.searchTitle = evt.target.value;

        getTaskList({ title: this.searchTitle, body: this.searchBody })
            .then((result) => {
                this.searchResultTask = result;
            })
            .catch(() => {
                this.showError("Get Tasks Error.");
            });
    }

    changeSearchBody(evt) {
        this.searchBody = evt.target.value;

        getTaskList({ title: this.searchTitle, body: this.searchBody })
            .then((result) => {
                this.searchResultTask = result;
            })
            .catch(() => {
                this.showError("Get Tasks Error.");
            });
    }

    handleReset() {
        this.searchTitle = "";
        this.searchBody = "";
        this.reloadData();
    }

    openModalNew(evt) {
        const modal = this.template.querySelector("c-modal-task-form");
        modal.show(evt.target.dataset.recordid);
    }

    handleSetInputValue(evt) {
        if (evt.detail.value) {
            if (evt.detail.value.Id) {
                updateTask({ task: evt.detail.value })
                    .then(() => {
                        this.showMessage("Successfully updated.");
                        this.reloadData();
                    })
                    .catch(() => {
                        this.showError("Update Error.");
                    });
            } else {
                createTask({ task: evt.detail.value })
                    .then(() => {
                        this.showMessage("Successfully added.");
                        this.reloadData();
                    })
                    .catch(() => {
                        this.showError("Add Error.");
                    });
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
            })
            .catch(() => {
                this.showError("Get Tasks Error.");
            });
    }

    async handleDeleteTask(evt) {
        const recordid = evt.target.dataset.recordid;
        const result = await LightningConfirm.open({
            message: "Are you sure?",
            variant: "headerless"
        });
        if (result) {
            deleteTask({ recordid: recordid })
                .then(() => {
                    this.showMessage("Successfully deleted.");
                    this.reloadData();
                })
                .catch(() => {
                    this.showError("Delete Error.");
                });
        }
    }
}
