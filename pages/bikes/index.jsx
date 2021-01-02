import { useState, useRef, useEffect } from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { toCamelCase, objToQuery } from "string-manager"
import { progressBar } from "../../modules/loaders"

// redux
import {
  fetchBikes,
  fetchBikeBrands,
  fetchBikeTypes,
} from "../../redux/bikes/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import Header from "../../components/boxs/FullWidthHeader"
import Sidebar from "../../components/navigations/SidebarBikes"
import BikesBox from "../../components/boxs/BikesBox"

const Breadcrumb = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/bikes",
    title: "Bikes",
  },
]

const BikesStyled = Styled.div`
 margin-top: 50px;
 .content {
  // padding: 20px;
 }
`

const MetaData = {
  title: "",
  description: "Kumpulan sepeda dan spesifikasinya.",
}

const MaxResults = 9

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  if (query.min_price) reqQuery.min_price = query.min_price
  if (query.max_price) reqQuery.max_price = query.max_price
  if (query.brand) reqQuery.brand = query.brand
  if (query.type) reqQuery.type = query.type
  if (query.q) reqQuery.q = query.q

  return reqQuery
}

export function bikeFilterGenerator(query = {}) {
  delete query.page

  return `list_${objToQuery(query)}`
}

const BikesIndex = (props) => {
  const { bikes, query } = props
  const reqQuery = requestQueryGenerator(query)

  const [almostBottom, setAlmostBottom] = useState(false)

  const [bikeFilter, setBikeFilter] = useState(bikeFilterGenerator(reqQuery))
  let { title, description } = MetaData

  const bikeTypes = bikes.bike_types || {}
  const bikeBrands = bikes.bike_brands || {}
  const bikesState = bikes[bikeFilter] || {}

  const firstUpdate = useRef(true)
  const oldBikeFilter = useRef(bikeFilter)

  useEffect(() => {
    const reqQuery = requestQueryGenerator(query)

    if (!bikeTypes.status) props.dispatch(fetchBikeTypes())
    if (!bikeBrands.status) props.dispatch(fetchBikeBrands())
    if (!bikesState.status) {
      if (typeof window !== "undefined") progressBar.start()
      props.dispatch(fetchBikes(bikeFilter, reqQuery))
    }

    // scroll listener
    document.addEventListener("scroll", loadMoreHandler)

    return () => {
      document.removeEventListener("scroll", loadMoreHandler)
    }
  }, [])

  //load more handler
  const loadMoreHandler = () => {
    return setAlmostBottom(
      window.innerHeight + window.scrollY >= document.body.offsetHeight / 1.5
    )
  }

  // loadmore on scroll
  useEffect(() => {
    if (almostBottom && !bikesState.is_loading && bikesState.status === 200) {
      const NextPage = Math.floor(bikesState.results.length / MaxResults) + 1
      let reqQuery = requestQueryGenerator(query)
      reqQuery.page = NextPage
      props.dispatch(fetchBikes(bikeFilter, reqQuery))
    }
  }, [almostBottom])

  // listen updated http query
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setBikeFilter(bikeFilterGenerator(reqQuery))
  }, [query])

  useEffect(() => {
    const bikeData = props.bikes[bikeFilter] || {}

    if (oldBikeFilter.current != bikeFilter) {
      oldBikeFilter.current = bikeFilter
      if (!bikeData.status) {
        let reqQuery = requestQueryGenerator(query)
        props.dispatch(fetchBikes(bikeFilter, reqQuery))
      }
    }
  }, [bikeFilter])

  // meta data generator
  if (query.q) {
    description = `Hasil Pencarian "${query.q}" `
  }

  if (bikesState.status) progressBar.stop()

  if (query.type && bikeTypes.status === 200) {
    const typeDetail = bikeTypes.results.find((n) => n.id === query.type)
    if (typeDetail && typeDetail.name) {
      title += `${typeDetail.name} `
    }
  }

  if (query.brand && bikeBrands.status === 200) {
    const brandDetail = bikeBrands.results.find((n) => n.id === query.brand)
    if (brandDetail && brandDetail.name) {
      title += `${brandDetail.name} `
    }
  }

  title += `${title ? "- " : ""} Bikes Mau Gowes`
  // end of meta data generator

  return (
    <GlobalLayout
      metadata={{
        title: toCamelCase(title),
        description,
      }}>
      <DefaultLayout>
        <Header
          breadcrumb={Breadcrumb}
          title={toCamelCase(title)}
          text={description}
          stats={{
            suffix: "bikes",
            total: bikesState.total || 0,
            show:
              bikesState.results && bikesState.results.length
                ? bikesState.results.length
                : 0,
          }}
        />
        <BikesStyled>
          <div className="grid">
            <Sidebar
              query={query}
              className="col-3_md-4_xs-12"
              bikeBrands={bikeBrands}
              bikeTypes={bikeTypes}
            />
            <div className="content col-9_md-8_xs-12">
              <BikesBox
                data={bikesState}
                maxResults={MaxResults}
                noHeaderTitle
              />
            </div>
          </div>
        </BikesStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

BikesIndex.getInitialProps = async ({ req, reduxStore, query }) => {
  if (req) {
    const reqQuery = requestQueryGenerator(query)
    const filter = bikeFilterGenerator(reqQuery)

    await reduxStore.dispatch(fetchBikeBrands())
    await reduxStore.dispatch(fetchBikeTypes())
    await reduxStore.dispatch(fetchBikes(filter, reqQuery))
  }
  return { query }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikesIndex)
