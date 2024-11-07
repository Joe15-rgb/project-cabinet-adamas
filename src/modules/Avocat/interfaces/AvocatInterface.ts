// src/interfaces/AvocatInterface.ts
import { AvocatStatut } from 'App/types/enums';

export interface IAvocat {
  AvocatID?: number;
  Nom: string;
  Prenom: string;
  Specialite?: string;
  Barreau?: string;
  Email: string;
  Telephone?: string;
  Statut: AvocatStatut;
}
