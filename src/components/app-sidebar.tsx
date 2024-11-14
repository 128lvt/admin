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

export function AppSidebar() {
  return (
    <Sidebar className="h-full w-64 bg-gray-800">
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="mb-5 text-2xl font-semibold text-slate-950">
              Quản lý
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-md font-semibold">
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
              <SidebarMenuButton className="text-md font-semibold">
                <Link href={'/thong-ke'}>Thống kê</Link>
              </SidebarMenuButton>
              <SidebarMenuButton className="text-md font-semibold">
                <Link href={'/quan-li-don-hang'}>Quản lí đơn hàng</Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
