import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Link } from 'react-router';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const StatCard = ({ title, value, subtitle }) => (
  <div className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
    <div className="text-sm text-base-content/60">{subtitle}</div>
    <div className="text-3xl font-bold text-primary mt-1">{value}</div>
    <div className="text-base font-medium mt-1">{title}</div>
  </div>
);

export default function Overview() {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ['overviewStats', isAdmin],
    queryFn: async () => {
      const endpoint = isAdmin ? '/admin-stats' : '/user-stats';
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-6 bg-base-100 border border-base-200 animate-pulse h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="alert alert-error">
          <span>Failed to load overview: {error.message}</span>
        </div>
      </div>
    );
  }

  // Admin data (unchanged)
  const totalRooms = isAdmin ? (stats?.totalRooms ?? 0) : 0;
  const availablePct = isAdmin ? Number(stats?.availablePercentage ?? 0) : 0;
  const unavailablePct = isAdmin ? Number(stats?.unavailablePercentage ?? 0) : 0;
  const totalUsers = isAdmin ? (stats?.totalUsers ?? 0) : 0;
  const totalMembers = isAdmin ? (stats?.totalMembers ?? 0) : 0;

  // Member data
  const myAgreements = !isAdmin ? (stats?.myAgreements ?? 0) : 0;
  const myPayments = !isAdmin ? (stats?.myPayments ?? 0) : 0;
  const myAnnouncements = !isAdmin ? (stats?.announcements ?? 0) : 0;

  // Charts
  const availabilityData = {
    labels: ['Available', 'Unavailable'],
    datasets: [
      {
        data: [availablePct, unavailablePct],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const memberDonutData = {
    labels: ['Agreements', 'Payments', 'Announcements'],
    datasets: [
      {
        data: [myAgreements, myPayments, myAnnouncements],
        backgroundColor: ['#3b82f6', '#22c55e', '#a855f7'],
        borderWidth: 0,
      },
    ],
  };

  const usersData = {
    labels: ['Users', 'Members'],
    datasets: [
      {
        label: 'Count',
        data: [totalUsers, totalMembers],
        backgroundColor: ['#3b82f6', '#a855f7'],
        borderRadius: 8,
      },
    ],
  };

  const memberBarData = {
    labels: ['Agreements', 'Payments', 'Announcements'],
    datasets: [
      {
        label: 'My Activity',
        data: [myAgreements, myPayments, myAnnouncements],
        backgroundColor: ['#3b82f6', '#22c55e', '#a855f7'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {isAdmin ? 'Overview' : 'Your Overview'}
          </h1>
          <p className="text-base-content/70 mt-1">
            {isAdmin ? 'Building snapshot with key metrics and charts.' : 'Your activity, requests, and updates at a glance.'}
          </p>
        </div>
        {!isAdmin && (
          <div className="flex gap-2">
            <Link to="/dashboard/make-payment" className="btn btn-secondary btn-sm">Make Payment</Link>
            <Link to="/dashboard/announcements" className="btn btn-ghost btn-sm">View Announcements</Link>
          </div>
        )}
      </div>

      {/* Stat cards */}
      {isAdmin ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <StatCard title="Total Rooms" value={totalRooms} subtitle="Inventory" />
          <StatCard title="Available %" value={`${availablePct}%`} subtitle="Vacancy" />
          <StatCard title="Unavailable %" value={`${unavailablePct}%`} subtitle="Occupied" />
          <StatCard title="Total Users" value={totalUsers} subtitle="All Accounts" />
          <StatCard title="Members" value={totalMembers} subtitle="Active Residents" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard title="My Agreements" value={myAgreements} subtitle="Requests & active" />
          <StatCard title="Payments Made" value={myPayments} subtitle="Total payments" />
          <StatCard title="Announcements" value={myAnnouncements} subtitle="Unread/total" />
          <div className="rounded-2xl p-6 bg-gradient-to-r from-primary to-secondary text-white shadow-sm">
            <div className="text-sm/relaxed opacity-90">Quick tip</div>
            <div className="text-xl font-semibold mt-1">Keep your profile updated</div>
            <Link to="/dashboard/my-profile" className="btn btn-ghost btn-xs mt-3 bg-white/10 text-white">Go to Profile</Link>
          </div>
        </div>
      )}

      {/* Charts */}
      {isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-4 md:p-6 bg-base-100 border border-base-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Availability</h2>
            </div>
            <Doughnut data={availabilityData} />
          </div>

          <div className="rounded-2xl p-4 md:p-6 bg-base-100 border border-base-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Users vs Members</h2>
            </div>
            <Bar
              data={usersData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e5e7eb' }, ticks: { stepSize: 1 } },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-4 md:p-6 bg-base-100 border border-base-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Activity Breakdown</h2>
            </div>
            <Doughnut data={memberDonutData} />
          </div>

          <div className="rounded-2xl p-4 md:p-6 bg-base-100 border border-base-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Activity</h2>
            </div>
            <Bar
              data={memberBarData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e5e7eb' }, ticks: { stepSize: 1 } },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}