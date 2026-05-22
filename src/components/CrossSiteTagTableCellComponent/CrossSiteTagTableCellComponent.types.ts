export interface CrossSiteTagTableCellComponentProps {
  /**
   * The value to display next to the tag.
   * If empty/undefined, the component renders nothing.
   */
  readonly value: string
  /**
   * Label text displayed in the Tag.
   * @default 'Yes'
   */
  readonly tagLabel?: string
}
