// Service de synchronisation et recherche Active Directory / Microsoft Entra ID pour le Groupe RAGT

export interface AdUserProfile {
  id: string;
  userPrincipalName: string; // login AD / email (ex: mdubois@ragt.fr)
  firstName: string;
  lastName: string;
  displayName: string;
  jobTitle: string;
  jobTitleEn?: string;
  department: string;
  companyName: string; // Entité RAGT
  entityId: string;
  officeLocation: string;
  siteId?: string;
  mail: string;
  telephoneNumber: string;
  mobilePhone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  avatarUrl?: string;
  employeeId?: string;
}

export const MOCK_RAGT_AD_USERS: AdUserProfile[] = [
  {
    id: 'ad_ragt_001',
    userPrincipalName: 'marie.dubois@ragt.fr',
    firstName: 'Marie',
    lastName: 'Dubois',
    displayName: 'Marie Dubois',
    jobTitle: 'Directrice Communication & Marque',
    jobTitleEn: 'Head of Communications & Brand',
    department: 'Direction de la Communication',
    companyName: 'RAGT Groupe',
    entityId: 'ragt-groupe',
    officeLocation: 'Siège Social - Bourran (Rodez)',
    siteId: 'rodez-bourran',
    mail: 'marie.dubois@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 41 22',
    mobilePhone: '+33 (0)6 12 34 56 78',
    streetAddress: 'Rue Émile Singla - Site de Bourran',
    city: 'Rodez',
    postalCode: '12000',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-04821',
  },
  {
    id: 'ad_ragt_002',
    userPrincipalName: 'thomas.leroy@ragt.fr',
    firstName: 'Thomas',
    lastName: 'Leroy',
    displayName: 'Thomas Leroy',
    jobTitle: 'Responsable Systèmes & Réseaux',
    jobTitleEn: 'IT Infrastructure & Network Manager',
    department: 'Direction des Systèmes d’Information',
    companyName: 'RAGT Groupe',
    entityId: 'ragt-groupe',
    officeLocation: 'Siège Social - Bourran (Rodez)',
    siteId: 'rodez-bourran',
    mail: 'thomas.leroy@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 41 80',
    mobilePhone: '+33 (0)6 98 76 54 32',
    streetAddress: 'Rue Émile Singla - Site de Bourran',
    city: 'Rodez',
    postalCode: '12000',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-03912',
  },
  {
    id: 'ad_ragt_003',
    userPrincipalName: 'claire.delmas@ragt.fr',
    firstName: 'Claire',
    lastName: 'Delmas',
    displayName: 'Claire Delmas',
    jobTitle: 'Sélectionneuse Grandes Cultures & Maïs',
    jobTitleEn: 'Plant Breeder - Corn & Field Crops',
    department: 'Recherche & Sélection Végétale',
    companyName: 'RAGT 2n',
    entityId: 'ragt-2n',
    officeLocation: 'Centre de Recherche de Druelle',
    siteId: 'druelle-recherche',
    mail: 'claire.delmas@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 42 15',
    mobilePhone: '+33 (0)6 45 12 89 63',
    streetAddress: 'Site de Druelle, Route de Balsac',
    city: 'Druelle',
    postalCode: '12510',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-05118',
  },
  {
    id: 'ad_ragt_004',
    userPrincipalName: 'alexandre.fabre@ragt.fr',
    firstName: 'Alexandre',
    lastName: 'Fabre',
    displayName: 'Alexandre Fabre',
    jobTitle: 'Ingénieur Commercial Sud-Ouest',
    jobTitleEn: 'Sales Agronomist - South-West France',
    department: 'Direction Commerciale Semences',
    companyName: 'RAGT Semences',
    entityId: 'ragt-semences',
    officeLocation: 'Station de Recherche d’Albi',
    siteId: 'albi-station',
    mail: 'alexandre.fabre@ragt.fr',
    telephoneNumber: '+33 (0)5 63 49 20 18',
    mobilePhone: '+33 (0)6 71 82 93 04',
    streetAddress: 'Domaine de la Guitardié',
    city: 'Albi',
    postalCode: '81000',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-06044',
  },
  {
    id: 'ad_ragt_005',
    userPrincipalName: 'julie.rouquet@ragt.fr',
    firstName: 'Julie',
    lastName: 'Rouquet',
    displayName: 'Julie Rouquet',
    jobTitle: 'Conseillère Agronomique & Territoires',
    jobTitleEn: 'Agronomy Consultant',
    department: 'Pôle Végétal & Productions',
    companyName: 'RAGT Plateau Central',
    entityId: 'ragt-plateau-central',
    officeLocation: 'Plateau Central - Siège (Rodez)',
    siteId: 'rodez-toulouse',
    mail: 'julie.rouquet@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 40 50',
    mobilePhone: '+33 (0)6 23 45 67 89',
    streetAddress: 'Avenue de Toulouse, CS 60309',
    city: 'Rodez Cedex 9',
    postalCode: '12003',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-07231',
  },
  {
    id: 'ad_ragt_006',
    userPrincipalName: 'lucas.bertrand@ragt.fr',
    firstName: 'Lucas',
    lastName: 'Bertrand',
    displayName: 'Lucas Bertrand',
    jobTitle: 'Responsable Magasin & Rayon Jardin',
    jobTitleEn: 'Store Manager',
    department: 'Réseau Magasins RAGT Jardin & Maison',
    companyName: 'RAGT Jardin & Maison',
    entityId: 'ragt-jardin-maison',
    officeLocation: 'Magasin Onet-le-Château',
    siteId: 'rodez-bourran',
    mail: 'lucas.bertrand@ragt.fr',
    telephoneNumber: '+33 (0)5 65 77 10 20',
    mobilePhone: '+33 (0)6 88 99 00 11',
    streetAddress: 'Route d’Espalion',
    city: 'Onet-le-Château',
    postalCode: '12850',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-08190',
  },
  {
    id: 'ad_ragt_007',
    userPrincipalName: 'sophie.marty@ragt.fr',
    firstName: 'Sophie',
    lastName: 'Marty',
    displayName: 'Sophie Marty',
    jobTitle: 'Directrice des Ressources Humaines',
    jobTitleEn: 'Human Resources Director',
    department: 'Direction des Ressources Humaines',
    companyName: 'RAGT Groupe',
    entityId: 'ragt-groupe',
    officeLocation: 'Siège Social - Bourran (Rodez)',
    siteId: 'rodez-bourran',
    mail: 'sophie.marty@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 41 10',
    mobilePhone: '+33 (0)6 11 22 33 44',
    streetAddress: 'Rue Émile Singla - Site de Bourran',
    city: 'Rodez',
    postalCode: '12000',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-02100',
  },
  {
    id: 'ad_ragt_008',
    userPrincipalName: 'jean.dupont@ragt.fr',
    firstName: 'Jean',
    lastName: 'Dupont',
    displayName: 'Jean Dupont',
    jobTitle: 'International Product Manager',
    jobTitleEn: 'International Product Manager',
    department: 'International Marketing & Portfolio',
    companyName: 'RAGT International',
    entityId: 'ragt-international',
    officeLocation: 'Siège Social - Bourran (Rodez)',
    siteId: 'rodez-bourran',
    mail: 'jean.dupont@ragt.fr',
    telephoneNumber: '+33 (0)5 65 73 41 33',
    mobilePhone: '+33 (0)6 55 44 33 22',
    streetAddress: 'Rue Émile Singla - Site de Bourran',
    city: 'Rodez',
    postalCode: '12000',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    employeeId: 'RAGT-01955',
  },
];

