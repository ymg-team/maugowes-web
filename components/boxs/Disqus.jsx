import { useEffect } from "react"

const Disqus = (props) => {
  const renderDisqus = () => {
    // var disqus_config = function () {
    if (!window.DISQUS) {
      setTimeout(() => {
        resetDisqus()
      }, 800)
    } else {
      resetDisqus()
    }
  }

  const resetDisqus = () => {
    DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = props.identifier
        // this.page.url = props.url
      },
    })
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      renderDisqus()
    }
  }, [])

  return <div id="disqus_thread" />
}

export default Disqus
