'use client'

import React from 'react'
import { useField, useFieldState } from 'formular'
import { type ModalComponent } from '@locmod/modal'

import { Input } from 'components/inputs'
import { PlainModal } from 'components/feedback'

import { Icon } from 'components/ui'
import Result from './components/Result/Result'

import messages from './messages'


const SearchModal: ModalComponent = (props) => {
  const { closeModal } = props

  const searchField = useField<string>()
  const { value } = useFieldState(searchField)

  return (
    <PlainModal
      className="mb:pt-4 ds:pt-3 w-full h-full !bg-transparent ds:max-w-[954px]"
      closeModal={closeModal}
      containerClassName="!p-0 h-full"
      contentClassName="h-full flex flex-col pb-0 !py-0"
      withCloseButton={false}
      withAnimation={false}
    >
      <div className="w-full flex items-center mb:px-2 space-x-2">
        <Input
          className="bg-bg-l1 w-full"
          regExp="^[A-Za-z0-9- ]*$"
          leftNode={<Icon className="size-5 mr-2 text-grey-60" name="interface/search" />}
          value={value}
          rightNode={
            Boolean(value) ? (
              <button className="text-grey-60 hover:text-grey-90" onClick={() => searchField.set('')}>
                <Icon className="size-5" name="interface/clear" />
              </button>
            ) : undefined
          }
          placeholder={messages.placeholder}
          autoFocus
          onChange={(value) => searchField.set(value)}
        />
        <button
          className="p-2 border border-grey-10 rounded-full text-grey-60 hover:text-grey-90 transition"
          onClick={() => closeModal()}
        >
          <Icon className="size-4" name="interface/close" />
        </button>
      </div>
      <div className="mt-3 ds:mt-4 pb-8 flex-1 overflow-y-auto no-scrollbar">
        <Result field={searchField} />
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ SearchModal: typeof SearchModal }> {}
}

export default SearchModal
