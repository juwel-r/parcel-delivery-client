import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardOverviewQuery } from "@/redux/features/parcel/parcelApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";


const COLORS = ["#16a34a", "#3b82f6", "#facc15", "#ef4444"];

export default function DashboardOverview() {
  const { data, isLoading } = useGetDashboardOverviewQuery();
  console.log({ data });

  if (isLoading)
    return <p className="text-center py-10">Loading dashboard...</p>;

  const { cards, charts } = data || {};

  return (
<>
{
  !isLoading && !data?.cards && !data?.charts ?(<p className="text-center text-muted-foreground text-2xl">No data fount for Dashboard</p>):(

    <div className="grid gap-6 p-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Parcels</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {cards!.totalParcels}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivered</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            {cards!.delivered}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Transit</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-600">
            {cards!.inTransit}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending / Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-600">
            {cards!.pendingOrCancelled}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Monthly Shipments Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Shipments</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts!.monthlyShipments}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts!.statusDistribution as any}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {charts!.statusDistribution.map((_: any, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
</>
  );
}
