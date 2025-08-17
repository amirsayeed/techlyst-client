import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Loading from '../../../components/Shared/Loading/Loading';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/statistics');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center mt-10 text-red-600">Error loading statistics.</p>;

  const pieData = [
    ...data.productsStatusCount.map(p => ({
      name: p.status.charAt(0).toUpperCase() + p.status.slice(1),
      value: p.count,
      color:
        p.status === 'accepted'
          ? '#82ca9d'
          : p.status === 'pending'
          ? '#ffc658'
          : '#8884d8',
    })),
    { name: 'Reviews', value: data.reviewsCount, color: '#ff8042' },
    { name: 'Users', value: data.usersCount, color: '#8dd1e1' },
  ];

  return (
    <div>
      <title>TechLyst | Statisitics</title>
      <div className="my-10 bg-base-100 rounded-lg overflow-x-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Statistics
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={window.innerWidth < 768 ? 100 : 140}
              fill="#8884d8"
              label={({ percent }) =>
                    `${(percent * 100).toFixed(1)}%`
                }
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 50 }}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
              itemStyle={{ fontSize: '14px' }}
              labelStyle={{ fontWeight: 'bold' }}
              formatter={(value) => [value, 'Count']}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default Statistics;
