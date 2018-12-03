import { shallow } from 'enzyme'
import React from 'react'
import QuestionsSelect from './index'

describe('QuestionsSelect', () => {
  let wrapper
  const onChange = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <QuestionsSelect
        id='question_1'
        onChange={onChange}
        questions={[{ id: 1, body: 'Hello' }]}
        value={1}
      />
    )
  })

  afterEach(() => {
    onChange.mockReset()
  })

  test('calls onChange callback', () => {
    wrapper.find('select').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })

  test('contains the question in an option', () => {
    expect(wrapper.find('option')).toHaveLength(2)
    expect(
      wrapper
        .find('option')
        .at(1)
        .text()
    ).toEqual('Hello')
  })
})
