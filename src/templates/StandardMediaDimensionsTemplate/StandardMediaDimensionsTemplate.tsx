import * as React from 'react';
import { useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  type ForwardedRef, } from 'react'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import {
  BorderRadius,
  Box,
  Button,
  ButtonColor,
  ButtonSize,
  Callout,
  CalloutType,
  CalloutPlacementType,
  Column,
  Headline,
  HeadlineSize,
  Icon,
  Input,
  MenuItem,
  Paper,
  PaperElevation,
  RoutingContentPlaceholder,
  Row,
  RowWrap,
  Select,
  Spacing,
  Stack,
  StickyHeader,
} from '@/components'
import { useEditableObjectStatusObservee } from '@/hooks'
import {
  type StandardMediaDimensionsTemplateProps,
  type StandardMediaDimensionsData,
  type StandardMediaDimensionListProps,
  type StandardMediaDimensionProps,
  type InvalidField,
  type CalloutConfiguration,
  CropState,
  MediaTransformationType,
} from './StandardMediaDimensionsTemplate.types'
import './StandardMediaDimensionsTemplate.css'

// Add translations for this template
const translations: Record<string, string> = {
  'admin.base.standardMediaDimensions.save': 'Save',
  'admin.base.standardMediaDimensions.noChangesToSave': 'No changes to save',
  'admin.base.standardMediaDimensions.newCropButtonLabel': 'Add crop dimension',
  'admin.base.standardMediaDimensions.noDataTitle': 'No crop dimensions defined',
  'admin.base.standardMediaDimensions.cropNameLabel': 'Name',
  'admin.base.standardMediaDimensions.cropCodeNameLabel': 'Code name',
  'admin.base.standardMediaDimensions.cropWidthLabel': 'Width',
  'admin.base.standardMediaDimensions.cropHeightLabel': 'Height',
  'admin.base.standardMediaDimensions.cropWidthPlaceholder': 'px',
  'admin.base.standardMediaDimensions.cropHeightPlaceholder': 'px',
  'admin.base.standardMediaDimensions.smartCropLabel': 'Smart crop',
  'admin.base.standardMediaDimensions.scaleLabel': 'Scale',
  'admin.base.standardMediaDimensions.delete': 'Delete',
  'admin.contentHub.missingPermissions': 'Missing permissions',
}

/**
 * Simple translation function for this template
 */
function t(key: string): string {
  return translations[key] ?? key
}

/**
 * Renders a single callout from configuration
 */
function CalloutFromConfig({ config }: { config: CalloutConfiguration }) {
  return (
    <Callout
      type={config.type ?? CalloutType.QuickTip}
      placement={config.placement ?? CalloutPlacementType.OnPaper}
      headline={config.headline}
    >
      {config.contentAsHtml && config.content ? (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(config.content),
          }}
        />
      ) : (
        config.content
      )}
    </Callout>
  )
}

/**
 * Simple page message pane for empty state
 */
function PageMessagePane({ title }: { title: string }) {
  return (
    <div className={'StandardMediaDimensionsTemplate-pageMessagePane'}>
      <div className={'StandardMediaDimensionsTemplate-pageMessageTitle'}>{title}</div>
    </div>
  )
}

/**
 * Simple content wrapper for sidebar layout
 */
function ContentWithSidebarLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={'StandardMediaDimensionsTemplate-layoutWrapper'}>{children}</div>
}

/**
 * StandardMediaDimension - Individual crop dimension item
 */
