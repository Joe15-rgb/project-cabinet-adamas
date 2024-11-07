import { AppointmentStatus } from 'App/types/enums';

export interface IAppointment {
  AppointmentID?: number;
  Date: Date;
  Heure: string;
  Duree: string;
  Statut: AppointmentStatus;
  Description: string;
  ClientID: number;
  AvocatID: number;
  DossierID?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
