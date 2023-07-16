public without sharing class ModalTaskFormController {
    @AuraEnabled
    public static Task__c getTask(Id recordid) {
        return new TaskSelector().getRecordById(recordid);
    }
}
