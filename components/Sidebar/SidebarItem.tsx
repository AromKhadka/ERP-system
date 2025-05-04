'use client'

import { useState } from 'react'
import Link from 'next/link'

export type SidebarItemType = {
  title: string
  path?: string
  icon?: JSX.Element
  children?: SidebarItemType[] // Optional children that can be nested items
}

interface SidebarItemProps {
  item: SidebarItemType
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const [open, setOpen] = useState(false)

  // Determine if there are children to handle nested items
  const hasChildren = Array.isArray(item.children) && item.children.length > 0

  const toggleOpen = () => setOpen(!open)

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-between px-2 py-1 hover:bg-gray-700 rounded text-white"
        >
          <span className="flex items-center gap-2">
            {item.icon && <span>{item.icon}</span>}
            {item.title}
          </span>
          <span>{open ? '▾' : '▸'}</span> {/* Arrow for expand/collapse */}
        </button>
      ) : (
        <Link
          href={item.path || '#'}
          className="block px-2 py-1 hover:bg-gray-700 rounded text-white flex items-center gap-2"
        >
          {item.icon && <span>{item.icon}</span>}
          {item.title}
        </Link>
      )}

      {/* Render children if there are any and it's open */}
      {hasChildren && open && (
        <ul className="pl-4 mt-1 space-y-1">
          {item.children!.map((child, idx) => (
            <li key={idx}>
              <SidebarItem item={child} /> {/* Recursively render child items */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
