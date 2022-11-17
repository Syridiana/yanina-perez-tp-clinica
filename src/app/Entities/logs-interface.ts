import { Timestamp } from "@angular/fire/firestore";

export interface LogsI {
    uid?: string;
    date: Timestamp | undefined;
    user: any | undefined;
  }