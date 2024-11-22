export type Email = {
  email: string
}

export type EmailAndPasswordReq = {
  email: string
  password: string
}

export type HandleResetPasswordReq = Pick<EmailAndPasswordReq, 'email'>

export type ResetPasswordDataReq = {
  password: string
  newPassword: string
}
