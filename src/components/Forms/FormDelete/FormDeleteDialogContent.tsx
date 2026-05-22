import * as React from 'react';
import type { FC } from 'react'
import { Box } from '@/components/Box'
import { Column, Row, RowWrap, Stack, Spacing } from '@/components/Layout'
import { Callout } from '@/components/Callout'
import type { FormDeleteDialogContentProps, FormDeleteItem } from './FormDeleteDialogContent.types'
import './FormDeleteDialogContent.css'

/**
 * Renders a single item in the delete list.
 */
const DeleteItem: FC<{ item: FormDeleteItem }> = ({ item }) => (
  <div className={'FormDeleteDialogContent-item'}>
    <span className={'FormDeleteDialogContent-itemName'}>{item.name}</span>
    {item.description && (
      <span className={'FormDeleteDialogContent-itemDescription'}>{item.description}</span>
    )}
  </div>
)

/**
 * Content component for the FormDeleteDialog.
 *
 * Displays an optional warning callout and a list of items that will be deleted.
 * This simplified version replaces the server-side table from the source
 * with a simple list display.
 *
 * @example
 * ```tsx
 * <FormDeleteDialogContent
 *   callout={{
 *     type: CalloutType.FriendlyWarning,
 *     placement: CalloutPlacementType.OnPaper,
 *     headline: "Warning",
 *     content: "This action cannot be undone."
 *   }}
 *   items={[
 *     { id: 1, name: "Contact Form", description: "10 submissions" },
 *     { id: 2, name: "Survey Form", description: "5 submissions" }
 *   ]}
 * />
 * ```
 */
export const FormDeleteDialogContent: FC<FormDeleteDialogContentProps> = ({
  callout,
  items,
  children,
  className,
}) => {
  const itemsList = Array.isArray(items) ? items : [items]
  const hasItems = itemsList.length > 0

  return (
    <Row wrap={RowWrap.NoWrap} className={className}>
      <Column>
        <Stack spacing={Spacing.L}>
          {callout && (
            <Box spacingBottom={Spacing.XL}>
              <Callout
                type={callout.type}
                placement={callout.placement}
                headline={callout.headline}
                subheadline={callout.subheadline}
              >
                {callout.content}
              </Callout>
            </Box>
          )}
          {children ? (
            children
          ) : (
            hasItems && (
              <div className={'FormDeleteDialogContent-itemsList'}>
                {itemsList.map((item) => (
                  <DeleteItem key={item.id} item={item} />
                ))}
              </div>
            )
          )}
        </Stack>
      </Column>
    </Row>
  )
}

FormDeleteDialogContent.displayName = 'FormDeleteDialogContent'
