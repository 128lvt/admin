// MonthlySalesChart.tsx
import { useState } from 'react'
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MonthlyData {
  january: number
  february: number
  march: number
  april: number
  may: number
  june: number
  july: number
  august: number
  september: number
  october: number
  november: number
  december: number
}

interface ChartDataPoint {
  month: string
  sales: number
}

interface MonthlySalesChartProps {
  data?: MonthlyData[]
}

const defaultData: MonthlyData = {
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data = [] }) => {
  const [selectedYear, setSelectedYear] = useState<string>('2024')

  // Transform the flat data object into an array format that Recharts expects
  const transformedData: ChartDataPoint[] = Object.entries(
    data[0] || defaultData,
  ).map(([month, sales]) => ({
    month: month.charAt(0).toUpperCase() + month.slice(1),
    sales,
  }))

  // Calculate percentage change from previous month
  const currentMonth =
    transformedData[transformedData.length - 1 - 1]?.sales ?? 0
  console.log('currentMonth', currentMonth)
  const previousMonth = transformedData[transformedData.length - 3]?.sales ?? 0
  console.log('previousMonth', previousMonth)
  const percentageChange: number =
    previousMonth !== 0
      ? ((currentMonth - previousMonth) / previousMonth) * 100
      : 100
  const isIncreasing: boolean = currentMonth >= previousMonth

  // Calculate total products
  const totalProducts: number = transformedData.reduce(
    (sum, item) => sum + item.sales,
    0,
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Thống kê bán hàng theo tháng trong năm
          </CardTitle>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-lg">
          Dữ liệu năm{' '}
          <span className="font-semibold text-primary">{selectedYear}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-gray-600">
                        Sales: {payload[0].value}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="sales"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            >
              <LabelList dataKey="sales" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            {isIncreasing ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span className={isIncreasing ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
            <span className="text-muted-foreground">so với tháng trước</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {totalProducts.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Tổng sản phẩm đã bán
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MonthlySalesChart
