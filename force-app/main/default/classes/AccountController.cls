public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        return [SELECT Id, Name, Industry, Phone, Type FROM Account LIMIT 100];
    }

    @AuraEnabled
    public static List<Account> getAllAcc() {
        return [SELECT Id, Name, Industry, Phone, Type FROM Account LIMIT 100];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account ORDER BY Name];
    }
}
