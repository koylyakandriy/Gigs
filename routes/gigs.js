const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gigs");

// router.get('/', (req, res) => res.send('GIGS'));
// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs
      });
    })
    .catch(e => console.error(e))
);

// Display add gig form
router.get("/add", (req, res) => res.render('add'));

// Add a gig
router.post("/add", (req, res) => {
  const data = {
    title: "Simple Wordpress website",
    technologies: "php, wordpress, html, css",
    budget: "$1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
      " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus. Maecenas accumsan lacus vel facilisis. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Amet porttitor eget dolor morbi",
    contact_email: "test1@gmail.com"
  };

  let { title, technologies, budget, description, contact_email } = data;

  //	Insert into table
  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
    .then(gig => res.redirect("/gigs"))
    .catch(e => console.error(e));
});
module.exports = router;
