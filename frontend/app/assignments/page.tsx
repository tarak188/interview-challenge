'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Assignment, CreateAssignmentDto, Patient, Medication } from '../types';
import { assignmentApi, patientApi, medicationApi } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function AssignmentsPage() {
  const { t } = useLanguage();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState<CreateAssignmentDto>({
    patientId: 0,
    medicationId: 0,
    startDate: '',
    numberOfDays: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assignmentsData, patientsData, medicationsData] = await Promise.all([
        assignmentApi.getWithRemainingDays(),
        patientApi.getAll(),
        medicationApi.getAll(),
      ]);
      setAssignments(assignmentsData);
      setPatients(patientsData);
      setMedications(medicationsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToFetchData'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignmentApi.create(formData);
      setFormData({ patientId: 0, medicationId: 0, startDate: '', numberOfDays: 0 });
      setShowCreateForm(false);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToCreateAssignment'));
    }
  };

  const handleEditAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssignment) return;
    
    try {
      await assignmentApi.update(editingAssignment.id, formData);
      setFormData({ patientId: 0, medicationId: 0, startDate: '', numberOfDays: 0 });
      setEditingAssignment(null);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToUpdateAssignment'));
    }
  };

  const startEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      patientId: assignment.patientId,
      medicationId: assignment.medicationId,
      startDate: assignment.startDate,
      numberOfDays: assignment.numberOfDays,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingAssignment(null);
    setFormData({ patientId: 0, medicationId: 0, startDate: '', numberOfDays: 0 });
  };

  const handleDeleteAssignment = async (id: number) => {
    if (!confirm(t('confirmDeleteAssignment'))) return;
    
    try {
      await assignmentApi.delete(id);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToDeleteAssignment'));
    }
  };

  const getRemainingDaysColor = (remainingDays: number) => {
    if (remainingDays <= 3) return 'bg-red-100 text-red-800';
    if (remainingDays <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
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
              <h1 className="text-3xl font-bold text-gray-900">{t('medicationAssignments')}</h1>
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
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                {showCreateForm ? t('cancel') : t('assignMedication')}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Create/Edit Assignment Form */}
        {(showCreateForm || editingAssignment) && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingAssignment ? t('editAssignment') : t('assignMedicationToPatient')}
            </h2>
            <form onSubmit={editingAssignment ? handleEditAssignment : handleCreateAssignment} className="space-y-4">
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-black mb-1">
                  {t('patient')}
                </label>
                <select
                  id="patientId"
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
                >
                  <option value={0}>{t('selectPatient')}</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="medicationId" className="block text-sm font-medium text-black mb-1">
                  {t('medication')}
                </label>
                <select
                  id="medicationId"
                  required
                  value={formData.medicationId}
                  onChange={(e) => setFormData({ ...formData, medicationId: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
                >
                  <option value={0}>{t('selectMedication')}</option>
                  {medications.map((medication) => (
                    <option key={medication.id} value={medication.id}>
                      {medication.name} - {medication.dosage}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-black mb-1">
                  {t('startDate')}
                </label>
                <input
                  type="date"
                  id="startDate"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
                />
              </div>
              <div>
                <label htmlFor="numberOfDays" className="block text-sm font-medium text-black mb-1">
                  {t('numberOfDays')}
                </label>
                <input
                  type="number"
                  id="numberOfDays"
                  required
                  min="1"
                  value={formData.numberOfDays}
                  onChange={(e) => setFormData({ ...formData, numberOfDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  {editingAssignment ? t('updateAssignment') : t('create')}
                </button>
                <button
                  type="button"
                  onClick={editingAssignment ? cancelEdit : () => setShowCreateForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Assignments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t('assignments')}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {assignment.patient?.name} - {assignment.medication?.name}
                      </h3>
                      {assignment.remainingDays !== undefined && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRemainingDaysColor(assignment.remainingDays)}`}>
                          {assignment.remainingDays} {t('daysLeft')}
                        </span>
                      )}
                    </div>
                                          <p className="text-sm text-black mt-1">
                        {t('dosage')}: {assignment.medication?.dosage} • {t('frequency')}: {assignment.medication?.frequency}
                      </p>
                      <p className="text-sm text-black">
                        {t('startDate')}: {new Date(assignment.startDate).toLocaleDateString()} • {t('duration')}: {assignment.numberOfDays} {t('days')}
                      </p>
                  </div>
                  <div className="flex space-x-2">
                                      <button
                    onClick={() => startEditAssignment(assignment)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    {t('edit')}
                  </button>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {t('delete')}
                  </button>
                  </div>
                </div>
              </div>
            ))}
            {assignments.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-black">{t('noAssignmentsFound')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 