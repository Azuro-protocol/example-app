import React, { Fragment, memo } from 'react'
import cx from 'classnames'


type SelectionNameProps = {
  className?: string
  selectionName: string
}

const pointRegex = /\s*(\(-?\d+(?:\.\d+)?\)|-?\d+(?:\.\d+)?)\s*$/
const scoreRegex = /\s*(\d+-\d+)\s*$/

const SelectionName: React.FC<SelectionNameProps> = memo((props) => {
  const { className, selectionName } = props

  const pointMatch = !scoreRegex.test(selectionName) && selectionName.match(pointRegex)
  const point = pointMatch?.[1]
  const baseName = pointMatch ? selectionName.slice(0, pointMatch.index).trimEnd() : selectionName
  const selectionParts = baseName.replace(/([/&])/g, '|$1|').split('|')

  return (
    <div className={cx(className, 'flex w-full items-baseline justify-start overflow-hidden text-left')}>
      <span className="inline-flex shrink grow-0 justify-start truncate">
        {
          selectionParts.map((part, index) => {
            const isSeparator = part === '/' || part === '&'

            return (
              <Fragment key={part + index}>
                {isSeparator && <>&nbsp;</>}
                <span className={cx('shrink grow-0 basis-auto', !isSeparator && 'truncate')}>
                  {part}
                </span>
                {isSeparator && <>&nbsp;</>}
              </Fragment>
            )
          })
        }
      </span>
      {Boolean(point) && <span className="flex-none">&nbsp;{point}</span>}
    </div>
  )
})

SelectionName.displayName = 'SelectionName'

export default SelectionName