const StandardMediaDimension = forwardRef(
  (
    {
      index,
      cropDimensionsData,
      disabled = false,
      userHasUpdatePermission = true,
      userHasDeletePermission = true,
      userHasCreatePermission = true,
      invalidField,
      onChange,
      onDelete,
    }: StandardMediaDimensionProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const onlyNumbersRegex = useMemo(() => /^\d{0,5}$/, [])

    const validationMessageClasses = classNames('StandardMediaDimensionsTemplate-validationMessage')
    const footerClasses = classNames('StandardMediaDimensionsTemplate-validationMessageContainer')

    const handleStandardMediaDimensionTypeChange = useCallback(
      (value: string | undefined) => {
        switch (value) {
          case MediaTransformationType.SmartCrop: {
            onChange(index, {
              ...cropDimensionsData,
              cropType: MediaTransformationType.SmartCrop,
            })
            break
          }
          case MediaTransformationType.Scale: {
            onChange(index, {
              ...cropDimensionsData,
              cropType: MediaTransformationType.Scale,
            })
            break
          }
          default: {
            throw new Error(`Unknown transformation type: ${value ?? ''}`)
          }
        }
      },
      [index, cropDimensionsData, onChange]
    )

    const handleStandardMediaDimensionWidthChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        if (onlyNumbersRegex.test(newValue)) {
          onChange(index, {
            ...cropDimensionsData,
            cropWidth: newValue ? Number(newValue) : undefined,
          })
        }
      },
      [index, cropDimensionsData, onChange, onlyNumbersRegex]
    )

    const handleStandardMediaDimensionHeightChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        if (onlyNumbersRegex.test(newValue)) {
          onChange(index, {
            ...cropDimensionsData,
            cropHeight: newValue ? Number(newValue) : undefined,
          })
        }
      },
      [index, cropDimensionsData, onChange, onlyNumbersRegex]
    )

    const handleStandardMediaDimensionDisplayNameChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        onChange(index, {
          ...cropDimensionsData,
          cropDisplayName: e.currentTarget.value,
        })
      },
      [index, cropDimensionsData, onChange]
    )

    const inputIsDisabled = useMemo(
      () =>
        disabled ||
        (!userHasUpdatePermission &&
          cropDimensionsData.state === CropState.Unchanged) ||
        (!userHasCreatePermission &&
          cropDimensionsData.state === CropState.New),
      [disabled, userHasUpdatePermission, userHasCreatePermission, cropDimensionsData]
    )

    const deleteIsDisabled = useMemo(
      () =>
        userHasCreatePermission && cropDimensionsData.state === CropState.New
          ? false
          : disabled || !userHasDeletePermission,
      [disabled, userHasDeletePermission, userHasCreatePermission, cropDimensionsData]
    )

    const missingPermissionsMessage = t('admin.contentHub.missingPermissions')

    return (
      <Paper
        ref={ref}
        borderRadius={BorderRadius.Large}
        elevation={PaperElevation.Subtle}
        className={'StandardMediaDimensionsTemplate-standardMediaDimension'}
      >
        <Row
          className={'StandardMediaDimensionsTemplate-contentContainer'}
          spacingX={Spacing.M}
          spacingY={Spacing.S}
          wrap={RowWrap.Wrap}
        >
          <Column className={'StandardMediaDimensionsTemplate-contentName'}>
            <Row
              spacingX={Spacing.M}
              spacingY={Spacing.S}
              wrap={RowWrap.NoWrap}
              className={'StandardMediaDimensionsTemplate-inputName'}
            >
              <Column>
                <div className={'StandardMediaDimensionsTemplate-plainTextParameter'}>
                  {t('admin.base.standardMediaDimensions.cropNameLabel')}
                </div>
              </Column>
              <Column className={'StandardMediaDimensionsTemplate-inputName'}>
                <Input
                  name="cropDisplayName"
                  disabled={inputIsDisabled}
                  invalid={invalidField?.nameIsInvalid}
                  value={cropDimensionsData.cropDisplayName}
                  type="text"
                  onChange={handleStandardMediaDimensionDisplayNameChange}
                />
              </Column>
            </Row>
          </Column>

          {cropDimensionsData.cropName ? (
            <Column className={'StandardMediaDimensionsTemplate-contentName'}>
              <Row
                spacingX={Spacing.M}
                spacingY={Spacing.S}
                wrap={RowWrap.NoWrap}
                className={'StandardMediaDimensionsTemplate-inputName'}
              >
                <Column>
                  <div className={'StandardMediaDimensionsTemplate-plainTextParameter'}>
                    {t('admin.base.standardMediaDimensions.cropCodeNameLabel')}
                  </div>
                </Column>
                <Column className={'StandardMediaDimensionsTemplate-inputName'}>
                  <Input
                    name="cropCodeName"
                    disabled
                    invalid={invalidField?.nameIsInvalid}
                    value={cropDimensionsData.cropName}
                    type="text"
                  />
                </Column>
              </Row>
            </Column>
          ) : null}

          <Column className={'StandardMediaDimensionsTemplate-contentSelect'}>
            <Select
              name="cropType"
              onChange={handleStandardMediaDimensionTypeChange}
              value={
                cropDimensionsData.cropType ?? MediaTransformationType.SmartCrop
              }
              disabled={inputIsDisabled}
            >
              <MenuItem
                value="SmartCrop"
                primaryLabel={t(
                  'admin.base.standardMediaDimensions.smartCropLabel'
                )}
              />
              <MenuItem
                value="Scale"
                primaryLabel={t(
                  'admin.base.standardMediaDimensions.scaleLabel'
                )}
              />
            </Select>
          </Column>

          <Column className={'StandardMediaDimensionsTemplate-contentNumber'}>
            <Row spacingX={Spacing.M} spacingY={Spacing.S} wrap={RowWrap.NoWrap}>
              <Column>
                <div className={'StandardMediaDimensionsTemplate-plainTextParameter'}>
                  {t('admin.base.standardMediaDimensions.cropWidthLabel')}
                </div>
              </Column>
              <Column className={'StandardMediaDimensionsTemplate-inputNumber'}>
                <div>
                  <Input
                    name="cropWidth"
                    onChange={handleStandardMediaDimensionWidthChange}
                    disabled={inputIsDisabled}
                    invalid={invalidField?.widthIsInvalid}
                    value={String(cropDimensionsData.cropWidth ?? '')}
                    type="number"
                    placeholder={t(
                      'admin.base.standardMediaDimensions.cropWidthPlaceholder'
                    )}
                  />
                </div>
              </Column>
            </Row>
          </Column>

          <Column className={'StandardMediaDimensionsTemplate-contentNumber'}>
            <Row spacingX={Spacing.M} spacingY={Spacing.S} wrap={RowWrap.NoWrap}>
              <Column>
                <div className={'StandardMediaDimensionsTemplate-plainTextParameter'}>
                  {t('admin.base.standardMediaDimensions.cropHeightLabel')}
                </div>
              </Column>
              <Column className={'StandardMediaDimensionsTemplate-inputNumber'}>
                <div>
                  <Input
                    name="cropHeight"
                    disabled={inputIsDisabled}
                    invalid={invalidField?.heightIsInvalid}
                    value={String(cropDimensionsData.cropHeight ?? '')}
                    type="number"
                    onChange={handleStandardMediaDimensionHeightChange}
                    placeholder={t(
                      'admin.base.standardMediaDimensions.cropHeightPlaceholder'
                    )}
                  />
                </div>
              </Column>
            </Row>
          </Column>

          <Column className={'StandardMediaDimensionsTemplate-contentButton'}>
            <Box>
              <Button
                color={ButtonColor.Quinary}
                size={ButtonSize.S}
                destructive
                disabled={deleteIsDisabled}
                onClick={() => {
                  onDelete(index)
                }}
                icon="xp-bin"
                title={
                  !userHasDeletePermission
                    ? missingPermissionsMessage
                    : t('admin.base.standardMediaDimensions.delete')
                }
              />
            </Box>
          </Column>
        </Row>

        {invalidField ? (
          <Row>
            <div className={footerClasses}>
              <div className={validationMessageClasses}>
                <div className={'StandardMediaDimensionsTemplate-alertIcon'}>
                  <Icon name="xp-exclamation-triangle-inverted" />
                </div>
                {`${invalidField.nameValidationMessage ?? ''} ${invalidField.widthValidationMessage ?? invalidField.heightValidationMessage ?? ''}`}
              </div>
            </div>
          </Row>
        ) : null}
      </Paper>
    )
  }
)

