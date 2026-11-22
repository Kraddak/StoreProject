import React from 'react'
import ProductsContainer from '@/components/products/ProductsContainer'

const ProductsPage = async ({ searchParams }: {
  searchParams: Promise<{ layout?: string; search?: string }>
}) => {
  const { layout: layoutParam, search: searchParam } = await searchParams
  const layout = layoutParam || 'grid'
  const search = searchParam || ''
  return <ProductsContainer layout={layout} search={search}></ProductsContainer>
}

export default ProductsPage
