public without sharing class TaskSelector {
    public List<Task__c> getAllRecords() {
        return [SELECT Id, Name, Title__c, Body__c FROM Task__c];
    }
}