StandardMediaDimension.displayName = 'StandardMediaDimension'

/**
 * StandardMediaDimensionList - List of crop dimensions
 */
const StandardMediaDimensionList = forwardRef(
  (
    {
      cropDimensionsData,
      disabled,
      userHasUpdatePermission,
      userHasDeletePermission,
      userHasCreatePermission,
      onChange,
      onDelete,
      invalidFields,
    }: StandardMediaDimensionListProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <>
        {cropDimensionsData.length > 0 && (
          <Stack spacing={Spacing.M}>
            {cropDimensionsData.map((cropDimension) => (
              <StandardMediaDimension
                ref={ref}
                key={cropDimension.cropId}
                index={cropDimension.cropId}
                cropDimensionsData={cropDimension}
                disabled={disabled}
                onChange={onChange}
                onDelete={onDelete}
                userHasUpdatePermission={userHasUpdatePermission}
                userHasDeletePermission={userHasDeletePermission}
                userHasCreatePermission={userHasCreatePermission}
                invalidField={invalidFields?.find(
                  (field) => field.id === cropDimension.cropId
                )}
              />
            ))}
          </Stack>
        )}

        {cropDimensionsData.length === 0 && (
          <PageMessagePane
            title={t('admin.base.standardMediaDimensions.noDataTitle')}
          />
        )}
      </>
    )
  }
)

