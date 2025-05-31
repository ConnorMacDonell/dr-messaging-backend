"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const logger_1 = __importDefault(require("../../lib/logger"));
const twilio_1 = __importDefault(require("twilio"));
const debugLog = (0, debug_1.default)('app:twilio-service');
class TwilioService {
    extractRecipients(recipients) {
        recipients = recipients.replaceAll('(', '');
        recipients = recipients.replaceAll(')', '');
        recipients = recipients.replaceAll('-', '');
        recipients = recipients.replaceAll(' ', '');
        let recipientsArray = recipients.split(',');
        for (let i = 0; i < recipientsArray.length; i++) {
            if (recipientsArray[i][0] !== '1') {
                recipientsArray[i] = '1' + recipientsArray[i];
            }
            recipientsArray[i] = '+' + recipientsArray[i];
        }
        return recipientsArray;
    }
    logSendEvent(recipient, messageBody) {
        //TODO Log to an actual logfile
        logger_1.default.info('Recipient: ');
        logger_1.default.info(recipient);
        logger_1.default.info('Message: ');
        logger_1.default.info(messageBody);
        logger_1.default.info('-------------------------');
    }
    async sendTestMessage(recipients, messageBody) {
        const sid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const sender = process.env.TWILIO_SENDER_NUMBER;
        const client = (0, twilio_1.default)(sid, authToken);
        const message = await client.messages.create({
            body: messageBody,
            from: sender,
            to: recipients
        });
    }
    async sendMessage(recipients, messageBody) {
        const sid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const sender = process.env.TWILIO_SENDER_NUMBER;
        const client = (0, twilio_1.default)(sid, authToken);
        const recipientsArray = this.extractRecipients(recipients);
        for (const recipient of recipientsArray) {
            this.logSendEvent(recipient, messageBody);
            const message = await client.messages.create({
                body: messageBody,
                from: sender,
                to: recipient
            });
        }
        return 'Success!';
    }
}
exports.default = new TwilioService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpbGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWVzc2FnZXMvc2VydmljZXMvdHdpbGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsOERBQXNDO0FBQ3RDLG9EQUE0QjtBQUU1QixNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUk5RCxNQUFNLGFBQWE7SUFFakIsaUJBQWlCLENBQUMsVUFBa0I7UUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQyxJQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUMsQ0FBQztnQkFDaEMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUNELGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWSxDQUFDLFNBQWlCLEVBQUUsV0FBbUI7UUFDakQsK0JBQStCO1FBQy9CLGdCQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNCLGdCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hCLGdCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGdCQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBa0IsRUFBRSxXQUFtQjtRQUMzRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV0QyxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osRUFBRSxFQUFFLFVBQVU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFrQixFQUFFLFdBQW1CO1FBQ3ZELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ25DLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxLQUFJLE1BQU0sU0FBUyxJQUFJLGVBQWUsRUFBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsTUFBTTtnQkFDWixFQUFFLEVBQUUsU0FBUzthQUNkLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=