'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Patient, CreatePatientDto } from '../types';
import { patientApi } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function PatientsPage() {
  const { t } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<CreatePatientDto>({
    name: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientApi.getAll();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToFetchData'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await patientApi.create(formData);
      setFormData({ name: '', dateOfBirth: '' });
      setShowCreateForm(false);
      fetchPatients();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToCreatePatient'));
    }
  };

  const handleEditPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    
    try {
      await patientApi.update(editingPatient.id, formData);
      setFormData({ name: '', dateOfBirth: '' });
      setEditingPatient(null);
      fetchPatients();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToUpdatePatient'));
    }
  };

  const startEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingPatient(null);
    setFormData({ name: '', dateOfBirth: '' });
  };

  const handleDeletePatient = async (id: number) => {
    if (!confirm(t('confirmDeletePatient'))) return;
    
    try {
      await patientApi.delete(id);
      fetchPatients();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToDeletePatient'));
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
              <h1 className="text-3xl font-bold text-gray-900">{t('patients')}</h1>
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {showCreateForm ? t('cancel') : t('addPatient')}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Create/Edit Patient Form */}
        {(showCreateForm || editingPatient) && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingPatient ? t('editPatient') : t('createNewPatient')}
            </h2>
            <form onSubmit={editingPatient ? handleEditPatient : handleCreatePatient} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  {t('patientName')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-black mb-1">
                  {t('dateOfBirth')}
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  {editingPatient ? t('updatePatient') : t('create')}
                </button>
                <button
                  type="button"
                  onClick={editingPatient ? cancelEdit : () => setShowCreateForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t('patients')}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <div key={patient.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                                      <p className="text-sm text-black">
                      {t('dateOfBirth')}: {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                    {patient.assignments && patient.assignments.length > 0 && (
                      <p className="text-sm text-blue-600">
                        {patient.assignments.length} {t('medicationAssignments')}
                      </p>
                    )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/patients/${patient.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {t('viewDetails')}
                  </Link>
                  <button
                    onClick={() => startEditPatient(patient)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    {t('edit')}
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ))}
            {patients.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-black">{t('noPatientsFound')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 