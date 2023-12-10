import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/server'
import { Status } from '@prisma/client'
import React, { Suspense } from 'react'
import Loading from './Loading'

type props = {
    status: Status
}

const ProgressCard = async ({ status }: props) => {
    const count = await api.issue.countIssueStatus.query({
        status: status
    })

    const getStatus = (status: Status) => {
        switch (status) {
            case Status.OPEN:
                return 'Open'
            case Status.IN_PROGRESS:
                return 'In Progress'
            case Status.CLOSED:
                return 'Closed'
            default:
                return 'Unknown'
        }
    }


    return (
        <Card className={cn('w-full max-w-md')}>
            <CardHeader>
                <CardTitle>
                    <Suspense fallback={<Loading />}>
                        <span>
                            {getStatus(status)} Issue(s)
                        </span>
                    </Suspense>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <span className='text-lg font-semibold'>
                    {count}
                </span>
            </CardContent>
        </Card>
    )
}

export default ProgressCard