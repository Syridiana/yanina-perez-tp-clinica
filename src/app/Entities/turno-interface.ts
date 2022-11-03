export interface TurnoI {
  uid?: string;
  doctorEmail: string | undefined;
  patientEmail: string | undefined;
  patientName: string | undefined;
  doctorName: string | undefined;
  date : string | undefined;
  specialty: string | undefined;
  state: string | undefined;
  patientReview: string | undefined;
  patientSurvey: string | undefined;
  patientQualification: string | undefined;

  doctorComments: string | undefined;
  doctorReview: string | undefined;
  diagnosis: string | undefined;

  adminComments: string | undefined;
}