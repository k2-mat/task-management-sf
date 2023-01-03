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

    @AuraEnabled
    public static Task__c createTask(Task__c task){
        insert task;
        return task;
    }

    @AuraEnabled
    public static Task__c updateTask(Task__c task){
        update task;
        return task;
    }

    @AuraEnabled
    public static void deleteTask(Id recordid){
        Task__c task = new TaskSelector().getRecordById(recordid);
        delete task;
        return;
    }
}
