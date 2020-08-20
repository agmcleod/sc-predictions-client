import React, { FC } from 'react'

import { Question } from 'common/store/types/question'
import { Select, ChangeEvent } from 'common/components/Select'

interface QuestionsSelectProps {
  id: string
  questions: Question[]
  label: string
  onChange: (e: ChangeEvent) => void
  value?: number
}

export const QuestionsSelect: FC<QuestionsSelectProps> = ({
  id,
  questions,
  label,
  onChange,
  value,
}) => {
  return (
    <Select
      label={label}
      id={id}
      options={questions.map((q) => ({ label: q.body, value: q.id }))}
      onChange={onChange}
      value={value}
    />
  )
}
