export interface Send2faBody {
  to:       string;
  code:     string;
  appName?: string;
}