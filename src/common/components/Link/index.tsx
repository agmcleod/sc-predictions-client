import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'

interface LinkProps {
  href: string
}

type ClickEvent = React.MouseEvent<
  HTMLAnchorElement | HTMLButtonElement | HTMLDivElement,
  MouseEvent
>

export const Link: FC<LinkProps> = ({ ...props }) => {
  const history = useHistory()
  return (
    <MuiLink
      {...props}
      onClick={(e: ClickEvent) => {
        e.preventDefault()
        history.push(props.href)
      }}
    />
  )
}
