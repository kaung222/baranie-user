'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Phone } from 'lucide-react'
import { useUpdateProfile } from '@/api/user/update-profile'

interface PhoneNumberDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function PhoneNumberDialog({ isOpen, onClose }: PhoneNumberDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const { mutate: updateProfile, isPending } = useUpdateProfile()


  const handleSave = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required')
      return
    }
    // Simple validation for Myanmar phone numbers
    const phoneRegex = /^(\+?95|0)?[1-9]\d{9}$/
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid Myanmar phone number')
      return
    }
    updateProfile({ phone: phoneNumber }, {
      onSuccess(data, variables, context) {
        onClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-[#FF66A1]" />
            Add Phone Number
          </DialogTitle>
          <DialogDescription>
            Please add your phone number to complete your booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+95 9xxx xxx xxx"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                setError('')
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending} className="bg-[#FF66A1] hover:bg-[#FF66A1]/90 text-white">
            {isPending ? (
              <>
                <Loader2 className=' animate-spin w-4 h-4 mr-2 ' />
                <span>saving ...</span>
              </>
            ) : "save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

