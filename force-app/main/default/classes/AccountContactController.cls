public with sharing class AccountContactController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId(Id accountId) {
        return [SELECT Id, FirstName, LastName, Email FROM Contact WHERE AccountId = :accountId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountName(String accountName) {
        List<Account> accounts = [
            SELECT Id FROM Account 
            WHERE Name LIKE :('%' + accountName + '%') 
            LIMIT 1
        ];
        if (!accounts.isEmpty()) {
            return [
                SELECT Id, FirstName, LastName, Email, Phone 
                FROM Contact 
                WHERE AccountId = :accounts[0].Id
            ];
        }
        return new List<Contact>();
    }

}
