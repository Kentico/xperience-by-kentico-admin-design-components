export interface TextWithLabelProps {
  /**
   * Label used as header to the text.
   */
  readonly label?: string
  /**
   * Value used as text to the label.
   */
  readonly value?: string
  /**
   * Dangerously sets component value as inner HTML.
   */
  readonly valueAsHtml?: boolean
}
