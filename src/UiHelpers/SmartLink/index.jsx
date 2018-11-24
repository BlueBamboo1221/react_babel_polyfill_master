import React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { theme } from "../../stylesGlobal"

const shared = css`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  ${op =>
    op.disabled
      ? css`
          color: GRAY !important;
          pointer-events: none;
        `
      : css`
          color: ${theme.link};
        `};
`

const PlainLink = styled.span`
  ${shared};
`

const HrefLink = styled.a`
  ${shared};
`

// TODO/4 indicateactive not working
const RouterLink = styled(Link)`
  ${shared};
  ${op =>
    op.indicateactive === "true" &&
    window.location.pathname.indexOf(op.to) >= 0 &&
    css`
      text-decoration: underline;
    `};
`

const SmartLink = props => {
  const { children, style, className, title, disabled, router, href, fnHandle } = props
  const attributes = {
    ...(style && { style }),
    ...(className && { className }),
    ...(disabled && { disabled }),
    ...(title && { title })
  }
  return router ? (
    <RouterLink {...attributes} to={router.to}>
      {children}
    </RouterLink>
  ) : href ? (
    <HrefLink {...attributes} target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </HrefLink>
  ) : (
    <PlainLink {...attributes} onClick={() => fnHandle()}>
      {children}
    </PlainLink>
  )
}

export default SmartLink
