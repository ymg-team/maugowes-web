const toast = (show = true, html, type = "success", autoclose = true) => {
  const ToastEl = document.getElementById("mg-toast")
  if (show) {
    ToastEl.innerHTML = html
    ToastEl.style.bottom = "20px"
    ToastEl.onclick = function () {
      return (ToastEl.style.bottom = "-200px")
    }
  } else {
    return (ToastEl.style.bottom = "-200px")
  }
  if (autoclose && show)
    setTimeout(() => {
      ToastEl.style.bottom = "-200px"
    }, 2500)
}

export default toast
