import React, { FC } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'

export interface Option {
  value: string | number
  label: string
}

export type ChangeEvent = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

interface SelectProps {
  id: string
  label: string
  options: Option[]
  onChange: (e: ChangeEvent) => void
  value?: number | string | object
}

export const Select: FC<SelectProps> = ({
  id,
  options,
  label,
  onChange,
  value,
}) => {
  return (
    <>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect labelId={id} value={value} onChange={onChange}>
        {options.map((option, i) => (
          <MenuItem key={`${i}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </>
  )
}