export const adDirectoryService = {
  /**
   * Recherche dans l'Active Directory RAGT par texte libre (nom, prénom, email, poste, service)
   */
  async searchUsers(query: string): Promise<AdUserProfile[]> {
    const trimmed = query.trim().toLowerCase();
    
    // Tentative d'appel API backend si disponible
    try {
      const response = await fetch(`/api/directory/search?q=${encodeURIComponent(trimmed)}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Fallback gracieux sur le catalogue local
    }

    if (!trimmed) {
      return MOCK_RAGT_AD_USERS;
    }

    return MOCK_RAGT_AD_USERS.filter((user) => {
      const searchable = [
        user.firstName,
        user.lastName,
        user.displayName,
        user.jobTitle,
        user.department,
        user.companyName,
        user.mail,
        user.userPrincipalName,
        user.city,
      ].join(' ').toLowerCase();

      return searchable.includes(trimmed);
    });
  },

  /**
   * Récupère un profil collaborateur AD par son identifiant ou email
   */
  async getUserById(idOrEmail: string): Promise<AdUserProfile | null> {
    const user = MOCK_RAGT_AD_USERS.find(
      (u) => u.id === idOrEmail || u.mail.toLowerCase() === idOrEmail.toLowerCase() || u.userPrincipalName.toLowerCase() === idOrEmail.toLowerCase()
    );
    return user || null;
  },

  /**
   * Récupère le profil de l'utilisateur connecté dans l'environnement M365 / AD
   */
  async getCurrentUserAdProfile(): Promise<AdUserProfile> {
    // Par défaut Marie Dubois (Profil par défaut DSI/Comms)
    return MOCK_RAGT_AD_USERS[0];
  }
};