StandardMediaDimensionList.displayName = 'StandardMediaDimensionList'

/**
 * StandardMediaDimensionsTemplate - Template for managing standard media crop dimensions.
 *
 * This template allows users to define and manage crop dimensions for media assets.
 * It supports CRUD operations for crop dimensions with validation.
 *
 * Features:
 * - Add/edit/delete crop dimensions
 * - Smart crop and scale transformation types
 * - Validation feedback
 * - Permission-based access control
 */
export function StandardMediaDimensionsTemplate({
  caption,
  callouts,
  disabled = false,
  userHasCreatePermission = true,
  userHasUpdatePermission = true,
  userHasDeletePermission = true,
  initialCropDimensions = [],
  onSave,
}: StandardMediaDimensionsTemplateProps) {
  const { getDataChanged, setDataChanged, getNewId } =
    useEditableObjectStatusObservee()
  const dataChangedId = useRef(getNewId())
  const [isSubmitInProgress, setIsSubmitInProgress] = useState<boolean>(false)
  const [cropDimensions, setCropDimensions] =
    useState<StandardMediaDimensionsData[]>(initialCropDimensions)
  const lastDimensionScrollRef = useRef<HTMLDivElement>(null)
  const [addingNewDimension, setAddingNewDimension] = useState<boolean>(false)
  const [isCreateDisabled, setIsCreateDisabled] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<InvalidField[]>([])
  const [isInitialLoadComplete, _setIsInitialLoadComplete] =
    useState<boolean>(true)

  const notDeletedCropDimensions = useMemo(
    () => cropDimensions.filter((crop) => crop.state !== CropState.Deleted),
    [cropDimensions]
  )
  const changedCropDimensions = useMemo(
    () => cropDimensions.filter((x) => x.state !== CropState.Unchanged),
    [cropDimensions]
  )
  const unchangedCropDimensions = useMemo(
    () => cropDimensions.filter((x) => x.state === CropState.Unchanged),
    [cropDimensions]
  )

  // Scrolls to the last dimension
  const scrollToLastDimensionSet = () =>
    lastDimensionScrollRef.current?.scrollIntoView({ behavior: 'smooth' })

  const cropIsEmpty = useCallback(
    (cropDimension: StandardMediaDimensionsData) => {
      return (
        cropDimension.cropWidth === undefined ||
        cropDimension.cropHeight === undefined ||
        cropDimension.cropDisplayName === '' ||
        cropDimension.cropDisplayName === undefined
      )
    },
    []
  )

  const newCropIsEmpty = useCallback(
    (cropDimension: StandardMediaDimensionsData) => {
      return cropDimension.state === CropState.New && cropIsEmpty(cropDimension)
    },
    [cropIsEmpty]
  )

  const existingCropIsEmpty = useCallback(
    (cropDimension: StandardMediaDimensionsData) => {
      return (
        (cropDimension.state === CropState.Updated ||
          cropDimension.state === CropState.Unchanged) &&
        cropIsEmpty(cropDimension)
      )
    },
    [cropIsEmpty]
  )

  const allowCreate = useCallback(() => {
    if (
      notDeletedCropDimensions.filter((dimension) => newCropIsEmpty(dimension))
        .length > 0
    ) {
      setIsCreateDisabled(true)
    } else {
      setIsCreateDisabled(false)
    }
  }, [notDeletedCropDimensions, newCropIsEmpty])

  const allowSave = useCallback(() => {
    const noEmptyExistingCropDimensions = !notDeletedCropDimensions.some(
      (dimension) => existingCropIsEmpty(dimension)
    )
    const noEmptyNewCropDimensions = !notDeletedCropDimensions.some(
      (dimension) => newCropIsEmpty(dimension)
    )
    let allowSaveResult =
      noEmptyExistingCropDimensions && noEmptyNewCropDimensions

    if (allowSaveResult) {
      allowSaveResult =
        unchangedCropDimensions.length !== cropDimensions.length
    }

    setDataChanged(dataChangedId.current, allowSaveResult)
  }, [
    notDeletedCropDimensions,
    existingCropIsEmpty,
    newCropIsEmpty,
    setDataChanged,
    unchangedCropDimensions,
    cropDimensions,
  ])

  // Scroll to the last dimension after its component is rendered
  useEffect(() => {
    if (addingNewDimension) {
      scrollToLastDimensionSet()
    }
  }, [addingNewDimension])

  useEffect(() => {
    allowCreate()
    allowSave()
  }, [allowCreate, allowSave])

  const newCropId = useCallback(() => {
    return cropDimensions.length > 0
      ? Math.max(...cropDimensions.map((x) => x.cropId)) + 1
      : 0
  }, [cropDimensions])

  const handleSave = useCallback(async () => {
    setIsSubmitInProgress(true)
    setAddingNewDimension(false)

    // Simulate save operation
    if (onSave) {
      onSave(changedCropDimensions)
    }

    // Clear invalid fields and mark all as unchanged
    setInvalidFields([])
    setDataChanged(dataChangedId.current, false)

    // Update states to unchanged
    setCropDimensions((prev) =>
      prev
        .filter((dim) => dim.state !== CropState.Deleted)
        .map((dim) => ({ ...dim, state: CropState.Unchanged }))
    )

    setIsSubmitInProgress(false)
  }, [changedCropDimensions, onSave, setDataChanged])

  const onChange = useCallback(
    (index: number, standardMediaDimension: StandardMediaDimensionsData) => {
      const currentCropDimension = cropDimensions.find(
        (item) => item.cropId === index
      )

      if (currentCropDimension === undefined) {
        return
      }

      if (standardMediaDimension.state === CropState.New) {
        setAddingNewDimension(false)
      }

      currentCropDimension.cropWidth = standardMediaDimension.cropWidth
      currentCropDimension.cropHeight = standardMediaDimension.cropHeight
      currentCropDimension.cropDisplayName =
        standardMediaDimension.cropDisplayName
      currentCropDimension.cropType = standardMediaDimension.cropType

      if (standardMediaDimension.state === CropState.Unchanged) {
        currentCropDimension.state = CropState.Updated
      }

      const updatedCropDimensions = [...cropDimensions]
      setCropDimensions(updatedCropDimensions)
    },
    [cropDimensions]
  )

  const handleDelete = useCallback(
    (index: number) => {
      const currentCropDimension = cropDimensions.find(
        (item) => item.cropId === index
      )

      if (currentCropDimension === undefined) {
        return
      }

      // The callback was called by the new dimension
      if (currentCropDimension.cropGuid === undefined) {
        setAddingNewDimension(false)
      }

      if (currentCropDimension.state === CropState.New) {
        const updatedCropDimensions = cropDimensions.filter(
          (item) => item.cropId !== index
        )
        setCropDimensions(updatedCropDimensions)
      } else {
        currentCropDimension.state = CropState.Deleted
        const updatedCropDimensions = [...cropDimensions]
        setCropDimensions(updatedCropDimensions)
        setDataChanged(dataChangedId.current, true)
      }
    },
    [cropDimensions, dataChangedId, setDataChanged]
  )

  const onAddNew = useCallback(() => {
    const extendedCropDimensions = [...cropDimensions]

    // Empty dimension already exists, scroll to it
    if (extendedCropDimensions.some((dimension) => newCropIsEmpty(dimension))) {
      scrollToLastDimensionSet()
      return
    }

    extendedCropDimensions.push({
      cropGuid: undefined,
      cropWidth: undefined,
      cropHeight: undefined,
      cropDisplayName: '',
      state: CropState.New,
      cropId: newCropId(),
      cropName: '',
    })

    setCropDimensions(extendedCropDimensions)
    setAddingNewDimension(true)
    setIsCreateDisabled(true)
    setDataChanged(dataChangedId.current, false)
  }, [cropDimensions, newCropId, newCropIsEmpty, setDataChanged])

  return (
    <RoutingContentPlaceholder>
      <ContentWithSidebarLayoutWrapper>
        <Box spacingBottom={Spacing.L}>
          <Headline size={HeadlineSize.M} spacingBottom={Spacing.M}>
            {caption}
          </Headline>

          {callouts?.map((callout, index) => (
            <Box key={index} spacingBottom={Spacing.XL}>
              <CalloutFromConfig config={callout} />
            </Box>
          ))}

          <StickyHeader>
            <Row>
              <Box spacingBottom={Spacing.XL}>
                <Button
                  onClick={handleSave}
                  disabled={disabled || !getDataChanged(dataChangedId.current)}
                  inProgress={isSubmitInProgress}
                  color={ButtonColor.Primary}
                  title={
                    getDataChanged(dataChangedId.current)
                      ? ''
                      : t('admin.base.standardMediaDimensions.noChangesToSave')
                  }
                >
                  {t('admin.base.standardMediaDimensions.save')}
                </Button>
              </Box>
              <Box spacingBottom={Spacing.XL} spacingLeft={Spacing.L}>
                <Button
                  disabled={
                    disabled ||
                    !userHasCreatePermission ||
                    isCreateDisabled ||
                    !isInitialLoadComplete
                  }
                  color={ButtonColor.Secondary}
                  onClick={onAddNew}
                  icon="xp-plus"
                  title={
                    !userHasCreatePermission
                      ? t('admin.contentHub.missingPermissions')
                      : undefined
                  }
                >
                  {t('admin.base.standardMediaDimensions.newCropButtonLabel')}
                </Button>
              </Box>
            </Row>
          </StickyHeader>

          <StandardMediaDimensionList
            ref={lastDimensionScrollRef}
            cropDimensionsData={notDeletedCropDimensions}
            disabled={disabled}
            onChange={onChange}
            onDelete={handleDelete}
            userHasUpdatePermission={userHasUpdatePermission}
            userHasCreatePermission={userHasCreatePermission}
            userHasDeletePermission={userHasDeletePermission}
            invalidFields={invalidFields}
          />
        </Box>
      </ContentWithSidebarLayoutWrapper>
    </RoutingContentPlaceholder>
  )
}

// Re-export sub-components for flexibility
export { StandardMediaDimension, StandardMediaDimensionList }
