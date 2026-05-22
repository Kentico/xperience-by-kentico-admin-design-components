import * as React from 'react';
import { forwardRef } from 'react'
import classNames from 'classnames'
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { xml } from '@codemirror/lang-xml'
import { sql } from '@codemirror/lang-sql'
import { css } from '@codemirror/lang-css'
import { useFocusRing } from '@react-aria/focus'
import { FormEditMode } from '@/components/types/FormEditMode'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { TextWithLabel } from '@/components/TextWithLabel'
import { CodeEditorLanguage, type CodeEditorProps } from './CodeEditor.types'
import './CodeEditor.css'

const mapLanguage = (language: CodeEditorLanguage) => {
  switch (language) {
    case CodeEditorLanguage.Css:
      return css()
    case CodeEditorLanguage.Javascript:
      return javascript()
    case CodeEditorLanguage.Sql:
      return sql()
    case CodeEditorLanguage.Xml:
      return xml()
    case CodeEditorLanguage.Html:
    default:
      return html()
  }
}

/**
 * Code editor component.
 */
export const CodeEditor = forwardRef<ReactCodeMirrorRef, CodeEditorProps>(
  (
    {
      language,
      label,
      id: _passedId,
      disabled,
      readOnly,
      validationMessage,
      invalid,
      markAsRequired,
      explanationText,
      inactiveMessage,
      labelIconTooltip,
      labelIcon,
      tooltipAsHtml,
      explanationTextAsHtml,
      basicSetup = { searchKeymap: false },
      labelActionsElement,
      ...restProps
    },
    ref
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing({
      isTextInput: true,
      within: true,
    })
    const className = classNames(
      'CodeEditor',
      disabled && 'CodeEditor-disabled',
      readOnly && 'CodeEditor-readOnly',
      isFocusVisible && 'CodeEditor-focused',
      invalid && 'CodeEditor-invalid'
    )

    const wrapperClasses = classNames(
      'CodeEditor-wrapper',
      readOnly && 'CodeEditor-readOnly'
    )


    const renderContent = () => {
      if (readOnly && !restProps.value) {
        return <TextWithLabel />
      }

      return (
        <div
          {...focusProps}
          role="button"
          tabIndex={-1}
          className={wrapperClasses}
          data-readonly={readOnly}
        >
          <CodeMirror
            {...restProps}
            extensions={[mapLanguage(language)]}
            className={className}
            editable={!disabled && !readOnly}
            onFocus={restProps.onFocus}
            onBlur={focusProps.onBlur}
            readOnly={disabled || readOnly}
            ref={ref}
            basicSetup={basicSetup}
          />
          {/* prevents strange focus behavior after click right of code editor */}
          <div className={'CodeEditor-emptyColumn'} />
        </div>
      )
    }

    return (
      <FormItemWrapper
        label={label}
        markAsRequired={markAsRequired}
        disabled={disabled}
        editMode={
          readOnly
            ? FormEditMode.ReadOnly
            : disabled
              ? FormEditMode.Disabled
              : FormEditMode.Default
        }
        inactiveMessage={inactiveMessage}
        labelIcon={labelIcon}
        labelIconTooltip={labelIconTooltip}
        invalid={invalid}
        validationMessage={validationMessage}
        explanationText={explanationText}
        tooltipAsHtml={tooltipAsHtml}
        explanationTextAsHtml={explanationTextAsHtml}
        labelActionsElement={labelActionsElement}
      >
        {renderContent()}
      </FormItemWrapper>
    )
  }
)

CodeEditor.displayName = 'CodeEditor'
