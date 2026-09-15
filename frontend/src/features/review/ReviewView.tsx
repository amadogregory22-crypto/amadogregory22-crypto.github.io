import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  CheckCheck,
  Plus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Trash2,
  Eye,
  EyeOff,
  User,
  Phone,
  QrCode,
  Share2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { StageContainer } from '../../canvas/StageContainer';
import { useReviewStore } from '../../store/useReviewStore';
import { useStudioStore } from '../../store/useStudioStore';
import { api } from '../../services/api';
import { SemanticType, CandidateComponent } from '../../types';

const SEMANTIC_TYPES: { value: SemanticType; label: string }[] = [
  { value: 'name', label: 'Nom / Prénom' },
  { value: 'job_title', label: 'Fonction / Titre' },
  { value: 'company', label: 'Entreprise' },
  { value: 'email', label: 'E-mail' },
  { value: 'mobile', label: 'Téléphone Mobile' },
  { value: 'phone', label: 'Téléphone Fixe' },
  { value: 'website', label: 'Site Web' },
  { value: 'address', label: 'Adresse postale' },
  { value: 'slogan', label: 'Slogan / Baseline' },
  { value: 'logo', label: 'Logo' },
  { value: 'icon_contact', label: 'Icône de contact' },
  { value: 'social_network', label: 'Réseau social' },
  { value: 'qr_code', label: 'QR Code' },
  { value: 'graphic_shape', label: 'Élément graphique' },
];

