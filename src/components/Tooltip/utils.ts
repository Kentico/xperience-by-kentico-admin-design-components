import { TooltipPlacement } from './Tooltip.types'
import { ArrowIcons } from './ArrowImages'

export const getArrowIcon = (position: string) => {
  switch (position) {
    case TooltipPlacement.Left:
    case TooltipPlacement.LeftEnd:
    case TooltipPlacement.LeftStart:
      return ArrowIcons.PointingElementRight
    case TooltipPlacement.Right:
    case TooltipPlacement.RightEnd:
    case TooltipPlacement.RightStart:
      return ArrowIcons.PointingElementLeft
    case TooltipPlacement.Top:
    case TooltipPlacement.TopEnd:
    case TooltipPlacement.TopStart:
      return ArrowIcons.PointingElementDown
    case TooltipPlacement.Bottom:
    case TooltipPlacement.BottomEnd:
    case TooltipPlacement.BottomStart:
      return ArrowIcons.PointingElementUp
    default:
      return ArrowIcons.PointingElementDown
  }
}
