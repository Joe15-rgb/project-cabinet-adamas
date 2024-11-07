// src/interfaces/DossierInterface.ts
import { DossierStatut } from 'App/types/enums';

export interface IDossier {
  DossierID?: number;
  Nom: string;
  DateOuverture: Date;
  DateCloture?: Date;
  Statut: DossierStatut;
  Type: string;
  Description?: string;
  ClientID?: number;
  Score: Points;
}
interface Points {
  total: number; // Total des points
  historique: PointHistorique[]; // Historique des points
}

interface PointHistorique {
  date: Date; // Date d'attribution ou de retrait de points
  description: string; // Description de l'opération
  pointsChange: number; // Changement de points (positif ou négatif)
}