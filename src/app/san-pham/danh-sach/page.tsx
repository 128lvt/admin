'use client'
import useProduct from '@/hooks/use-product'
import { columns } from './column'
import { DataTable } from './data-table'
import { Product } from 'types/Type'

export default function DemoPage() {
  const { data, isLoading, error } = useProduct()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Không có dữ liệu</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const products: Product[] = data.data
  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={products} />
    </div>
  )
}
