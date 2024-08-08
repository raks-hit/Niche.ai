'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, Wallet, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'
function SideNav() {
  
  const MenuList=[
      {
        name:'Home',
        icon:Home,
        path:'/dashboard'
      },
      {
        name:'History',
        icon:FileClock,
        path:'/dashboard/History'
      },
      {
        name:'Billing',
        icon:WalletCards,
        path:'/dashboard/Billing'
      },
      {
        name:'Settings',
        icon:Settings,
        path:'/dashboard/Setting'
      }
    
]
const path=usePathname()
  useEffect(()=>{
    console.log(path);
  },[])
  return (
    <div className='h-screen relative p-5 shadow:sm border bg-white'>
      <div className='flex justify-center'>
      <Image src={'/logo.svg'} alt='logo' width={100} height={100}/>
      </div>
     <div className='mt-8'>
      { MenuList.map((menu,index)=>(
        <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center 
        ${path==menu.path&& `bg-primary text-white`}`}>
          <menu.icon/>
          <h2>{menu.name}</h2>
        </div>
      ))}
     </div>
     <div className='absolute bottom-15 left-0 w-full'>
     <UsageTrack/>
     </div>
    </div>
  )
}

export default SideNav