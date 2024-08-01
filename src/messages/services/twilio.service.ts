import debug from "debug";
import Logger from "../../lib/logger";
import twilio from "twilio";

const debugLog: debug.IDebugger = debug('app:twilio-service');



class TwilioService {

  extractRecipients(recipients: string): string[] {
    recipients = recipients.replaceAll('(', '');
    recipients = recipients.replaceAll(')', '');
    recipients = recipients.replaceAll('-', '');
    recipients = recipients.replaceAll(' ', '');
    let recipientsArray = recipients.split(',');

    for(let i = 0; i < recipientsArray.length; i++) {
      if(recipientsArray[i][0] !== '1'){
        recipientsArray[i] = '1' + recipientsArray[i];
      }
      recipientsArray[i] = '+' + recipientsArray[i];
    }

    return recipientsArray;
  }

  logSendEvent(recipient: string, messageBody: string): void {
    //TODO Log to an actual logfile
    Logger.info('Recipient: ');
    Logger.info(recipient);
    Logger.info('Message: ')
    Logger.info(messageBody);
    Logger.info('-------------------------');
  }

  async sendTestMessage(recipients: string, messageBody: string){
    const sid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const sender = process.env.TWILIO_SENDER_NUMBER;
    const client = twilio(sid, authToken);

    const message = await client.messages.create({
      body: messageBody,
      from: sender,
      to: recipients
    });
  }

  async sendMessage(recipients: string, messageBody: string){
    const sid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const sender = process.env.TWILIO_SENDER_NUMBER;
    const client = twilio(sid, authToken);

    const recipientsArray = this.extractRecipients(recipients);
    for(const recipient of recipientsArray){
      this.logSendEvent(recipient, messageBody);
      const message = await client.messages.create({
        body: messageBody,
        from: sender,
        to: recipient
      });
    }
    return 'Success!'
  }
}

export default new TwilioService();