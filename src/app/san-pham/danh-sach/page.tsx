'use client'

import useProduct from '@/hooks/use-product'
import { columns } from './column'
import { DataTable } from './data-table'
import Filter from './filter'
import { Product } from 'types/Type'

export default function DemoPage() {
  const { data: productData, isLoading, error } = useProduct()

  const products: Product[] = productData?.data.products ?? []
  const totalPages = productData?.data.totalPages || 0

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Danh sách sản phẩm</h1>
      <Filter />
      <DataTable columns={columns} data={products} isLoading={isLoading} />
    </div>
  )
}
