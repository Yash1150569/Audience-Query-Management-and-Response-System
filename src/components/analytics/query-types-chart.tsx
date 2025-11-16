'use client';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import type { Query } from "@/lib/types";

type QueryTypesChartProps = {
  queries: Query[];
};

const chartConfig = {
  question: { label: "Questions", color: "hsl(var(--chart-1))" },
  request: { label: "Requests", color: "hsl(var(--chart-2))" },
  complaint: { label: "Complaints", color: "hsl(var(--destructive))" },
  unclassified: { label: "Unclassified", color: "hsl(var(--muted))" },
};

export function QueryTypesChart({ queries }: QueryTypesChartProps) {
  const data = Object.keys(chartConfig).map(key => ({
    name: key,
    value: queries.filter(q => q.category === key).length,
    fill: chartConfig[key as keyof typeof chartConfig].color,
  })).filter(item => item.value > 0);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-square">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} strokeWidth={2}>
            {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill}/>
            ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  );
}
