'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useUser from '@/hooks/use-user'
import { useToast } from '@/hooks/use-toast'
import { API_URL } from '@/configs/apiConfig'

export default function ScanQRPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const token = useUser((state) => state.getToken())
  const { toast } = useToast()

  useEffect(() => {
    if (orderId && token) {
      handleQRCodeScan()
    }
  }, [orderId, token])

  const handleQRCodeScan = async () => {
    try {
      const response = await fetch(
        `${API_URL}/orders/status/${orderId}?status=next`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      const data = await response.json()
      toast({
        title: 'Thành công!',
        description: `Trạng thái đơn hàng đã được cập nhật thành ${data.status}`,
      })
      // Redirect to the orders page after successful update
      window.location.href = '/admin/orders'
    } catch (error) {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Đang xử lý cập nhật trạng thái đơn hàng...</p>
    </div>
  )
}
