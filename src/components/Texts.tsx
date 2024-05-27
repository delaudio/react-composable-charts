import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  NativeEventHandlers,
  DataValue,
  DefaultedIteratee,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { combineGetters, createDataScale } from '../lib/scales'
import { Elements } from './Elements'

export interface TextsProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'data-x'?: DataAccessor<T>
  'data-y'?: DataAccessor<T>
  text?: DefaultedIteratee<T, DataValue>
}

export function Texts<T>({
  'data-x': dataX,
  'data-y': dataY,
  ...props
}: TextsProps<T>) {
  const { xScale, yScale } = useCartesianContext()

  const x = createDataScale(dataX, xScale, 0, 'center')
  const y = createDataScale(dataY, yScale, 0, 'center')

  return (
    <Elements
      {...props}
      tag="text"
      x={combineGetters([x, props.x])}
      y={combineGetters([y, props.y])}
    />
  )
}
