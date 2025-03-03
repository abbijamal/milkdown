/* Copyright 2021, Milkdown by Mirone. */
import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { usePages, useRootUrl } from '../../provider/LocalizationProvider'
import { useHideSidePanel, useShowSectionSidePanel } from '../../provider/SidePanelStateProvider'

const NavItem: FC<{ icon: string; text: string; id?: string; link?: string }> = ({ icon, text, id, link }) => {
  const showSectionSidePanel = useShowSectionSidePanel()
  const hideSidePanel = useHideSidePanel()
  const location = useLocation()
  const pages = usePages()
  const page = pages.find(page => page.link === location.pathname)
  const isActive = location.pathname === link || (id && page?.parentId === id)

  const ContainerComponent: FC<{ children: ReactNode }> = useMemo(() => {
    if (link) {
      const Container: FC<{ children: ReactNode }> = ({ children }) => (
        <NavLink to={link}>
          {children}
        </NavLink>
      )
      return Container
    }

    const onMouseEnter = () => {
      if (!id)
        return
      showSectionSidePanel(id, 'desktop')
    }

    const onMouseLeave = () => {
      if (!id)
        return
      hideSidePanel(500)
    }

    const Container: FC<{ children: ReactNode }> = ({ children }) => {
      return (
        <div
          className={`text-center cursor-pointer ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </div>
      )
    }
    return Container
  }, [hideSidePanel, id, isActive, link, showSectionSidePanel])

  return (
    <ContainerComponent>
      <div className={`py-0.5 px-4 flex justify-center rounded-3xl
        ${isActive ? 'bg-nord8' : 'hover:bg-gray-300'}`}>
        <div className="material-symbols-outlined">{icon}</div>
      </div>
      <div className="text-xs font-light">{text}</div>
    </ContainerComponent>
  )
}

const NavButtonItem: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-14 h-14 mt-1 cursor-pointer rounded-full
      text-gray-600 hover:text-gray-900 hover:bg-gray-300">{children}</div>
  )
}

export const DesktopNav: FC = () => {
  const root = useRootUrl()
  const playgroundURL = `/${[root, 'playground'].filter(x => x).join('/')}`

  return (
    <nav className="pt-11 pb-14 h-full w-full flex-col justify-between items-center flex">
      <div>
        <div className="cursor-pointer w-14 h-14 mx-auto flex justify-center items-center
          rounded-full shadow-inner
          bg-white border border-gray-300
          hover:border-blue-200 hover:ring-2 hover:ring-nord8">
          <img className="w-9 h-9" src="/milkdown-logo.svg"></img>
        </div>
        <div className="flex gap-4 flex-col mt-8">
          <NavItem icon="apps" text="Recipes" id="recipes" />
          <NavItem icon="design_services" text="Guide" id="guide" />
          <NavItem icon="extension" text="Plugin" id="plugin" />
          <NavItem icon="api" text="API" id="api" />
          <NavItem icon="view_carousel" text="Playground" link={playgroundURL} />
        </div>
      </div>

      <div>
        <NavButtonItem>
          <div className="material-symbols-outlined">search</div>
        </NavButtonItem>
        <NavButtonItem>
          <div className="material-symbols-outlined">translate</div>
        </NavButtonItem>
        <NavButtonItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </NavButtonItem>
        <NavButtonItem>
          <div className="material-symbols-outlined">dark_mode</div>
        </NavButtonItem>
      </div>
    </nav>
  )
}
