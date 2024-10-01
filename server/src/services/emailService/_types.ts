export type EmailUser = {
  name: string
  email: string
}

export type EmailParams = {
  parameter: string
  subject: string
}

export type EmailServiceType = {
  emailSender: EmailUser
  emailSubject: string
  emailTemplate: string
  emailTo: EmailUser[]
  emailReplyTo?: EmailUser
  emailHeaders?: Record<string, string>
  emailParams?: EmailParams
}
