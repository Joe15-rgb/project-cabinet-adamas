// src/interfaces/ClientInterface.ts
import type { ClientType } from 'App/types/enums';

export interface IClient {
  ClientID?: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone?: string;
  Adresse?: string;
  Type: ClientType;
  SecteurActivite?: string;
}
