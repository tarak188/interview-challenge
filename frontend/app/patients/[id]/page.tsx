'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Patient, Assignment } from '../../types';
import { patientApi, assignmentApi } from '../../api';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export default function PatientDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const patientId = Number(params.id);
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const [patientData, assignmentsData] = await Promise.all([
        patientApi.getById(patientId),
        assignmentApi.getPatientAssignmentsWithRemainingDays(patientId),
      ]);
      setPatient(patientData);
      setAssignments(assignmentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToFetchPatientData'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async () => {
    if (!confirm(t('confirmDeletePatientAssignments'))) return;
    
    try {
      await patientApi.delete(patientId);
      router.push('/patients');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToDeletePatient'));
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{t('error')}: {error}</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('patientNotFound')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                <p className="text-lg text-gray-600">
                  {t('dateOfBirth')}: {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="flex space-x-4">
              <Link
                href="/patients"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                {t('backToPatients')}
              </Link>
              <Link
                href="/assignments"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                {t('assignMedication')}
              </Link>
              <button
                onClick={handleDeletePatient}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                {t('deletePatient')}
              </button>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('patientInformation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">{t('patientName')}</label>
              <p className="text-lg text-black">{patient.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">{t('dateOfBirth')}</label>
              <p className="text-lg text-black">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">{t('age')}</label>
              <p className="text-lg text-black">
                {Math.floor((new Date().getTime() - new Date(patient.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25))} {t('yearsOld')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">{t('totalAssignments')}</label>
              <p className="text-lg text-black">{assignments.length}</p>
            </div>
          </div>
        </div>

        {/* Medication Assignments */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{t('medicationAssignments')}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {assignment.medication?.name}
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
                </div>
              </div>
            ))}
            {assignments.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-black mb-4">{t('noMedicationAssignments')}</p>
                <Link
                  href="/assignments"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  {t('assignMedication')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 