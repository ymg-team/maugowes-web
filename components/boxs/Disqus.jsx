import { useEffect } from "react"

const Disqus = (props) => {
  const renderDisqus = () => {
    // var disqus_config = function () {
    //   this.page.url = props.url // Replace PAGE_URL with your page's canonical URL variable
    //   this.page.identifier = props.identifier // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    // }
    if (!window.DISQUS) {
      /**
       *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
       *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      ;(function () {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement("script")
        s.src = "https://maugowes.disqus.com/embed.js"
        s.setAttribute("data-timestamp", +new Date())
        ;(d.head || d.body).appendChild(s)
      })()
    } else {
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = props.identifier
          this.page.url = props.url
        },
      })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      renderDisqus()
    }
  }, [])

  return <div id="disqus_thread" />
}

export default Disqus
