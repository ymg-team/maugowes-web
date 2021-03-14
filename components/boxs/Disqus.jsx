import { useEffect } from "react"

let DisqusIntv

const Disqus = (props) => {
  const renderDisqus = () => {
    DisqusIntv = setInterval(() => {
      if (typeof window.DISQUS !== "undefined") {
        clearInterval(DisqusIntv)
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = props.identifier
            // this.page.url = props.url
          },
        })
      }
    }, 1000)
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
