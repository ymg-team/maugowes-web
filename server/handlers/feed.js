const postModule = require("../modules/post")
const videoModule = require("../modules/videos")
const eventModule = require("../modules/events")
const bikeModule = require("../modules/bikes")
const DaysJs = require("dayjs")

// handler of /feed/videos
module.exports.videosFeed = (req, res) => {
  // always hide draft
  req.query.showDraft = false
  return videoModule.fetchVideos(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <item>
                <title>${n.title}</title>
                <description>${n.description}</description>
                <link>https://maugowes.com${n.link}</link>
                <guid>https://maugowes.com${n.link}</guid>
                <category domain="https://maugowes.com">video,mau gowes,sepeda,roadbike,mtb,foldingbike</category>
                <pubDate>${DaysJs(n.created_on * 1000).format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</pubDate>
                <comments>https://maugowes.com${n.link}#comments</comments>
            </item>
            `
      })
      let sitemap = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mau Gowes Videos Feeds - Maaaauuuu....</title>
                <description>Video dari Mau Gowes - Bahagia Bersama Sepeda</description>
                <link>https://maugowes.com</link>
                <category domain="https://maugowes.com">gowes/sepeda/cycling/roadbike/mtb/folding bike</category>
                <copyright>Copyright 2020 Yussan Media Group.</copyright>
                <lastBuildDate>${DaysJs().format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</lastBuildDate>
                <language>id-id</language>
                <image>
                    <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_100/v1555855650/maugowes/2019/mau_gowes.png</url>
                    <title>Mau Gowes - Maaaauuuu....</title>
                    <link>https://maugowes.com</link>
                    <description>Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                    <width>100</width>
                    <height>100</height>
                </image>
                <atom:link href="https://maugowes.com/feed/videos" rel="self" type="application/rss+xml"/>
                ${content}
            </channel>
        </rss>
        `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

// handle of /feed/posts
module.exports.postsFeed = (req, res) => {
  // always hide draft
  req.query.showDraft = false
  return postModule.fetchPosts(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <item>
                <title>${n.title}</title>
                <description>${n.truncatedContent}</description>
                <link>https://maugowes.com${n.link}</link>
                <guid>https://maugowes.com${n.link}</guid>
                <category domain="https://maugowes.com">${n.tags.join(
                  ","
                )}</category>
                <pubDate>${DaysJs(n.created_on * 1000).format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</pubDate>
                <comments>https://maugowes.com${n.link}#comments</comments>
            </item>
            `
      })
      let sitemap = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mau Gowes Blog Feed - Maaaauuuu....</title>
                <description>Postingan blog dari Mau Gowes - Bahagia Bersama Sepeda</description>
                <link>https://maugowes.com</link>
                <category domain="https://maugowes.com">gowes/sepeda/cycling/roadbike/mtb/folding bike</category>
                <copyright>Copyright 2020 Yussan Media Group.</copyright>
                <lastBuildDate>${DaysJs().format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</lastBuildDate>
                <language>id-id</language>
                <image>
                    <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_100/v1555855650/maugowes/2019/mau_gowes.png</url>
                    <title>Mau Gowes - Maaaauuuu....</title>
                    <link>https://maugowes.com</link>
                    <description>Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                    <width>100</width>
                    <height>100</height>
                </image>
                <atom:link href="https://maugowes.com/feed/posts" rel="self" type="application/rss+xml"/>
                ${content}
            </channel>
        </rss>
        `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

// handler of /feed/events
module.exports.eventsFeed = (req, res) => {
  return eventModule.fetchEvents(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <item>
                <title>${n.title}</title>
                <description>${n.note}</description>
                <link>https://maugowes.com${n.link}</link>
                <guid>https://maugowes.com${n.link}</guid>
                <category domain="https://maugowes.com">video,mau gowes,sepeda,roadbike,mtb,foldingbike</category>
                <pubDate>${DaysJs(n.created_on * 1000).format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</pubDate>
                <comments>https://maugowes.com${n.link}#comments</comments>
            </item>
            `
      })
      let sitemap = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mau Gowes Videos Feeds - Maaaauuuu....</title>
                <description>Video dari Mau Gowes - Bahagia Bersama Sepeda</description>
                <link>https://maugowes.com</link>
                <category domain="https://maugowes.com">gowes/sepeda/cycling/roadbike/mtb/folding bike</category>
                <copyright>Copyright 2020 Yussan Media Group.</copyright>
                <lastBuildDate>${DaysJs().format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</lastBuildDate>
                <language>id-id</language>
                <image>
                    <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_100/v1555855650/maugowes/2019/mau_gowes.png</url>
                    <title>Mau Gowes - Maaaauuuu....</title>
                    <link>https://maugowes.com</link>
                    <description>Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                    <width>100</width>
                    <height>100</height>
                </image>
                <atom:link href="https://maugowes.com/feed/events" rel="self" type="application/rss+xml"/>
                ${content}
            </channel>
        </rss>
        `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

// handler of /feed/bikes
module.exports.bikesFeed = (req, res) => {
  return bikeModule.getBikes(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <item>
                <title>${n.name}</title>
                <description>Spesifikasi lengkap dari ${n.name}</description>
                <link>https://maugowes.com${n.link}</link>
                <guid>https://maugowes.com${n.link}</guid>
                <category domain="https://maugowes.com">road bike,folding bike,spek sepeda,urban bike</category>
                <pubDate>${DaysJs(n.created_on).format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</pubDate>
                <comments>https://maugowes.com${n.link}</comments>
            </item>
            `
      })
      let sitemap = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mau Gowes Bikes Feeds - Maaaauuuu....</title>
                <description>Kumpulan sepeda dari Mau Gowes - Bahagia Bersama Sepeda</description>
                <link>https://maugowes.com</link>
                <category domain="https://maugowes.com">road bike/folding bike/urban bike</category>
                <copyright>Copyright 2020 Yussan Media Group.</copyright>
                <lastBuildDate>${DaysJs().format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</lastBuildDate>
                <language>id-id</language>
                <image>
                    <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_100/v1555855650/maugowes/2019/mau_gowes.png</url>
                    <title>Mau Gowes - Maaaauuuu....</title>
                    <link>https://maugowes.com</link>
                    <description>Bikes Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                    <width>100</width>
                    <height>100</height>
                </image>
                <atom:link href="https://maugowes.com/feed/bikes" rel="self" type="application/rss+xml"/>
                ${content}
            </channel>
        </rss>
        `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}
