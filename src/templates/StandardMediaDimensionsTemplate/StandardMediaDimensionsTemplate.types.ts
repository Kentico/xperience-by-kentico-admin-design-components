import type { CalloutType, CalloutPlacementType } from '@/components'

/**
 * Media transformation type for crop dimensions.
 */
export const MediaTransformationType = {
  SmartCrop: 'SmartCrop',
  Scale: 'Scale',
} as const

export type MediaTransformationType =
  (typeof MediaTransformationType)[keyof typeof MediaTransformationType]

/**
 * Crop dimension state.
 */
export const CropState = {
  /** Crop dimension was added. */
  New: 0,
  /** Crop dimension was updated. */
  Updated: 1,
  /** Crop dimension was deleted. */
  Deleted: 2,
  /** Crop dimension was not changed. */
  Unchanged: 3,
} as const

export type CropState = (typeof CropState)[keyof typeof CropState]

/**
 * Callout configuration for template.
 */
export interface CalloutConfiguration {
  /** Type of callout. */
  readonly type?: CalloutType
  /** Placement of callout. */
  readonly placement?: CalloutPlacementType
  /** Headline text. */
  readonly headline?: string
  /** Content text. */
  readonly content?: string
  /** Whether content is HTML. */
  readonly contentAsHtml?: boolean
}

/**
 * Props for the StandardMediaDimensionsTemplate component.
 */
export interface StandardMediaDimensionsTemplateProps {
  /** Caption/title of the page. */
  readonly caption: string
  /** Indicates whether the entire template is disabled. */
  readonly disabled?: boolean
  /** Callouts to display. */
  readonly callouts?: CalloutConfiguration[]
  /** Indicates whether user has permission to create records. */
  readonly userHasCreatePermission?: boolean
  /** Indicates whether user has permission to update records. */
  readonly userHasUpdatePermission?: boolean
  /** Indicates whether user has permission to delete records. */
  readonly userHasDeletePermission?: boolean
  /** Initial crop dimensions data for demo/testing. */
  readonly initialCropDimensions?: StandardMediaDimensionsData[]
  /** Callback when save is triggered. */
  readonly onSave?: (data: StandardMediaDimensionsData[]) => void
}

/**
 * Data transfer object for standard media dimension data.
 */
export interface StandardMediaDimensionsData {
  /** Primary key of the image crop. */
  cropId: number
  /** CodeName of the crop. */
  cropName: string
  /** Display name of the crop. */
  cropDisplayName: string
  /** Width of the crop in pixels. */
  cropWidth?: number
  /** Height of the crop in pixels. */
  cropHeight?: number
  /** GUID of the crop (undefined for new items). */
  cropGuid?: string
  /** Transformation type (SmartCrop or Scale). */
  cropType?: MediaTransformationType
  /** State of the crop dimension. */
  state: CropState
}

/**
 * Properties of an invalid field from validation.
 */
export interface InvalidField {
  /** ID of the invalid field. */
  id: number
  /** Indicates whether the name is invalid. */
  nameIsInvalid: boolean
  /** Indicates whether the width is invalid. */
  widthIsInvalid: boolean
  /** Indicates whether the height is invalid. */
  heightIsInvalid: boolean
  /** Name validation message. */
  nameValidationMessage?: string
  /** Width validation message. */
  widthValidationMessage?: string
  /** Height validation message. */
  heightValidationMessage?: string
}

/**
 * Props for the StandardMediaDimensionList component.
 */
export interface StandardMediaDimensionListProps
  extends StandardMediaDimensionBaseProps {
  /** Crop dimensions data. */
  readonly cropDimensionsData: StandardMediaDimensionsData[]
  /** Invalid fields from validation. */
  readonly invalidFields?: InvalidField[]
}

/**
 * Base properties for standard media dimension components.
 */
export interface StandardMediaDimensionBaseProps {
  /** Indicates whether the template is disabled. */
  readonly disabled?: boolean
  /** Function for crop dimension change monitoring. */
  readonly onChange: (
    index: number,
    cropDimension: StandardMediaDimensionsData
  ) => void
  /** Function for crop dimension delete monitoring. */
  readonly onDelete: (index: number) => void
  /** Indicates whether user has permission to update records. */
  readonly userHasUpdatePermission?: boolean
  /** Indicates whether user has permission to delete records. */
  readonly userHasDeletePermission?: boolean
  /** Indicates whether user has permission to create records. */
  readonly userHasCreatePermission?: boolean
}

/**
 * Props for the StandardMediaDimension detail component.
 */
export interface StandardMediaDimensionProps
  extends StandardMediaDimensionBaseProps {
  /** Index of the dimension. */
  readonly index: number
  /** Crop dimensions data for this item. */
  readonly cropDimensionsData: StandardMediaDimensionsData
  /** Invalid field from validation for this item. */
  readonly invalidField?: InvalidField
}
