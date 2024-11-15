import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import ImageDialog from '@/components/image-dialog'
import ProductDialog from '@/components/product-dialog'
import { Product } from 'types/Type'

interface ProductId {
  id: number
}

interface DataTableProps<TData extends ProductId, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends ProductId, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [selectedRow, setSelectedRow] = useState<TData | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  const handleRowDoubleClick = (row: TData) => {
    setSelectedRow(row)
  }

  const closeDialog = () => {
    setSelectedRow(null)
  }

  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-100 font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() => handleRowDoubleClick(row.original)}
                  className="cursor-default transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = cell.getValue()
                    const columnId = cell.column.id

                    if (columnId === 'images') {
                      const items = Array.isArray(cellValue) ? cellValue : []
                      return (
                        <TableCell key={cell.id} className="p-4 text-center">
                          <ImageDialog
                            images={items}
                            productId={row.original.id}
                          />
                        </TableCell>
                      )
                    } else if (columnId === 'variants') {
                      const items = Array.isArray(cellValue) ? cellValue : []
                      const productId = row.original.id
                      return (
                        <TableCell key={cell.id} className="p-4 text-center">
                          <Button
                            onClick={() => {
                              router.push(`/san-pham/size-color/${productId}`)
                            }}
                            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                          >
                            {items.length}
                          </Button>
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell key={cell.id} className="p-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 bg-gray-50 px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <ProductDialog
        product={selectedRow as unknown as Product}
        isOpen={!!selectedRow}
        onClose={closeDialog}
      />
    </div>
  )
}
