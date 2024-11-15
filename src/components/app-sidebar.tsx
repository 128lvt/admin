import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import Link from 'next/link'
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  ShoppingCart,
} from 'lucide-react'

export function AppSidebar() {
  return (
    <Sidebar className="h-full bg-gray-900 text-black">
      <SidebarContent className="px-6 py-8">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/" className="mb-6 text-2xl font-bold text-black">
              Quản lý
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-md font-medium">
                      <Package className="mr-2 h-5 w-5" />
                      Sản phẩm
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link href="/san-pham/them-san-pham">Thêm</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/san-pham/danh-sach">Danh sách</Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuButton className="text-md font-medium">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                <Link href={'/thong-ke'}>Thống kê</Link>
              </SidebarMenuButton>
              <SidebarMenuButton className="text-md font-medium">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <Link href={'/quan-li-don-hang'}>Quản lí đơn hàng</Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton className="text-md font-medium">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </SidebarMenuButton>
              <SidebarMenuButton className="text-md font-medium">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
