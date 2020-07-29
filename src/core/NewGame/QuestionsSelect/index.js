import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export const QuestionsSelect = ({ id, questions, label, onChange, value }) => {
  return (
    <>
      <InputLabel id={id}>{label}</InputLabel>
      <Select labelId={id} value={value} onChange={onChange}>
        {questions.map(question => (
          <MenuItem key={`question_${question.id}`} value={question.id}>
            {question.body}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

QuestionsSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.number
}
