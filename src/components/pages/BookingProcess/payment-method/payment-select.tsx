'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DollarSign, Store } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'


const paymentMethods = [
  {
    id: 'venue',
    name: 'Pay at Venue',
    icon: Store,
  },
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
  const [selectedMethod, setSelectedMethod] = useState<string>('cash');
  const { setQuery, getQuery } = useSetUrlParams();
  const preNote = getQuery('note')
  const [note, setNote] = useState<string>(preNote || '');
  const handleChangeNote = useDebouncedCallback((query: string) => {
    setQuery({ key: 'note', value: note })
  }, 500);


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
          value={note}
          onChange={(e) => {
            setNote(e.target.value)
            handleChangeNote(e.target.value)
          }}
          placeholder="Can't wait for the appointment"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}

