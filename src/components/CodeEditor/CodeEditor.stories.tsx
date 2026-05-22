import * as React from 'react';
import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { CodeEditor } from './CodeEditor'
import { CodeEditorLanguage } from './CodeEditor.types'

const sampleCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,
  css: `.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: #f5f5f5;
}

.button {
  border-radius: 8px;
  cursor: pointer;
}`,
  javascript: `function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

const result = greet('World');`,
  sql: `SELECT users.name, users.email, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.created_at >= '2024-01-01'
ORDER BY orders.total DESC
LIMIT 10;`,
  xml: `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
  </book>
</catalog>`,
}

/** Wrapper that adds useState so each CodeEditor instance is independently editable */
const InteractiveCodeEditor = (props: ComponentProps<typeof CodeEditor>) => {
  const [value, setValue] = useState(props.value ?? '')
  return (
    <CodeEditor
      {...props}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  )
}

const meta = {
  title: 'Forms/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    language: {
      control: 'select',
      options: Object.values(CodeEditorLanguage),
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    label: { control: 'text' },
    validationMessage: { control: 'text' },
    explanationText: { control: 'text' },
    markAsRequired: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    disabled: false,
    readOnly: false,
    invalid: false,
    markAsRequired: false,
  },
  render: function InteractiveCodeEditorStory(args) {
    const [value, setValue] = useState(args.value ?? '')
    return (
      <CodeEditor
        {...args}
        value={value}
        onChange={(newValue, viewUpdate) => {
          setValue(newValue)
          args.onChange?.(newValue, viewUpdate)
        }}
      />
    )
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeEditor>

export default meta
type Story = StoryObj<typeof CodeEditor>

export const Default: Story = {
  args: {
    language: CodeEditorLanguage.Html,
    value: sampleCode.html,
    label: 'Code Editor',
  },
}

export const WithLabel: Story = {
  args: {
    language: CodeEditorLanguage.Javascript,
    value: sampleCode.javascript,
    label: 'JavaScript Code',
  },
}

export const MarkAsRequired: Story = {
  args: {
    language: CodeEditorLanguage.Html,
    value: sampleCode.html,
    label: 'Required Field',
    markAsRequired: true,
  },
}

export const WithExplanationText: Story = {
  args: {
    language: CodeEditorLanguage.Css,
    value: sampleCode.css,
    label: 'Stylesheet',
    explanationText: 'Enter CSS styles for your component.',
  },
}

export const Disabled: Story = {
  args: {
    language: CodeEditorLanguage.Html,
    value: sampleCode.html,
    label: 'Disabled Editor',
    disabled: true,
    inactiveMessage: 'This editor is currently disabled.',
  },
}

export const ReadOnly: Story = {
  args: {
    language: CodeEditorLanguage.Javascript,
    value: sampleCode.javascript,
    label: 'Read-Only Code',
    readOnly: true,
  },
}

export const Invalid: Story = {
  args: {
    language: CodeEditorLanguage.Sql,
    value: 'SELEC * FORM users', // intentional typos
    label: 'SQL Query',
    invalid: true,
    validationMessage: 'Syntax error: Invalid SQL query',
  },
}

export const HtmlLanguage: Story = {
  args: {
    language: CodeEditorLanguage.Html,
    value: sampleCode.html,
    label: 'HTML',
  },
}

export const CssLanguage: Story = {
  args: {
    language: CodeEditorLanguage.Css,
    value: sampleCode.css,
    label: 'CSS',
  },
}

export const JavascriptLanguage: Story = {
  args: {
    language: CodeEditorLanguage.Javascript,
    value: sampleCode.javascript,
    label: 'JavaScript',
  },
}

export const SqlLanguage: Story = {
  args: {
    language: CodeEditorLanguage.Sql,
    value: sampleCode.sql,
    label: 'SQL',
  },
}

export const XmlLanguage: Story = {
  args: {
    language: CodeEditorLanguage.Xml,
    value: sampleCode.xml,
    label: 'XML',
  },
}

export const AllLanguageModes: Story = {
  render: () => {
    const languages = [
      { lang: CodeEditorLanguage.Html, label: 'HTML', code: sampleCode.html },
      { lang: CodeEditorLanguage.Css, label: 'CSS', code: sampleCode.css },
      {
        lang: CodeEditorLanguage.Javascript,
        label: 'JavaScript',
        code: sampleCode.javascript,
      },
      { lang: CodeEditorLanguage.Sql, label: 'SQL', code: sampleCode.sql },
      { lang: CodeEditorLanguage.Xml, label: 'XML', code: sampleCode.xml },
    ]

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 500 }}
      >
        {languages.map(({ lang, label, code }) => (
          <InteractiveCodeEditor key={lang} language={lang} value={code} label={label} />
        ))}
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 500 }}
    >
      <InteractiveCodeEditor
        language={CodeEditorLanguage.Html}
        value={sampleCode.html}
        label="Default"
      />
      <CodeEditor
        language={CodeEditorLanguage.Html}
        value={sampleCode.html}
        label="Disabled"
        disabled
        inactiveMessage="This editor is disabled."
      />
      <CodeEditor
        language={CodeEditorLanguage.Html}
        value={sampleCode.html}
        label="Read-Only"
        readOnly
      />
      <InteractiveCodeEditor
        language={CodeEditorLanguage.Html}
        value="<div>Invalid content"
        label="Invalid"
        invalid
        validationMessage="Missing closing tag"
      />
    </div>
  ),
}

/** Demonstrates controlled code editor behavior */
export const Controlled: Story = {
  render: function ControlledCodeEditor() {
    const [value, setValue] = useState(sampleCode.javascript)

    return (
      <div style={{ width: 500 }}>
        <CodeEditor
          language={CodeEditorLanguage.Javascript}
          value={value}
          onChange={(newValue: string) => setValue(newValue)}
          label="Editable Code"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Characters: {value.length}
        </p>
      </div>
    )
  },
}
