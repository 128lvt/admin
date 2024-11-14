import useSWR, { mutate } from 'swr'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'

interface ApiResponse {
  message: string
  data: Product[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useProduct = () => {
  const { data, error } = useSWR<ApiResponse>(`${API_URL}/products`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Kiểm tra trạng thái đang tải
  const isLoading = !data && !error

  return { data, error, isLoading, mutate: () => mutate(`${API_URL}/products`) }
}

export default useProduct
