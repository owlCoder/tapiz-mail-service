export interface SendSessionSummaryBody {
  to: string;
  appName?: string;
  subjectName: string;
  sessionNumber: number;
  sessionType: string;
  presentCount: number;
  absentCount: number;
  totalEnrolled: number;
}
