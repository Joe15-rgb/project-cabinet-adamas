// src/types/enums.ts
export enum ClientType {
  Particulier = 'Particulier',
  Entreprise = 'Entreprise'
}

export enum DossierStatut {
  Ouvert = 'Ouvert',
  EnCours = 'En Cours',
  Clos = 'Clos'
}

export enum AvocatStatut {
  Associe = 'Associé',
  Stagiaire = 'Stagiaire',
  Partenaire = 'Partenaire'
}

export enum UserRole {
  Admin = "Admin",
  Avocat = "Avocat",
  Client = "Client",
}

export enum AppointmentStatus {
  EnAttente = 'En Attente',
  Annulee = 'Annulée',
  Validee = 'Validee',
  Refusee = 'Refusée',
}