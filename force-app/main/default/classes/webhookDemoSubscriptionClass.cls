@RestResource(urlMapping='/api/Webhooks/pushDetailsdemo')
global with sharing class webhookDemoSubscriptionClass {
    @HttpPost
    global static void handleNotification() {
        try{
            
            RestRequest request = RestContext.request;
            RestResponse response = RestContext.response;
            String hashedval = request.headers.get('X-Hub-Signature-256');
            System.debug('hashedval:'+hashedval);
            Blob bB = request.requestBody;
            System.debug('blob:'+bB.toString());
                System.debug('Secret value Matched and source can be trusted!');
                JSONParser parser = JSON.createParser(request.requestBody.toString());
                pusher ps;
                head_commit hc;
                String repo;
                while(parser.nextToken()!=null){
                    if(parser.getText()=='pusher'){
                        System.debug('inside pusher');
                        parser.nextToken();
                        ps = (pusher)parser.readValueAs(pusher.class);
                        System.debug(ps);
                    }
                    
                    if(parser.getText()=='head_commit'){
                        System.debug('inside head_commit');

                        parser.nextToken();
                        hc = (head_commit)parser.readValueAs(head_commit.class);
                        System.debug(hc);
                    }
                    if(parser.getText()=='full_name'){
                        System.debug('inside full_name');

                        parser.nextToken();
                        repo = parser.getText();
                        System.debug(repo);
                    }
                }

                GitHub_Push_Details__c detail = new GitHub_Push_Details__c(); // Create a new GitHub_Push_Details__c object record 
                detail.Commiter_Name__c = ps!=null?ps.name:'';
                detail.Commiter_Email__c = ps!=null?ps.email:'';
                detail.Commit_Message__c = hc!=null?hc.message:'';
                detail.Commit_Timestamp__c = hc!=null?hc.timestamp:'';
                detail.Commited_URL__c = hc!=null?hc.url:'';
                detail.Repository_Name__c = repo;
                detail.Modified_Compoents__c = hc!=null&&hc.modified!=null?String.join(hc.modified,','):'';
                insert detail;
                response.statusCode = 200;
                response.responseBody = Blob.valueOf(JSON.serialize(new SFDCResponse('Success','Processed Successfully')));

        }
        catch(Exception e){
            System.debug('Exception Happened:'+e.getMessage());
        }
    }

    public class SFDCResponse{
        String response;
        String message;
        public SFDCResponse(String resp, String msg){
            response = resp;
            message = msg;
        }
    }
    public class pusher{
        public String name;
        public String email;
        public pusher(String name, String email){
            name = name;
            email = email;
        }
    }
    public class head_commit{
        public String message;
        public String timestamp;
        public String url;
        public List<String> modified;
        public head_commit(String message,String timestamp,String url,List<String> modified){
            message = message;
            timestamp = timestamp;
            url = url;
            modified = modified;
        }
    }
}