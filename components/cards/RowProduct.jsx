import Styled from "styled-components"
import { color_gray_dark, color_black_main, color_red_main } from "../Const"
import Button from "../buttons/index"

const RowProductStyled = Styled.div`
  padding-bottom: 20px !important;
  margin-bottom: 30px !important;
  border-bottom: 1px solid ${color_gray_dark};

  .row-product-left img {
    width: 100%;
    border: 1px solid ${color_gray_dark};
    cursor: pointer;
  }

  .row-product-right {
    padding-left: 30px;
    h2 {
      cursor: pointer;
      color: ${color_black_main};
      margin: 0;
      font-weight: 600;
      font-size: 16px;
    }
    .row-product-right_price {
      color: ${color_red_main};
      padding: 15px 0 0;
      font-weight: 600;
      font-size: 18px;
    }
    .row-product-right_label {
      font-size: 14px;
      line-height: 1.5;
    }
    .row-product-right_rating {
      padding: 20px 0 0;
    }
    .row-product-desc {
      color: ${color_gray_dark};
      margin-top: 30px;
      font-weight: 600;
    }
  }
`

const RowProduct = () => {
  return (
    <RowProductStyled className="grid">
      <div className="col-3 row-product-left">
        <img src="/static/images/dummies/product-1.jpg" alt="product image" />
      </div>
      <div className="col-9 row-product-right">
        <div>
          <>
            <h2>Stem Zipp Course SL</h2>
            <div className="row-product-right_price">Rp800.000</div>
            <div className="row-product-right_rating">
              <img
                src="https://img.icons8.com/color/20/000000/filled-star.png"
                alt="rate 1 icon"
              />
              <img
                src="https://img.icons8.com/color/20/000000/filled-star.png"
                alt="rate 2 icon"
              />
              <img
                src="https://img.icons8.com/color/20/000000/filled-star.png"
                alt="rate 3 icon"
              />
              <img
                src="https://img.icons8.com/color/20/000000/filled-star.png"
                alt="rate 4 icon"
              />
              <img
                src="https://img.icons8.com/color/20/000000/star-half.png"
                alt="rate 5 icon"
              />
            </div>
            <div className="row-product-right_label">
              <strong>Kondisi:</strong> Bekas
              <br />
              <strong>COD:</strong> di Sleman
            </div>
            <div className="row-product-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              sollicitudin mi. Sed a euismod odio. Sed nunc quam, tempus non
              rhoncus id, convallis vitae arcu. Cras erat enim, tristique sit
              amet turpis non, pulvinar vehicula risus. Curabitur tristique
              maximus ante et egestas.
            </div>
            <Button
              style={{ marginTop: 30 }}
              text="Cek Disini"
              type="link"
              target="/product/1"
              size="small"
              color="black"
            />
          </>
        </div>
      </div>
    </RowProductStyled>
  )
}

export default RowProduct
