import React from 'react'
import { Global, css } from '@emotion/core'
import { Fragment } from 'react'

import { useConfig } from '../../data'

export const PageElement = ({ children }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useConfig()

  return (
    <Fragment>
      <Global
        styles={css`
        @font-face {
          font-family: 'Inconsolata';
          src: url('${siteUrl}/fonts/Inconsolata-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Inconsolata';
          src: url('${siteUrl}/fonts/Inconsolata-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
      `}
      />
      {children}
    </Fragment>
  )
}
