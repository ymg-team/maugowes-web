// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import BuildPageStyled from "./styled"
import Header from "../../components/boxs/FullWidthHeader"

const Title = "Bike Builder - Mau Gowes"
const Description = "Rancang sepeda idamanmu disini secara virtual"
const Breadcrumb = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/build",
    title: "Bike Builder",
  },
]

const BuildPage = (props) => {
  return (
    <GlobalLayout
      metadata={{
        title: Title,
        description: Description,
      }}>
      <DefaultLayout>
        <Header
          title={Title}
          text={Description}
          breadcrumb={Breadcrumb}
          stats={{
            suffix: "bikes",
            total: 1000,
            show: 10,
          }}
        />
        <BuildPageStyled>...</BuildPageStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default BuildPage
// this is vbuild page
