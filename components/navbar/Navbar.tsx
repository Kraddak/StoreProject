import React from 'react'
import Container from '../global/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import DarkButton from './DarkButton'
import LinksDropdown from './LinksDropdown'
import { Suspense } from 'react'

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo></Logo>
        {/*
          NavSearch calls Next.js's useSearchParams() hook. During a production
          build, Next.js may statically render this route before the browser's
          current query string is available. The hook then needs to switch that
          part of the page to client rendering (a CSR bailout).

          Keep NavSearch inside a Suspense boundary so Next.js can pause
          rendering that small part and use the boundary's fallback while the
          client search parameters are resolved. Without a boundary, a route
          that is being statically rendered can fail `next build` with the
          “missing-suspense-with-csr-bailout” error, and the production page
          may fail to render. The boundary is kept around only NavSearch so the
          rest of the navbar can render normally. Add a fallback here if a
          visible placeholder is preferred while the search input is pending.
        */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center"></div>
        <CartButton></CartButton>
        <DarkButton></DarkButton>
        <LinksDropdown></LinksDropdown>
      </Container>
    </nav>
  )
}

export default Navbar
