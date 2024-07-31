'use client'

import React from 'react'
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic'
import { ModalsRenderer, registerModals } from '@locmod/modal'

import { Overlay } from 'components/layout'
import { Icon } from 'components/ui'
// import InfoModal from 'compositions/app/modals/InfoModal/InfoModal'
// import ErrorModal from 'compositions/app/modals/ErrorModal/ErrorModal'


export const ModalSkeleton = (loadingProps?: DynamicOptionsLoadingProps) => {
  const { isLoading = true } = loadingProps || {}

  return isLoading ? (
    <Overlay>
      <div className="m-auto -wd:mb-0 z-[99] h-56 w-full wd:max-w-[22.25rem]">
        <div className="size-full -wd:rounded-t-8 wd:rounded-8 bg-gray-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-16 h-16" name="interface/spinner" />
        </div>
      </div>
    </Overlay>
  ) : null
}

const loading = ModalSkeleton

const registry = {
  ConnectModal: dynamic(() => import('compositions/modals/ConnectModal/ConnectModal'), { loading }),
  // ErrorModal,
  // InfoModal,
}

registerModals(registry)

const GlobalModalsRegistrar: React.FC = () => (
  <ModalsRenderer />
)

export default GlobalModalsRegistrar
