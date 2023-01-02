public without sharing class TaskManagementController {
    @AuraEnabled
    public static List<Task__c> getTaskList(String title, String body) {
        if (String.isNotBlank(title)) {
            if (String.isNotBlank(body)) {
                return new TaskSelector().getRecordsByTitleAndBody(title, body);
            } else {
                return new TaskSelector().getRecordsByTitle(title);
            }
        } else {
            if (String.isNotBlank(body)) {
                return new TaskSelector().getRecordsByBody(body);
            } else {
                return new TaskSelector().getAllRecords();
            }
        }
    }
}
