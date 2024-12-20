'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const paymentMethods = [
  {
    id: 'cash',
    name: 'Cash',
    icon: DollarSign,
  },
  {
    id: 'kbz',
    name: 'KBZ Pay',
    icon: '/img/kbz.png',
    isImage: true,
  },
]

export function PaymentSelect() {
  const [selectedMethod, setSelectedMethod] = useState<string>('cash')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={cn(
              'cursor-pointer transition-colors',
              selectedMethod === method.id
                ? 'border-primary'
                : 'hover:border-primary/50'
            )}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardContent className="flex items-center gap-3 p-6">
              {method.isImage ? (
                <Image
                  src={method.icon as string}
                  alt={method.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <method.icon className="w-6 h-6" />
              )}
              <span className="font-medium">{method.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-note">Booking note</Label>
        <Textarea
          id="booking-note"
          placeholder="Can't wait for the appointment"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}

