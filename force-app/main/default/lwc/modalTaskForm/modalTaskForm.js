import { LightningElement, api } from "lwc";
import getTask from "@salesforce/apex/ModalTaskFormController.getTask";

export default class ModalTaskForm extends LightningElement {
    showModal = false;
    task = {};
    recordid;
    modalBackgroundPosition;

    @api show(recordid) {
        this.showModal = true;
        this.setData(recordid);
        this.fixModalBackground();
    }

    @api hide() {
        this.task = {};
        this.showModal = false;
        this.releaseModalBackground();
    }

    get title() {
        return this.task.Title__c;
    }

    get body() {
        return this.task.Body__c;
    }

    get headerTitle() {
        return this.recordid ? "Edit" : "Add";
    }

    get submitTitle() {
        return this.recordid ? "Update" : "Add";
    }

    setData(recordid) {
        this.recordid = recordid;
        if (this.recordid) {
            getTask({ recordid: this.recordid })
                .then((result) => {
                    this.task = result;
                })
                .catch((error) => {
                    console.log(errror);
                });
        }
    }

    handleChangeValue(event) {
        this.task[event.target.name] = event.target.value;
    }

    handleDialogClose() {
        this.dispatchEvent(
            new CustomEvent("setvalue", {
                detail: {
                    value: null
                }
            })
        );
        this.hide();
    }

    handleSave() {
        if (this.checkValidForm()) {
            this.dispatchEvent(
                new CustomEvent("setvalue", {
                    detail: {
                        value: this.task
                    }
                })
            );
            this.hide();
        }
    }

    checkValidForm() {
        this.template.querySelectorAll(".input").forEach((input) => {
            input.setCustomValidity("");
        });
        let allValid = [...this.template.querySelectorAll(".input")].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        return allValid;
    }

    fixModalBackground() {
        const innerContent = this.mainInnerDom();
        this.modalBackgroundPosition = innerContent.getBoundingClientRect().top;
        innerContent.style.position = "fixed";
        innerContent.style.top = this.modalBackgroundPosition + "px";
        innerContent.style.width = "100%";
    }

    releaseModalBackground() {
        const content = this.mainDom();
        const innerContent = this.mainInnerDom();
        innerContent.style.position = null;
        innerContent.style.top = null;
        innerContent.style.width = null;
        document.querySelector("html").scrollTop = content.getBoundingClientRect().top + this.modalBackgroundPosition * -1;
        this.modalBackgroundPosition = undefined;
    }

    mainDom() {
        return document.querySelector("div[role='main']");
    }

    mainInnerDom() {
        return this.mainDom().querySelector(":scope > div");
    }
}
