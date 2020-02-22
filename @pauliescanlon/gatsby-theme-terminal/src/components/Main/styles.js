export const site = {
  margin: '0 auto',
  maxWidth: 1200,
}

export const header = ({ sidebarWidth }) => ({
  alignItems: 'center',
  backgroundColor: 'background',
  borderBottom: theme =>
    `${theme.borderWidths[1]}px solid ${theme.colors.surface}`,
  display: 'flex',
  justifyContent: 'space-between',
  height: theme => `${theme.space[5]}px`,
  ml: [0, 0, 0, sidebarWidth],
  overflow: 'hidden',
  position: 'fixed',
  p: 2,
  width: '100%',
})

export const left = {}
export const right = {}

export const sidebar = ({ sidebarWidth, isNavOpen }) => ({
  height: '100%',
  pointerEvents: [
    isNavOpen ? 'auto' : 'none',
    isNavOpen ? 'auto' : 'none',
    isNavOpen ? 'auto' : 'none',
    'auto',
  ],
  position: 'fixed',
  width: sidebarWidth,
  zIndex: 999,
})

export const sidebarChild = ({ sidebarWidth, isNavOpen }) => ({
  backgroundColor: 'background',
  borderRight: theme =>
    `${theme.borderWidths[1]}px solid ${theme.colors.surface}`,
  height: '100%',
  left: [
    `${isNavOpen ? 0 : `-${sidebarWidth}px`}`,
    `${isNavOpen ? 0 : `-${sidebarWidth}px`}`,
    `${isNavOpen ? 0 : `-${sidebarWidth}px`}`,
    0,
  ],
  transition: '.3s ease-in-out left',
  position: 'relative',
})

export const lightbox = ({ isNavOpen }) => ({
  backgroundColor: 'black',
  display: [
    isNavOpen ? 'block' : 'none',
    isNavOpen ? 'block' : 'none',
    isNavOpen ? 'block' : 'none',
    'none',
  ],
  height: '100%',
  position: 'fixed',
  opacity: 0.8,
  width: '100%',
  zIndex: 998,
})

export const main = ({ sidebarWidth }) => ({
  ml: [0, 0, 0, sidebarWidth],
  p: theme => [
    `${theme.space[6]}px ${theme.space[3]}px`,
    `${theme.space[6]}px ${theme.space[4]}px`,
  ],
  transition: '.3s ease-in-out margin-left',
})

export const iconButton = ({ isNavOpen }) => ({
  backgroundColor: 'background',
  cursor: 'pointer',
  display: [
    isNavOpen ? 'none' : 'block',
    isNavOpen ? 'none' : 'block',
    isNavOpen ? 'none' : 'block',
    'none',
  ],
})
