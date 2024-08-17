'use client'
import React from 'react'
import SearchSection from './_components/SearchSection'
import Header from './_components/Header'
import TemplateListSection from './_components/TemplateListSection'
import { useState } from 'react'
function Page() {
  const [userSearchInput,setUserSearchInput]=useState<string>()
  return (
    <div>
  
      <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>
      <TemplateListSection searchInput={userSearchInput}/>
    </div>
  )
}

export default Page