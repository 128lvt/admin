import { OutOfStock } from '@/components/out-of-stock'
import { SellingChartCategory } from '@/components/selling-chart-category'
import { SellingChartMonthly } from '@/components/selling-chart-monthly'

export default function page() {
  return (
    <div className="flex w-full">
      <SellingChartMonthly />
      <SellingChartCategory />
      <OutOfStock />
    </div>
  )
}
