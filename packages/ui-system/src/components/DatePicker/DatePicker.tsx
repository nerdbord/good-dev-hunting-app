"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-reac"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import styles from './date-picker-demo.module.css'

interface DatePickerDemoProps {
  selectableDates?: Date[];
}

export function DatePickerDemo({ selectableDates = [] }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`${styles.button} ${!date ? styles.buttonWithoutDate : ''}`}
        >
          <CalendarIcon className={styles.icon} />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.popoverContent} align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => 
            !selectableDates.some(selectableDate => 
              selectableDate && selectableDate.toDateString() === date.toDateString()
            )
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

