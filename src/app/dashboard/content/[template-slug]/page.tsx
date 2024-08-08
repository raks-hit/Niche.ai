'use client'
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { AIOutput } from '@/utils/schema'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
interface PROPS{
    params:{
        'template-slug':string
    }
}
function CreateNewContent(props:PROPS) {
  const [loading,setLoading]=useState(false);
  const [aiOutput,setAiOutput]=useState<string>('');
  const {user}=useUser();
  const generateAIContent=async(formData:any)=>{
    setLoading(true);
    const selectedPrompt=selectedTemplate?.aiPrompt;
    const FinalPrompt=JSON.stringify(formData)+ "," +selectedPrompt;
    const result= await chatSession.sendMessage(FinalPrompt);
    console.log()
   setAiOutput(result?.response.text());
   await SaveInDb(formData,selectedTemplate?.slug,result?.response.text())
    setLoading(false);
  }
  const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
    const result=await db.insert(AIOutput).values({
      formData:formData,
      templateSlug:slug,
      aiResponse:aiResp,
      createdBy:user?.primaryEmailAddress?.emailAddress|| '',
      createdAt:moment().format('DD/MM/yyyy'),
    })
    console.log(result);
  }
    const selectedTemplate:TEMPLATE|undefined=Templates.find((item)=>item.slug==props.params['template-slug'])
  return (
    <div className='p-5'>
      <Link href={'/dashboard'}>
      <Button><ArrowLeft/>Back</Button>
      </Link>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
    <FormSection loading={loading} selectedTemplate={selectedTemplate} userFormInput={(v:any)=>generateAIContent(v)}/>
    <div className='col-span-2'>
    <OutputSection aiOutput={aiOutput}/>
    </div>
    </div>
    </div>
  )
}

export default CreateNewContent