import React, { useEffect, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { PersonalInfo, LabelsConfig, VisibilityConfig } from '../../types/signature';
import {
  UserCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  Tag,
  Sparkles
} from 'lucide-react';

export const InfoPanel: React.FC = () => {
  const { state, updateState } = useSignature();
  const { personal, labels, visibility } = state;
  const [activeSection, setActiveSection] = useState<'identity' | 'contact' | 'address' | 'labels'>('identity');

  useEffect(() => {
    const focusRequestedControl = (event: Event) => {
      const target = (event as CustomEvent<{ target?: string }>).detail?.target;
      if (target !== 'signature-email') return;
      setActiveSection('contact');
      window.setTimeout(() => document.getElementById(target)?.focus(), 0);
    };
    window.addEventListener('ragt:focus-control', focusRequestedControl);
    return () => window.removeEventListener('ragt:focus-control', focusRequestedControl);
  }, []);

  const updatePersonal = (key: keyof PersonalInfo, value: string) => {
    updateState((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [key]: value
      }
    }));
  };

  const toggleVisibility = (key: keyof VisibilityConfig) => {
    updateState((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [key]: !prev.visibility[key]
      }
    }));
  };

  const updateLabel = (key: keyof LabelsConfig, value: string) => {
    updateState((prev) => ({
      ...prev,
      labels: {
        ...prev.labels,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-4 space-y-4 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-[#F7BD00]" />
          Informations du collaborateur
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Renseignez vos coordonnées. Masquer un champ conserve sa valeur.
        </p>
      </div>

      {/* Segmented Section Navigator */}
      <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSection('identity')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSection === 'identity' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Identité
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('contact')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSection === 'contact' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Téléphonie
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('address')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSection === 'address' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Localisation
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('labels')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSection === 'labels' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Libellés
        </button>
      </div>

      {/* SECTION 1: IDENTITÉ & POSTE */}
      {activeSection === 'identity' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          {/* Civilité, Prénom, Nom */}
          <div className="grid grid-cols-4 gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Civilité</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('civility')}
                  className={`text-[10px] ${visibility.civility ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.civility ? 'Visible' : 'Masqué'}
                >
                  {visibility.civility ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Civilité"
                placeholder="M."
                value={personal.civility}
                onChange={(e) => updatePersonal('civility', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="col-span-3">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Prénom *</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('firstName')}
                  className={`text-[10px] ${visibility.firstName ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.firstName ? 'Visible' : 'Masqué'}
                >
                  {visibility.firstName ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Prénom"
                value={personal.firstName}
                onChange={(e) => updatePersonal('firstName', e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Nom de famille *</label>
              <button
                type="button"
                onClick={() => toggleVisibility('lastName')}
                className={`text-[10px] ${visibility.lastName ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.lastName ? 'Visible' : 'Masqué'}
              >
                {visibility.lastName ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              aria-label="Nom de famille"
              value={personal.lastName}
              onChange={(e) => updatePersonal('lastName', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-bold text-[#0C3866] uppercase"
            />
          </div>

          {/* Fonction / Poste */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Fonction / Poste</label>
              <button
                type="button"
                onClick={() => toggleVisibility('jobTitle')}
                className={`text-[10px] ${visibility.jobTitle ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.jobTitle ? 'Visible' : 'Masqué'}
              >
                {visibility.jobTitle ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              aria-label="Fonction ou poste"
              value={personal.jobTitle}
              onChange={(e) => updatePersonal('jobTitle', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white text-slate-700 italic"
            />
          </div>

          {/* Département & Service */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Département</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('department')}
                  className={`text-[10px] ${visibility.department ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.department ? 'Visible' : 'Masqué'}
                >
                  {visibility.department ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Département"
                placeholder="Ex: Systèmes d’Information"
                value={personal.department}
                onChange={(e) => updatePersonal('department', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Service</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('service')}
                  className={`text-[10px] ${visibility.service ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.service ? 'Visible' : 'Masqué'}
                >
                  {visibility.service ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Service"
                placeholder="Ex: Assistance"
                value={personal.service}
                onChange={(e) => updatePersonal('service', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Entreprise & Filiale */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Société *</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('company')}
                  className={`text-[10px] ${visibility.company ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.company ? 'Visible' : 'Masqué'}
                >
                  {visibility.company ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Société"
                value={personal.company}
                onChange={(e) => updatePersonal('company', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-bold text-[#0C3866]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Établissement / Filiale</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('subsidiary')}
                  className={`text-[10px] ${visibility.subsidiary ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.subsidiary ? 'Visible' : 'Masqué'}
                >
                  {visibility.subsidiary ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                aria-label="Établissement ou filiale"
                placeholder="Ex: Siège Social"
                value={personal.subsidiary}
                onChange={(e) => updatePersonal('subsidiary', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TÉLÉPHONIE & E-MAIL */}
      {activeSection === 'contact' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          {/* E-mail professionnel */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Adresse e-mail pro *</label>
              <button
                type="button"
                onClick={() => toggleVisibility('email')}
                className={`text-[10px] ${visibility.email ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.email ? 'Visible' : 'Masqué'}
              >
                {visibility.email ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              id="signature-email"
              type="email"
              aria-label="Adresse e-mail professionnelle"
              value={personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-medium text-[#0C3866]"
            />
          </div>

          {/* Téléphone fixe */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Téléphone fixe direct</label>
              <button
                type="button"
                onClick={() => toggleVisibility('phone')}
                className={`text-[10px] ${visibility.phone ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.phone ? 'Visible' : 'Masqué'}
              >
                {visibility.phone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              value={personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-mono"
            />
          </div>

          {/* Téléphone mobile */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Téléphone portable / Mobile</label>
              <button
                type="button"
                onClick={() => toggleVisibility('mobile')}
                className={`text-[10px] ${visibility.mobile ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.mobile ? 'Visible' : 'Masqué'}
              >
                {visibility.mobile ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              value={personal.mobile}
              onChange={(e) => updatePersonal('mobile', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white font-mono"
            />
          </div>

          {/* Standard & Fax */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Standard</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('standardPhone')}
                  className={`text-[10px] ${visibility.standardPhone ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.standardPhone ? 'Visible' : 'Masqué'}
                >
                  {visibility.standardPhone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                value={personal.standardPhone}
                onChange={(e) => updatePersonal('standardPhone', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600">Fax</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('fax')}
                  className={`text-[10px] ${visibility.fax ? 'text-emerald-700' : 'text-slate-400'}`}
                  title={visibility.fax ? 'Visible' : 'Masqué'}
                >
                  {visibility.fax ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              <input
                type="text"
                placeholder="Facultatif"
                value={personal.fax}
                onChange={(e) => updatePersonal('fax', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ADRESSE & SITE WEB */}
      {activeSection === 'address' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          {/* Site Web */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Site internet</label>
              <button
                type="button"
                onClick={() => toggleVisibility('website')}
                className={`text-[10px] ${visibility.website ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.website ? 'Visible' : 'Masqué'}
              >
                {visibility.website ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              value={personal.website}
              onChange={(e) => updatePersonal('website', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white text-blue-700"
            />
          </div>

          {/* Adresse Ligne 1 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Adresse ligne 1</label>
              <button
                type="button"
                onClick={() => toggleVisibility('address')}
                className={`text-[10px] ${visibility.address ? 'text-emerald-700' : 'text-slate-400'}`}
                title={visibility.address ? 'Visible' : 'Masqué'}
              >
                {visibility.address ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <input
              type="text"
              value={personal.addressLine1}
              onChange={(e) => updatePersonal('addressLine1', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Adresse Ligne 2 */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Complément (Ligne 2)</label>
            <input
              type="text"
              placeholder="Ex: Site de Bourran"
              value={personal.addressLine2}
              onChange={(e) => updatePersonal('addressLine2', e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
            />
          </div>

          {/* CP & Ville */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Code Postal</label>
              <input
                type="text"
                value={personal.postalCode}
                onChange={(e) => updatePersonal('postalCode', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Ville</label>
              <input
                type="text"
                value={personal.city}
                onChange={(e) => updatePersonal('city', e.target.value)}
                className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: LIBELLÉS PERSONNALISABLES (Requirement 12) */}
      {activeSection === 'labels' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-2">
            Personnalisez les préfixes affichés devant chaque coordonnée (ou laissez vide pour ne mettre que l’icône).
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Fixe</label>
              <input
                type="text"
                value={labels.phone}
                onChange={(e) => updateLabel('phone', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Portable</label>
              <input
                type="text"
                value={labels.mobile}
                onChange={(e) => updateLabel('mobile', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 block mb-1">E-mail</label>
              <input
                type="text"
                value={labels.email}
                onChange={(e) => updateLabel('email', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Standard</label>
              <input
                type="text"
                value={labels.standardPhone || ''}
                onChange={(e) => updateLabel('standardPhone', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Direct</label>
              <input
                type="text"
                value={labels.directPhone || ''}
                onChange={(e) => updateLabel('directPhone', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Fax</label>
              <input
                type="text"
                value={labels.fax || ''}
                onChange={(e) => updateLabel('fax', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Site Web</label>
              <input
                type="text"
                value={labels.website}
                onChange={(e) => updateLabel('website', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-slate-600 block mb-1">Adresse</label>
              <input
                type="text"
                value={labels.address}
                onChange={(e) => updateLabel('address', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
