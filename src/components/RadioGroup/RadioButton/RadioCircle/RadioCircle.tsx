import * as React from 'react';
import classNames from 'classnames'
import { getCircleSize } from '../../utils/getCircleSize'
import { type RadioCircleProps } from './RadioCircle.types'
import './RadioCircle.css'

const outerCircleStrokeWidth = 1

export const RadioCircle = ({ selected, hovered, alert, size, disabled, readOnly }: RadioCircleProps) => {
  const stateClasses = classNames(
    selected && 'RadioCircle-selected',
    disabled && 'RadioCircle-disabled',
    hovered && 'RadioCircle-hovered',
    alert && 'RadioCircle-alert',
    readOnly && 'RadioCircle-readOnly',
  )

  const outerCircleClasses = classNames('RadioCircle-circleOuter', stateClasses)
  const innerCircleClasses = classNames('RadioCircle-circleInner', stateClasses)

  const radioCircleSize = getCircleSize(size)
  const center = radioCircleSize / 2
  const outerCircleRadius = radioCircleSize / 2
  const innerCircleRadius = outerCircleRadius / 2

  return (
    <svg className={'RadioCircle-svg'} height={radioCircleSize} width={radioCircleSize}>
      <circle
        className={outerCircleClasses}
        cy={center}
        cx={center}
        r={outerCircleRadius - outerCircleStrokeWidth}
        strokeWidth={outerCircleStrokeWidth}
        {...(readOnly && { strokeDasharray: '4,2' })}
      />
      {selected && (
        <circle className={innerCircleClasses} cy={center} cx={center} r={innerCircleRadius} strokeWidth={0} stroke="none" />
      )}
    </svg>
  )
}

RadioCircle.displayName = 'RadioCircle'
