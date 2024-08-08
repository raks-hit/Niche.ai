import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

interface HISTORY{
   
    id:string,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy:string,
    createdAt:string
}
function UsageTrack() {
    const {user}=useUser();
   const [totalUsage,setTotalUsage]=useState<Number>(0)
    useEffect(()=>{
        user&&getData()
    },[user])
    const getData=async()=>{
        {/* @ts-ignore */}
        const result:HISTORY[] =await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))
        getTotalUsage(result)
    }
    const getTotalUsage=(result:HISTORY[])=>{
        let total:number=0;
        result.forEach((element: { aiResponse: string | any[]; })=>{
            total=total+Number(element.aiResponse?.length);
        });
        setTotalUsage(total);
    }
  return (
    <div className='m-5'>
        <div className='bg-primary text-white p-3 rounded-lg '>
            <h2 className='font-medium'>Credits</h2>
            <div className='h-2 bg-slate-400 w-full rounded-full mt-3'>
                
                <div className='h-2 bg-white rounded-full'
                
              style={{
                    
                    width:(totalUsage/10000)*100+"%"
                }}
                ></div>

            </div>
             {/* @ts-ignore */}
            <h2 className='text-sm my-2'>{totalUsage}/10000 credit</h2>

        </div>
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}

export default UsageTrack