'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Patient, Assignment } from './types';
import { patientApi, assignmentApi } from './api';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export default function Home() {
  const { t } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsData, assignmentsData] = await Promise.all([
          patientApi.getAll(),
          assignmentApi.getWithRemainingDays(),
        ]);
        setPatients(patientsData);
        setAssignments(assignmentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('failedToFetchData'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('dashboardTitle')}
            </h1>
            <LanguageSwitcher />
          </div>
          <div className="flex space-x-4">
            <Link
              href="/patients"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('managePatients')}
            </Link>
            <Link
              href="/medications"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {t('manageMedications')}
            </Link>
            <Link
              href="/assignments"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              {t('manageAssignments')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patients Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('patientsOverview')}
            </h2>
            <div className="space-y-3">
              {patients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-black">
                      DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/patients/${patient.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              ))}
              {patients.length === 0 && (
                <p className="text-black text-center py-4">
                  {t('noPatientsFound')}
                </p>
              )}
            </div>
            <div className="mt-4">
              <Link
                href="/patients"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {t('viewAllPatients')}
              </Link>
            </div>
          </div>

          {/* Active Treatments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('activeTreatments')}
            </h2>
            <div className="space-y-3">
              {assignments
                .filter((assignment) => assignment.remainingDays && assignment.remainingDays > 0)
                .slice(0, 5)
                .map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {assignment.patient?.name} - {assignment.medication?.name}
                      </h3>
                      <p className="text-sm text-black">
                        {assignment.medication?.dosage} • {assignment.medication?.frequency}
                      </p>
                    </div>
                    <div className="text-right">
                                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          assignment.remainingDays! <= 3 
                            ? 'bg-red-100 text-red-800' 
                            : assignment.remainingDays! <= 7 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {assignment.remainingDays} {t('daysLeft')}
                        </span>
                    </div>
                  </div>
                ))}
              {assignments.filter(a => a.remainingDays && a.remainingDays > 0).length === 0 && (
                <p className="text-black text-center py-4">
                  {t('noActiveTreatments')}
                </p>
              )}
            </div>
            <div className="mt-4">
              <Link
                href="/assignments"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {t('viewAllAssignments')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
