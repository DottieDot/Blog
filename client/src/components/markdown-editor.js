import React, { useMemo, useCallback, useState } from 'react'
import Prism from 'prismjs'
import { Slate, Editable, withReact } from 'slate-react'
import { Text, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { css } from 'emotion'
import { Typography, useTheme } from '@material-ui/core'

require('prismjs/components/prism-markdown')

export default () => {
  const [value, setValue] = useState(initialValue)
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const decorate = useCallback(([node, path]) => {
    const ranges = []

    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = token => {
      if (typeof token === 'string') {
        return token.length
      } 
      else if (typeof token.content === 'string') {
        return token.content.length
      } 
      else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown)

    let start = 0
    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length

      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
      />
    </Slate>
  )
}

const Leaf = ({ attributes, children, leaf }) => {
  const theme = useTheme()

  if (leaf.title) {
    return (
      <Typography
        {...attributes}
        variant="h5"
      >
        {children}
      </Typography>
    )
  }

  let textDecoration = ''
  if (leaf.underlined) {
    textDecoration += 'underline '
  }
  if (leaf.strike) {
    textDecoration += 'line-through '
  }

  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && 'bold'};
        font-style: ${leaf.italic && 'italic'};
        text-decoration: ${textDecoration};
        color: inherit;
        ${leaf.list &&
          css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
          `}
        ${leaf.hr &&
          css`
            display: block;
            text-align: center;
            border-bottom: 2px solid ${theme.palette.text.secondary};
          `}
        ${leaf.blockquote &&
          css`
            display: inline-block;
            border-left: 4px solid ${theme.palette.primary.main};
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `}
        ${leaf.code &&
          css`
            font-family: monospace;
            background-color: ${theme.palette.background.background};
            padding: 3px;
          `}
      `}
    >
      {children}
    </span>
  )
}

const initialValue = [
  {
    children: [
      {
        text: ''
      }
    ]
  }
]
