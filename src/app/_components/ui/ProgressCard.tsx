import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/server'
import { Status } from '@prisma/client'
import React, { Suspense } from 'react'

type props = {
    status: Status
}

const ProgressCard = ({ status }: props) => {
    const count = api.issue.countIssueStatus.query({
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
                    <Suspense fallback={<div>Loading...</div>}>
                        {getStatus(status)} Issue(s)
                    </Suspense>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {count}
            </CardContent>
        </Card>
    )
}

export default ProgressCard