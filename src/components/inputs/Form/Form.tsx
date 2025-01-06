'use client'

import React, { useCallback } from 'react'


export type FormProps = React.AllHTMLAttributes<HTMLFormElement> & {
  loading?: boolean
  disabled?: boolean
}

// Little helper to handle loading and disable states for form;
// action shouldn't be empty for correct keyboard switches on iOS
const Form: React.CFC<FormProps> = (props) => {
  const { children, action = '.', loading, disabled, onSubmit, ...rest } = props

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    if (loading || disabled) {
      return
    }

    if (typeof onSubmit === 'function') {
      onSubmit(event)
    }
  }, [ loading, disabled, onSubmit ])

  return (
    <form
      {...rest}
      action={action}
      aria-disabled={disabled}
      aria-busy={loading}
      noValidate
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}


export default Form
