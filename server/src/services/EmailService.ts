import * as brevo from '@getbrevo/brevo'
import { EmailParams, EmailServiceType, EmailUser } from './emailService/_types'

class EmailService {
  emailSender: EmailUser
  emailSubject: string
  emailTemplate: string
  emailTo: EmailUser[]
  emailReplyTo?: EmailUser
  emailHeaders?: Record<string, string>
  emailParams?: EmailParams
  constructor(emailService: EmailServiceType) {
    this.emailSender = emailService.emailSender
    this.emailSubject = emailService.emailSubject
    this.emailTemplate = emailService.emailTemplate
    this.emailTo = emailService.emailTo
    this.emailReplyTo = emailService.emailReplyTo
    this.emailHeaders = emailService.emailHeaders
    this.emailParams = emailService.emailParams
  }
  async sendMail() {
    const apiInstance = new brevo.TransactionalEmailsApi()
    /* eslint-disable no-undef */
    const BREVO_API_KEY = process.env.BREVO_API_KEY

    if (!BREVO_API_KEY) return

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      BREVO_API_KEY
    )

    const sendSmtpEmail = new brevo.SendSmtpEmail()

    sendSmtpEmail.subject = this.emailSubject
    sendSmtpEmail.htmlContent = this.emailTemplate

    sendSmtpEmail.sender = this.emailSender
    sendSmtpEmail.to = this.emailTo

    sendSmtpEmail.replyTo = this.emailReplyTo
    sendSmtpEmail.headers = this.emailHeaders
    sendSmtpEmail.params = this.emailParams

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail)
    } catch (error) {
      return error
    }
  }
}
export default EmailService