export const ReviewView: React.FC = () => {
  const { project, setDocument, setStep } = useStudioStore();
  const {
    candidates,
    selectedCandidateId,
    filter,
    selectCandidate,
    setFilter,
    updateCandidateStatus,
    updateCandidateSemanticType,
    updateCandidateValue,
    confirmAllReliable,
    addManualCandidate,
    removeCandidate,
  } = useReviewStore();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    identity: true,
    contact: true,
    media: true,
    social: true,
    slogans: true,
    other: false,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  // Group candidates semantically
  const groups = {
    identity: candidates.filter((c) => ['name', 'first_name', 'last_name', 'job_title', 'company'].includes(c.semantic_type)),
    contact: candidates.filter((c) => ['email', 'phone', 'mobile', 'website', 'address', 'icon_contact'].includes(c.semantic_type)),
    media: candidates.filter((c) => ['logo', 'qr_code'].includes(c.semantic_type)),
    social: candidates.filter((c) => c.semantic_type === 'social_network'),
    slogans: candidates.filter((c) => ['slogan', 'graphic_shape'].includes(c.semantic_type)),
    other: candidates.filter((c) => c.semantic_type === 'unknown'),
  };

  const handleBuildDocument = async () => {
    if (!project) return;
    const confirmedIds = candidates
      .filter((c) => c.status === 'confirmed' || c.status === 'review')
      .map((c) => c.id);

    if (confirmedIds.length === 0) {
      alert('Veuillez confirmer au moins un composant avant de générer le document.');
      return;
    }

    try {
      const doc = await api.buildDocument(project.id, confirmedIds);
      setDocument(doc);
      setStep('editor');
    } catch (err: any) {
      alert(`Erreur de construction : ${err.message}`);
    }
  };

  const handleClearRejected = () => {
    candidates.forEach((c) => {
      if (c.status === 'rejected' || (c.semantic_type === 'unknown' && c.confidence < 0.6)) {
        removeCandidate(c.id);
      }
    });
  };

  const renderCandidateItem = (c: CandidateComponent) => {
    const isSelected = c.id === selectedCandidateId;
    return (
      <div
        key={c.id}
        onClick={() => selectCandidate(c.id)}
        className={`p-2 rounded-lg cursor-pointer transition-all ${
          isSelected
            ? 'bg-sky-100/80 border border-sky-300'
            : 'hover:bg-slate-50 border border-slate-100'
        }`}
      >
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs font-bold text-slate-800 truncate">{c.semantic_type}</span>
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              c.status === 'confirmed'
                ? 'bg-emerald-100 text-emerald-700'
                : c.status === 'review'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {c.status}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 truncate font-medium">{c.value}</p>
        <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
          <span>{c.source_engine}</span>
          <span>{Math.round(c.confidence * 100)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-65px)] flex">
      {/* Center Canvas Area (Source + Overlays) */}
      <div className="flex-1 flex flex-col h-full bg-slate-100">
        {/* Review Toolbar */}
        <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Revue Non Destructive
            </span>
            <div className="h-4 w-px bg-slate-200 mx-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                filter === 'all' ? 'bg-sky-100 text-sky-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tous ({candidates.length})
            </button>
            <button
              onClick={() => setFilter('uncertain_only')}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                filter === 'uncertain_only'
                  ? 'bg-amber-100 text-amber-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              À vérifier ({candidates.filter((c) => c.status === 'review').length})
            </button>
            <button
              onClick={() => setFilter('confirmed_only')}
              className={`px-2.5 py-1 rounded text-xs font-medium ${
                filter === 'confirmed_only'
                  ? 'bg-emerald-100 text-emerald-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Confirmés ({candidates.filter((c) => c.status === 'confirmed').length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => confirmAllReliable(0.85)}
              className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Tout confirmer fiable
            </button>
            <button
              onClick={handleClearRejected}
              className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Nettoyer les éléments rejetés"
            >
              <Trash2 className="w-3 h-3" /> Nettoyer bruit
            </button>
            <button
              onClick={() =>
                addManualCandidate({ x: 50, y: 50, width: 160, height: 28 }, 'name', 'Nouveau composant')
              }
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="flex-1 relative">
          <StageContainer mode="review" />
        </div>
      </div>

      {/* Right Sidebar: Structured Domain Groups & Inspector */}
      <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-full z-20">
        <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Composants Détectés</h3>
          <span className="text-xs text-slate-500 font-medium">
            {candidates.filter((c) => c.status === 'confirmed').length}/{candidates.length} validés
          </span>
        </div>

        {/* Selected Candidate Detailed Inspector */}
        {selectedCandidate && (
          <div className="p-3.5 bg-sky-50/70 border-b border-sky-100 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Édition du candidat
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-200/60 text-sky-800 font-bold">
                {Math.round(selectedCandidate.confidence * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Type</label>
                <select
                  value={selectedCandidate.semantic_type}
                  onChange={(e) =>
                    updateCandidateSemanticType(selectedCandidate.id, e.target.value as SemanticType)
                  }
                  className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white font-medium"
                >
                  {SEMANTIC_TYPES.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Statut</label>
                <select
                  value={selectedCandidate.status}
                  onChange={(e) =>
                    updateCandidateStatus(selectedCandidate.id, e.target.value as any)
                  }
                  className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white font-medium"
                >
                  <option value="confirmed">Confirmé</option>
                  <option value="review">À revoir</option>
                  <option value="rejected">Rejeté</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Valeur / Texte</label>
              <input
                type="text"
                value={selectedCandidate.value}
                onChange={(e) => updateCandidateValue(selectedCandidate.id, e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium text-slate-800"
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <button
                onClick={() => removeCandidate(selectedCandidate.id)}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Supprimer
              </button>
              <button
                onClick={() => selectCandidate(null)}
                className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Fermer l'inspecteur
              </button>
            </div>
          </div>
        )}

        {/* Structured Accordion of Candidates */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* 1. Identité & Entreprise */}
          {groups.identity.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup('identity')}
                className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  Identité &amp; Poste ({groups.identity.length})
                </span>
                {expandedGroups.identity ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedGroups.identity && (
                <div className="p-2 space-y-1.5 bg-white">
                  {groups.identity.map(renderCandidateItem)}
                </div>
              )}
            </div>
          )}

          {/* 2. Coordonnées & Contact */}
          {groups.contact.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup('contact')}
                className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Coordonnées &amp; Contact ({groups.contact.length})
                </span>
                {expandedGroups.contact ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedGroups.contact && (
                <div className="p-2 space-y-1.5 bg-white">
                  {groups.contact.map(renderCandidateItem)}
                </div>
              )}
            </div>
          )}

          {/* 3. Logos & QR Code */}
          {groups.media.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup('media')}
                className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <span className="flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                  Logos &amp; QR Code ({groups.media.length})
                </span>
                {expandedGroups.media ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedGroups.media && (
                <div className="p-2 space-y-1.5 bg-white">
                  {groups.media.map(renderCandidateItem)}
                </div>
              )}
            </div>
          )}

          {/* 4. Réseaux Sociaux */}
          {groups.social.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup('social')}
                className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  Réseaux Sociaux ({groups.social.length})
                </span>
                {expandedGroups.social ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedGroups.social && (
                <div className="p-2 space-y-1.5 bg-white">
                  {groups.social.map(renderCandidateItem)}
                </div>
              )}
            </div>
          )}

          {/* 5. Slogans & Décors */}
          {groups.slogans.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup('slogans')}
                className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Slogans &amp; Graphismes ({groups.slogans.length})
                </span>
                {expandedGroups.slogans ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedGroups.slogans && (
                <div className="p-2 space-y-1.5 bg-white">
                  {groups.slogans.map(renderCandidateItem)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Build Button */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleBuildDocument}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all text-sm"
          >
            Valider et construire
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
