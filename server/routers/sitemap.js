const express = require("express")
const Router = express.Router()

const SitemapHandler = require("../handlers/sitemap")

// route of : /sitemap/post
Router.get("/posts", SitemapHandler.postsSitemap)

// route of : /sitemap/videos
Router.get("/videos", SitemapHandler.videosSitemap)

// route of : /sitemap/events
Router.get("/events", SitemapHandler.eventsSitemap)

// route of : /sitemap/menus
Router.get("/menus", SitemapHandler.menusSitemap)

// route of : /sitemap/bikes
Router.get("/bikes", SitemapHandler.bikesSitemap)

module.exports = Router
