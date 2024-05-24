import debug from "debug";
import Logger from "../../lib/logger";

const debugLog: debug.IDebugger = debug('app:twilio-service');

class TwilioService {


  async sendMessage(recipients: string, messageBody: string){
    const recipientsArray = recipients.split(' ');
    //TODO call Twilio API here
    //TODO Log to an actual logfile
    Logger.info('Twilio')
    Logger.info(recipientsArray);
    Logger.info(messageBody);
    return 'Success!'
  }
}

export default new TwilioService();