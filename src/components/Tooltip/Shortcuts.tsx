import * as React from 'react';
import './Shortcuts.css'

interface ShortcutsProps {
  readonly shortcuts: string
}

const shortcutDividerReg = /(\+)/g

const Shortcuts = ({ shortcuts }: ShortcutsProps) =>
  shortcuts ? (
    <div className={'Shortcuts'}>
      {shortcuts.split(shortcutDividerReg).map((text, index) => {
        const isDivider = text === '+'
        return (
          <span className={isDivider ? 'Shortcuts-shortcutDivider' : 'Shortcuts-shortcutKey'} key={index}>
            {isDivider ? '+' : text.trim()}
          </span>
        )
      })}
    </div>
  ) : null

Shortcuts.displayName = 'Shortcuts'

export { Shortcuts }
