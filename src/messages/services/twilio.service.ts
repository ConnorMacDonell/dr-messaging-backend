class TwilioService {


  async sendMessage(recipients: string, messageBody: string){
    const recipientsArray = recipients.split(' ');
    //call Twilio API here
    return 'Success!'
  }
}

export default new TwilioService();