import Templates from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}
export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}
function TemplateListSection({searchInput}:any) {
    const [templateList,setTemplateList]=useState(Templates)
    useEffect(()=>{
        console.log(searchInput);
        if(searchInput){
            const filterData=Templates.filter(item=>item.name.toLowerCase().includes(searchInput.toLowerCase()))
            setTemplateList(filterData)

        }
        else{
            setTemplateList(Templates);
        }
        
    },[searchInput])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
        {templateList.map((item:TEMPLATE,index:number)=>(
            <div key={index}>
            <TemplateCard {...item}/>
            </div>
        ))}
    </div>
  )
}

export default TemplateListSection