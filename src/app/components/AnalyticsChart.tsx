import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyticsData } from "../utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Analytics</CardTitle>
        <CardDescription>
          Visitor and pageview trends across all sites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" className="space-y-4">
          <TabsList>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Visits"
                />
                <Line 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Pageviews"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bar" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="hsl(var(--primary))" name="Visits" />
                <Bar dataKey="pageviews" fill="hsl(var(--chart-2))" name="Pageviews" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
