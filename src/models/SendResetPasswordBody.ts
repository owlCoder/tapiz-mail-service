export interface SendResetPasswordBody {
  to: string;
  link: string;
  appName?: string;
}
