'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ImageDialog from '@/components/image-dialog'
import ProductDialog from '@/components/product-dialog'
import { Product } from 'types/Type'
import { useRouter } from 'next/navigation'

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
    setSelectedRow(row) // Set row được chọn
  }

  const closeDialog = () => {
    setSelectedRow(null) // Đóng dialog khi cần
  }

  return (
    <div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="cursor-default">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() => handleRowDoubleClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = cell.getValue()
                    const columnId = cell.column.id

                    // Kiểm tra nếu columnId là 'images' hoặc 'variants'
                    if (columnId === 'images') {
                      const items = Array.isArray(cellValue) ? cellValue : []

                      return (
                        <TableCell key={cell.id}>
                          <div className="text-center">
                            <ImageDialog
                              images={items}
                              productId={row.original.id}
                            />
                          </div>
                        </TableCell>
                      )
                    } else {
                      if (columnId === 'variants') {
                        const items = Array.isArray(cellValue) ? cellValue : []
                        const productId = row.original.id
                        return (
                          <TableCell key={cell.id}>
                            <div className="text-center">
                              <Button
                                onClick={() => {
                                  router.push(
                                    `/san-pham/size-color/${productId}`,
                                  )
                                }}
                              >
                                {items.length}
                              </Button>
                            </div>
                          </TableCell>
                        )
                      }
                    }

                    // Nếu không phải 'images' hoặc 'variants', hiển thị giá trị bình thường
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <ProductDialog
          product={selectedRow as unknown as Product}
          isOpen={!!selectedRow}
          onClose={closeDialog}
        />
      </div>
    </div>
  )
}
