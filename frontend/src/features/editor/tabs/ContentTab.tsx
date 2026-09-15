import React from 'react';
import { useStudioStore } from '../../../store/useStudioStore';
import { DocumentFields } from '../../../types';

export const ContentTab: React.FC = () => {
  const { document, updateField } = useStudioStore();
  const fields = document?.fields || ({} as DocumentFields);

  const handleChange = (field: keyof DocumentFields, value: string) => {
    updateField(field, value);
  };

  return (
    <div className="p-4 space-y-4 text-xs">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Contenu Métier (Source Unique)</h4>
        <p className="text-slate-400 text-[11px]">
          Toute modification ici met à jour instantanément les éléments liés sur le canevas et les rendus Outlook.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Nom complet</label>
          <input
            type="text"
            value={fields.full_name || ''}
            onChange={(e) => handleChange('full_name', e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="Ex : Jean Dupont"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Fonction / Titre</label>
            <input
              type="text"
              value={fields.job_title || ''}
              onChange={(e) => handleChange('job_title', e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
              placeholder="Directeur Commercial"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Entreprise</label>
            <input
              type="text"
              value={fields.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
              placeholder="RAGT Semences"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Adresse E-mail</label>
          <input
            type="email"
            value={fields.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="jean.dupont@ragt.fr"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Téléphone Mobile</label>
            <input
              type="tel"
              value={fields.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
              placeholder="06 12 34 56 78"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Téléphone Fixe</label>
            <input
              type="tel"
              value={fields.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
              placeholder="05 65 73 41 00"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Site Web</label>
          <input
            type="text"
            value={fields.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="www.ragt.fr"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Adresse postale</label>
          <textarea
            rows={2}
            value={fields.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="Rue Emile Singla, 12000 Rodez"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Slogan / Baseline</label>
          <input
            type="text"
            value={fields.slogan || ''}
            onChange={(e) => handleChange('slogan', e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="Cultivons l'avenir ensemble"
          />
        </div>
      </div>
    </div>
  );
};
