import React from "react"
import Styled from "styled-components"
import { color_gray_soft, color_black_main, color_blue_main } from "../Const"
import Link from "next/link"
import initialDropdown from "../../modules/dropdown"

// components
import Dropdown from "../dropdown/index"
import IconBottomArrow from "../icons/bottom-arrow"

const HeaderStyled = Styled.header`
  .header-logo {
    text-align: center;
    padding: 20px 0; 
  }

  .header-top-menu {
    border-top: 2px solid ${color_gray_soft}; 
    border-bottom: 2px solid ${color_blue_main};

    button.header-top-menu_link {
      background: transparent;
    }

    .header-top-menu_link {
      margin: 0 auto;
      border: none;
      cursor: pointer;
      text-decoration: none;
      color: ${color_black_main};
      font-size: 15px;
      display: block;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      outline: none;
      
      .header-top-menu_link_icon {
        margin-left: 5px;
      }
    }

    .header-top-menu_dropdown {
      padding: 10px;
    }

    .header-categories-list-dropdown {
      max-height: 100vh;
      overflow: auto;
      padding: 10px 20px;
      top: 45px;
      rigt: -10px;
      a {
        text-decoration: none;
        text-transform: capitalize;
      }
      h3 {
        font-weight: 100;
        margin: 5px 0 10px;
        text-transform: uppercase;
      }
      ul {
        border-bottom: .5px solid ${color_gray_soft};
        margin-bottom: 15px;
        padding-bottom: 15px;
        li {
          padding: 0;
        }
      }
    }

    .header-top-menu_group_left {
      border-right: 2px solid ${color_gray_soft}; 
    }

    .header-top-menu_group {
      margin: 0;
      padding: 0;
      display: -webkit-inline-box;
      padding: 25px 10px;
      li {
        list-style: none;
        padding: 0 20px;
      }
    }
  }

  [class*=col-] {
    padding: 0;
  }
`

const AvailableMenu = [
  {
    name: "Video",
    link: "/videos"
  },
  {
    name: "Blog",
    link: "/blog"
  },
  {
    name: "Marketplace",
    link: "/marketplace"
  },
  {
    name: "Rangking Goweser",
    link: "/rangking"
  }
]

const AvailableSellCategories = [
  {
    name: "Roadbike",
    link: "/categories/roadbike",
    child: [
      { name: "accesories", link: "/categories/roadbike/accesories" },
      { name: "part", link: "/categories/roadbike/part" },
      { name: "frameset", link: "/categories/roadbike/frameset" }
    ]
  },
  {
    name: "MTB",
    link: "/categories/mtb",
    child: [
      { name: "accesories", link: "/categories/roadbike/mtb" },
      { name: "part", link: "/categories/mtb/part" },
      { name: "frameset", link: "/categories/mtb/frameset" }
    ]
  }
]

class Header extends React.Component {
  componentDidMount = () => {
    initialDropdown()

    // set category weight same as category link
    const CatDropDown = document.getElementById("dropdown-categories")
    const BtnDropDown = document.getElementById("button-categories")

    CatDropDown.style.width = `calc(${BtnDropDown.offsetWidth}px - 40px)`
  }

  render = () => {
    return (
      <HeaderStyled>
        <div className="grid-center header-logo">
          <div className="col">
            <a href="/">
              <img src="/static/images/logo.png" alt="logo Mau Gowes" />
            </a>
          </div>
        </div>

        <div className="grid-noGuttter header-top-menu">
          <div
            className="col-3_xs-6 header-top-menu_group header-top-menu_group_left"
            id="button-categories">
            <Dropdown>
              <button
                className="dropdown-btn header-top-menu_link"
                type="button">
                Mau Beli apa ?
                <IconBottomArrow
                  className="header-top-menu_link_icon"
                  size="10"
                />
              </button>
              {/* categories of selling */}
              <div
                className="dropdown-content header-categories-list-dropdown"
                id="dropdown-categories"
                style={{ right: -10 }}>
                {AvailableSellCategories.map((n, key) => {
                  return (
                    <div key={key}>
                      <h3>{n.name}</h3>
                      <ul
                        style={
                          key == AvailableSellCategories.length - 1
                            ? { borderBottom: "none", marginBottom: 0 }
                            : {}
                        }>
                        {n.child.map((m, key) => {
                          return (
                            <li key={key}>
                              <a href={m.link}>{m.name}</a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
              {/* categories of selling */}
            </Dropdown>
          </div>
          <div className="col-3_xs-6">
            <ul className="header-top-menu_group">
              {AvailableMenu.map((n, key) => {
                return (
                  <li key={key}>
                    {n.child ? (
                      <Dropdown>
                        <button
                          type="button"
                          className="dropdown-btn header-top-menu_link">
                          {n.name}
                          <IconBottomArrow
                            className="header-top-menu_link_icon"
                            size="10"
                          />
                        </button>
                        <div className="dropdown-content dropdown-btn header-top-menu_dropdown">
                          <ul>
                            {n.child.map((m, key) => {
                              return (
                                <li key={key}>
                                  <a href={{ pathname: m.link }}>
                                    {m.name}{" "}
                                    <IconBottomArrow
                                      className="header-top-menu_link_icon"
                                      size="10"
                                    />
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </Dropdown>
                    ) : (
                      <Link prefetch href={n.link}>
                        <a className="header-top-menu_link" href={n.link}>
                          {n.name}
                        </a>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </HeaderStyled>
    )
  }
}

export default Header
