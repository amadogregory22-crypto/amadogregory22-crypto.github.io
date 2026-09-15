import React, { useState } from 'react';
import { Upload, Image as ImageIcon, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useStudioStore } from '../../store/useStudioStore';

export const ImportView: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState('Nouvelle Signature');

  const { setStep, setProject } = useStudioStore();

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (PNG, JPEG, WebP).');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;
    try {
      setLoading(true);
      // 1. Upload
      const uploadRes = await api.uploadImage(selectedFile);
      // 2. Create Project
      const project = await api.createProject(projectName, uploadRes.image_id, uploadRes.url);
      setProject(project);
      setStep('analysis');
    } catch (err: any) {
      alert(`Erreur d'importation : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-sky-600" />
          Signature Studio
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Importez une carte de visite ou ancienne signature pour lancer la détection modulaire par composants.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nom du projet / collaborateur
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
            placeholder="Ex : Signature Jean Dupont - RAGT"
          />
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-sky-500 bg-sky-50/50'
              : previewUrl
              ? 'border-emerald-400 bg-emerald-50/20'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50'
          }`}
          onClick={() => {
            document.getElementById('file-upload')?.click();
          }}
        >
          <input
            id="file-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
            }}
          />

          {previewUrl ? (
            <div className="flex flex-col items-center">
              <div className="relative max-h-64 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white p-2 mb-4">
                <img src={previewUrl} alt="Aperçu source" className="max-h-56 object-contain" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Source prête &amp; protégée (immuable)
              </span>
              <p className="text-xs text-slate-400 mt-2">Cliquez pour remplacer l'image</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-slate-700">
                Glissez-déposez votre image ici, ou parcourez
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP jusqu'à 10 Mo</p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleStartAnalysis}
            disabled={!selectedFile || loading}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all ${
              selectedFile && !loading
                ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Téléversement...' : 'Lancer l’analyse'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
