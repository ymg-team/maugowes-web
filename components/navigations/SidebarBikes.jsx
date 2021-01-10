import { useState } from "react"
import { currencyFormat } from "string-manager"
import Router from "next/router"
import Styled from "styled-components"
import { objToQuery } from "string-manager"
import { SidebarMarketplaceSytled } from "./SidebarMarketplace"
import { SelectStyled } from "../form/Select"
import { InputTextStyled } from "../form/InputText"
import { InputRangeStyled } from "../form/InputRange"
import { color_black_main } from "../Const"

let FilterRedirectTimeout

const SidebarBikesStyled = Styled(SidebarMarketplaceSytled)`
.sidebar-items {
  margin-bottom: 20px;
 .categories {
  .category-item {
   border-bottom: none;
   select {
     text-transform: capitalize;
     color: ${color_black_main};
    }
   }
  }
 }

}
`

const SidebarBikes = (props) => {
  const { query } = props

  const [q, setQ] = useState(query.q)
  const [minPrice, setMinPrice] = useState(query.min_price || 0)
  const [maxPrice, setMaxPrice] = useState(query.max_price || 0)

  const changeHandler = (e) => {
    const { name, value } = e.target
    let { query } = props
    if (value == 0) {
      delete query[name]
    } else {
      query[name] = value
    }
    return Router.push(
      `/bikes?${objToQuery(query)}`,
      `/bikes?${objToQuery(query)}`
    )
  }

  const selectRender = (dataKey) => {
    const { status, results } = props[dataKey] || {}
    if (status && status == 200) {
      return results.map((n) => (
        <option key={n.id} value={n.id}>
          {n.name}
        </option>
      ))
    } else {
      return null
    }
  }

  return (
    <SidebarBikesStyled className={props.className}>
      {/* search bike */}
      <div className="sidebar-items">
        <h2 style={{ marginTop: 0 }} className="title">
          Cari
        </h2>
        <InputTextStyled>
          <input
            placeholder="Tulis brand atau tipe disini"
            name="q"
            type="text"
            value={q || ""}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                changeHandler({
                  target: {
                    name: "q",
                    value: q,
                  },
                })
              }
            }}
          />
        </InputTextStyled>
      </div>
      <br />
      {/* end of search bike */}

      {/* filter by brand and type */}
      <div className="sidebar-items">
        <h2 className="title">Filter</h2>
        <div className="categories">
          <div className="category-item">
            {/* select brand */}
            <SelectStyled>
              <select
                name="brand"
                onChange={(e) => changeHandler(e)}
                value={query.brand || "0"}>
                <option value={"0"}>Pilih Brand Sepeda</option>
                {selectRender("bikeBrands")}
              </select>
            </SelectStyled>
            {/* end of select brand */}

            {/* select type */}
            <SelectStyled>
              <select
                name="type"
                onChange={(e) => changeHandler(e)}
                value={query.type || "0"}>
                <option value={"0"}>Pilih Jenis Sepeda</option>
                {selectRender("bikeTypes")}
              </select>
            </SelectStyled>
            {/* end of select type */}
          </div>
        </div>
      </div>
      <br />
      {/* end of filter by brand and type */}

      {/* filter by price range */}
      <div className="sidebar-items">
        <h2 className="title">Range Harga</h2>

        <p style={{ fontSize: 15 }}>Maks Rp. {currencyFormat(maxPrice)}</p>
        <InputRangeStyled>
          <input
            type="range"
            value={maxPrice}
            min={minPrice}
            max="200000000"
            onChange={(e) => {
              clearTimeout(FilterRedirectTimeout)
              const { value } = e.target
              setMaxPrice(value)
              FilterRedirectTimeout = setTimeout(() => {
                changeHandler({
                  target: {
                    name: "max_price",
                    value,
                  },
                })
              }, 800)
            }}
          />
        </InputRangeStyled>

        <p style={{ fontSize: 15 }}>Min Rp. {currencyFormat(minPrice)}</p>
        <InputRangeStyled>
          <input
            type="range"
            value={minPrice}
            min="0"
            max={maxPrice}
            onChange={(e) => {
              const { value } = e.target
              clearTimeout(FilterRedirectTimeout)
              setMinPrice(value)
              FilterRedirectTimeout = setTimeout(() => {
                changeHandler({
                  target: {
                    name: "min_price",
                    value,
                  },
                })
              }, 800)
            }}
          />
        </InputRangeStyled>
      </div>
      {/* end of filter by price range */}
    </SidebarBikesStyled>
  )
}

SidebarBikes.defaultProps = {
  className: "",
  query: {},
}

export default SidebarBikes
