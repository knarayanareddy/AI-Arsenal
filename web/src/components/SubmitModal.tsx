import React, { useState } from 'react';
import { X, Send, Sparkles, Check } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Inference & Serving');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setUrl('');
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#0f1016] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <X className="size-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="size-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="size-6" />
            </div>
            <h3 className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100">
              Submission Received
            </h3>
            <p className="text-[13px] text-neutral-500 max-w-xs mx-auto">
              Thank you! Our automated scraper and verification agent will analyze the repository and index it into AI Arsenal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 mb-1.5">
                <Sparkles className="size-3" />
                <span>Submit to Catalog</span>
              </div>
              <h3 className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100">
                Submit an AI Resource
              </h3>
              <p className="text-[12px] text-neutral-500 mt-0.5">
                Add an open source model, runtime, tool, or research paper to AI Arsenal.
              </p>
            </div>

            <div className="space-y-3 text-[13px]">
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Resource Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SGLang, DeepSeek-R1, DSPy"
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-[13px] focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  GitHub or Official URL
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-[13px] focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-[13px] focus:outline-hidden focus:border-sky-500"
                >
                  <option value="Inference & Serving">Inference & Serving</option>
                  <option value="Autonomous Agents">Autonomous Agents</option>
                  <option value="RAG & Vector Retrieval">RAG & Vector Retrieval</option>
                  <option value="Fine-Tuning & Training">Fine-Tuning & Training</option>
                  <option value="Evals & Guardrails">Evals & Guardrails</option>
                  <option value="Multimodal & Vision">Multimodal & Vision</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  One-Line Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What makes this resource essential for production AI builders?"
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-[13px] focus:outline-hidden focus:border-sky-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 text-[13px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-[13px] hover:bg-neutral-800 dark:hover:bg-neutral-100 flex items-center gap-1.5 shadow-2xs"
              >
                <Send className="size-3" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
