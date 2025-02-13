import { BarChart } from '../../../components/charts/BarChart';
import { LineChart } from '../../../components/charts/LineChart';
import { PieChart } from '../../../components/charts/PieChart';

const Analytics = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-500">
          Track your business performance and insights
        </p>
      </div>

      {/* Charts Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="p-6 bg-white rounded-lg shadow">
          <LineChart />
        </div>

        {/* Sales Distribution */}
        <div className="p-6 bg-white rounded-lg shadow">
          <PieChart />
        </div>

        {/* products Performance */}
        <div className="p-6 bg-white rounded-lg shadow md:col-span-2">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
