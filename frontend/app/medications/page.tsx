'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Medication, CreateMedicationDto } from '../types';
import { medicationApi } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function MedicationsPage() {
  const { t } = useLanguage();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [formData, setFormData] = useState<CreateMedicationDto>({
    name: '',
    dosage: '',
    frequency: '',
  });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const data = await medicationApi.getAll();
      setMedications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToFetchData'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await medicationApi.create(formData);
      setFormData({ name: '', dosage: '', frequency: '' });
      setShowCreateForm(false);
      fetchMedications();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToCreateMedication'));
    }
  };

  const handleEditMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedication) return;
    
    try {
      await medicationApi.update(editingMedication.id, formData);
      setFormData({ name: '', dosage: '', frequency: '' });
      setEditingMedication(null);
      fetchMedications();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToUpdateMedication'));
    }
  };

  const startEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setFormData({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingMedication(null);
    setFormData({ name: '', dosage: '', frequency: '' });
  };

  const handleDeleteMedication = async (id: number) => {
    if (!confirm(t('confirmDeleteMedication'))) return;
    
    try {
      await medicationApi.delete(id);
      fetchMedications();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToDeleteMedication'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">{t('medications')}</h1>
              <LanguageSwitcher />
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                {t('backToDashboard')}
              </Link>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                {showCreateForm ? t('cancel') : t('addMedication')}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Create/Edit Medication Form */}
        {(showCreateForm || editingMedication) && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingMedication ? t('editMedication') : t('createNewMedication')}
            </h2>
            <form onSubmit={editingMedication ? handleEditMedication : handleCreateMedication} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  {t('medicationName')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                />
              </div>
              <div>
                <label htmlFor="dosage" className="block text-sm font-medium text-black mb-1">
                  {t('dosage')}
                </label>
                <input
                  type="text"
                  id="dosage"
                  required
                  placeholder={t('dosagePlaceholder')}
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                />
              </div>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-black mb-1">
                  {t('frequency')}
                </label>
                <input
                  type="text"
                  id="frequency"
                  required
                  placeholder={t('frequencyPlaceholder')}
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  {editingMedication ? t('updateMedication') : t('create')}
                </button>
                <button
                  type="button"
                  onClick={editingMedication ? cancelEdit : () => setShowCreateForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Medications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t('medications')}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {medications.map((medication) => (
              <div key={medication.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{medication.name}</h3>
                  <p className="text-sm text-black">
                    {t('dosage')}: {medication.dosage} • {t('frequency')}: {medication.frequency}
                  </p>
                  {medication.assignments && medication.assignments.length > 0 && (
                    <p className="text-sm text-green-600">
                      {medication.assignments.length} {t('patientAssignments')}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditMedication(medication)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    {t('edit')}
                  </button>
                  <button
                    onClick={() => handleDeleteMedication(medication.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ))}
            {medications.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-black">{t('noMedicationsFound')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 