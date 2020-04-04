/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from 'theme-ui'
import { Location } from '@reach/router'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { format } from 'date-fns'
import { ContextProvider } from '../context'

import { Seo } from '../components/Seo'
import { Main } from '../components/Main'
import { useConfig } from '../data'

import {
  Heading,
  Image,
  Badge,
  Text,
  Flex,
  Box,
  Divider,
} from '@theme-ui/components'

import * as styles from './styles'

const formatDate = date => format(new Date(date), 'd-MMM-u')

const SourceLayout = ({
  data: {
    mdx: {
      id,
      body,
      excerpt,
      frontmatter,
      timeToRead,
      wordCount: { words },
      fields,
    },
  },
  pageContext,
}) => {
  const {
    site: {
      siteMetadata: { name, siteUrl, siteImage, lang },
    },
  } = useConfig()

  const {
    title,
    tags,
    date,
    dateModified,
    author,
    featuredImage,
    embeddedImages,
  } = frontmatter

  const embedded = {}

  if (embeddedImages) {
    embeddedImages.forEach((image, index) => {
      if (image && image.childImageSharp.fluid) {
        embedded[`image${index + 1}`] = {
          fluid: image.childImageSharp.fluid || null,
        }
      }
    })
  }

  const { next, prev, parent } = pageContext

  console.log('fields: ', fields)
  console.log('next: ', JSON.stringify(next, null, 2))
  console.log('next: ', JSON.stringify(prev, null, 2))
  console.log('parent: ', parent)

  return (
    <ContextProvider>
      <Location>
        {({ location }) => {
          const { pathname } = location
          return (
            <Fragment>
              <Seo
                type="article"
                title={name}
                titleTemplate={title}
                description={excerpt}
                siteUrl={siteUrl}
                image={
                  featuredImage && featuredImage.childImageSharp
                    ? featuredImage.childImageSharp.fluid.src
                    : siteImage
                }
                path={pathname}
                keywords={tags}
                lang={lang}
              />
              <Main>
                {featuredImage && featuredImage.childImageSharp && (
                  <Image
                    sx={{ mb: 3 }}
                    src={featuredImage.childImageSharp.fluid.src}
                    alt={featuredImage.childImageSharp.fluid.originalName}
                  />
                )}
                <Heading as="h1" variant="styles.h1" sx={styles.title}>
                  {title}
                </Heading>

                <Flex sx={styles.flex}>
                  <Box sx={styles.box}>
                    {date && (
                      <Text sx={styles.text}>
                        Date published: {formatDate(date)}
                      </Text>
                    )}
                  </Box>
                  <Box sx={styles.box}>
                    {dateModified && (
                      <Text sx={styles.rightText}>
                        Date modified: {formatDate(dateModified)}
                      </Text>
                    )}
                  </Box>
                </Flex>

                <Flex sx={styles.flex}>
                  <Box sx={styles.box}>
                    <Text
                      sx={styles.text}
                    >{`${timeToRead} min read / ${words} words`}</Text>
                  </Box>
                  {author && (
                    <Box sx={styles.box}>
                      <Text sx={styles.rightText}>Author: {author}</Text>
                    </Box>
                  )}
                </Flex>

                <Divider />

                {tags &&
                  tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="primary"
                      sx={styles.tag({ index, tags })}
                    >
                      {tag}
                    </Badge>
                  ))}

                <Divider />
                <MDXProvider>
                  <MDXRenderer embedded={embedded}>{body}</MDXRenderer>
                </MDXProvider>
              </Main>
            </Fragment>
          )
        }}
      </Location>
    </ContextProvider>
  )
}

// This query is a duplicate of useAllMdx so if you update this one update that one too! in data/useAllMdx
// test id: c147b696-2ac9-58b3-a3e6-17d8402289e0
// draft id: c2a66bb2-6fc4-5b03-94f1-e31abea07a59

export const singleMdx = graphql`
  query singleMdx($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      timeToRead
      wordCount {
        words
      }
      frontmatter {
        title
        tags
        date
        dateModified
        author
        status
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
            }
            id
          }
        }
        embeddedImages {
          childImageSharp {
            fluid(maxWidth: 1200) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
            }
            id
          }
        }
      }
      fields {
        slug
        owner
        parent
      }
    }
  }
`

export default SourceLayout
