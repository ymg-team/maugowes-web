const ShareBox = (props) => {
  return (
    <div className="product-share">
      <span style={{ marginRight: 20 }}>SHARE:</span>
      <a className="product-share_icon" href="#">
        <img
          src="https://img.icons8.com/android/20/000000/facebook.png"
          alt="Share ke Facebook"
        />
      </a>
      <a className="product-share_icon" href="#">
        <img
          src="https://img.icons8.com/android/20/000000/twitter.png"
          alt="Share ke Twitter"
        />
      </a>
    </div>
  )
}

export default ShareBox
