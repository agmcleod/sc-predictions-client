import React from 'react'
import PropTypes from 'prop-types'

export default function QuestionsSelect({ id, questions, onChange, value }) {
  return (
    <select id={id} value={value} onChange={onChange}>
      <option value=''>Select Question</option>
      {questions.map(question => (
        <option key={`question_${question.id}`} value={question.id}>
          {question.body}
        </option>
      ))}
    </select>
  )
}

QuestionsSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.number
}
