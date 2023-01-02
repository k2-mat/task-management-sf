public without sharing class TaskSelector {
    public List<Task__c> getAllRecords() {
        return [SELECT Id, Name, Title__c, Body__c FROM Task__c];
    }

    public List<Task__c> getRecordsByTitle(String title) {
        String titleCondition = '%' + title + '%';
        return [SELECT Id, Name, Title__c, Body__c FROM Task__c WHERE Title__c LIKE :titleCondition];
    }

    public List<Task__c> getRecordsByBody(String body) {
        String bodyCondition = '%' + body + '%';
        return [SELECT Id, Name, Title__c, Body__c FROM Task__c WHERE Body__c LIKE :bodyCondition];
    }

    public List<Task__c> getRecordsByTitleAndBody(String title, String body) {
        String titleCondition = '%' + title + '%';
        String bodyCondition = '%' + body + '%';
        return [SELECT Id, Name, Title__c, Body__c FROM Task__c WHERE Title__c LIKE :titleCondition AND Body__c LIKE :bodyCondition];
    }
}
