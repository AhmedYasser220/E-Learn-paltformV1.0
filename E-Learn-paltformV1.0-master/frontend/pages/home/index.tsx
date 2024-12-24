import Layout from '@/pages/components/layout';
import { useRouter } from 'next/router';
import { Users, BarChart2, Calendar } from 'lucide-react';

const HomePage = () => {
  const router = useRouter();

  const stats = [
    { icon: Users, label: 'Active Users', value: '1,234' },
    { icon: BarChart2, label: 'Total Posts', value: '45.8k' },
    { icon: Calendar, label: 'Events', value: '12' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
          <p className="text-gray-600 mb-6">
            Here's an overview of your dashboard and recent activities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((Stat, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <Stat.icon className="w-8 h-8 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{Stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{Stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;