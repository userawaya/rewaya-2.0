
export const createUsersByRoleData = (analytics: any) => ({
  generator: analytics?.usersByRole?.generator ?? 10,
  controller: analytics?.usersByRole?.controller ?? 5,
  driver: analytics?.usersByRole?.driver ?? 3,
  recycler: analytics?.usersByRole?.recycler ?? 2,
  admin: analytics?.usersByRole?.admin ?? 1,
});

export const createSystemMonitoringData = (analytics: any) => ({
  activeCenters: analytics?.activeCenters ?? 2,
  totalCenters: analytics?.totalCenters ?? 6,
  pendingAssessments: analytics?.pendingAssessments ?? 4,
  completedAssessments: analytics?.completedAssessments ?? 12,
  topPerformers: analytics?.topPerformers || [
    {
      id: "1",
      name: "John Doe",
      credits: 450,
      submissions: 25,
    },
    {
      id: "2",
      name: "Jane Smith",
      credits: 300,
      submissions: 18,
    },
    {
      id: "3",
      name: "Mike Johnson",
      credits: 220,
      submissions: 14,
    },
  ],
  todaySubmissions: analytics?.todaySubmissions ?? 18,
  weeklySubmissions: analytics?.weeklySubmissions ?? 102,
});
