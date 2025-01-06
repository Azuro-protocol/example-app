import QRCodeUtil from 'qrcode'
import React, { type ReactElement } from 'react'


const generateMatrix = (value: string, errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel) => {
  const arr = Array.prototype.slice.call(QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data, 0)
  const sqrt = Math.sqrt(arr.length)

  return arr.reduce((rows, key, index) => {
    if (index % sqrt === 0) {
      rows.push([ key ])
    }
    else {
      rows[rows.length - 1].push(key)
    }

    return rows
  }, [])
}

type Props = {
  className?: string
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel
  // logoBackground?: string
  // logoUrl?: string | (() => Promise<string>)
  // logoMargin?: number
  // logoSize?: number
  size?: number
  padding?: number
  uri: string
};

export default function QRCode(props: Props) {
  const { className, uri, ecl = 'M', size: sizeProp = 134, padding = 0 } = props
  const size = sizeProp - padding * 2

  const dots: ReactElement[] = []
  const matrix = generateMatrix(uri, ecl)
  const cellSize = size / matrix.length
  const qrList = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]

  qrList.forEach(({ x, y }) => {
    const x1 = (matrix.length - 7) * cellSize * x
    const y1 = (matrix.length - 7) * cellSize * y
    for (let i = 0; i < 3; i++) {
      dots.push(
        <rect
          key={`${i}-${x}-${y}`}
          fill={i % 2 !== 0 ? '#fff' : '#000'}
          height={cellSize * (7 - i * 2)}
          rx={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
          ry={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
          width={cellSize * (7 - i * 2)}
          x={x1 + cellSize * i}
          y={y1 + cellSize * i}
        />
      )
    }
  })

  const clearArenaSize = 0
  const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2
  const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1

  matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
    row.forEach((_: any, j: number) => {
      if (matrix[i][j]) {
        if (
          !(
            (i < 7 && j < 7) ||
            (i > matrix.length - 8 && j < 7) ||
            (i < 7 && j > matrix.length - 8)
          )
        ) {
          if (
            !(
              i > matrixMiddleStart &&
              i < matrixMiddleEnd &&
              j > matrixMiddleStart &&
              j < matrixMiddleEnd
            )
          ) {
            dots.push(
              <circle
                key={`circle-${i}-${j}`}
                cx={i * cellSize + cellSize / 2}
                cy={j * cellSize + cellSize / 2}
                fill="#000"
                r={cellSize / 3} // calculate size of single dots
              />
            )
          }
        }
      }
    })
  })


  return (
    <div className={className}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ all: 'revert', userSelect: 'none' }}
      >
        <title>QR Code</title>
        <rect
          fill="transparent"
          height={size}
          width={size}
        />
        {dots}
      </svg>
    </div>
  )
}
