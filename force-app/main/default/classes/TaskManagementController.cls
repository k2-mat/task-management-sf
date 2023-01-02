public without sharing class TaskManagementController {
    @AuraEnabled
    public static List<Task__c> getTaskList() {
        return new TaskSelector().getAllRecords();
    }
}
