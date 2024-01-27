import { useEffect, useState } from 'react'
import { DropdownOption } from '../DropdownFilter/DropdownFilter'
import { DropdownFilterMulti } from './DropdownFilterMulti'

export default async function AsyncDropdownFilterMulti({
  text,
  options,
  onSelect,
  selectedValue,
}: {
  text: string
  options: Promise<DropdownOption[]>
  onSelect: (option: DropdownOption) => void
  selectedValue: DropdownOption[]
}) {
  // const { runAsync } = useAsyncAction()
  const [optionsValue, setOptionsValue] = useState<DropdownOption[]>([])
  useEffect(() => {
    options.then((data) => setOptionsValue(data))
  }, [])
  return (
    <DropdownFilterMulti
      text={text}
      options={optionsValue}
      onSelect={onSelect}
      selectedValue={selectedValue}
    ></DropdownFilterMulti>
  )
}
