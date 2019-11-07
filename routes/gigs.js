const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gigs");
const Op = Sequelize.Op;

// router.get('/', (req, res) => res.send('GIGS'));
// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs =>
      res.render("gigs", {
        gigs
      })
    )
    .catch(e => console.error(e))
);

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate fields`
  if (!technologies) {
    errors.push({ text: "Please add a title" });
  }
  if (!title) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add some description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ",");

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
  }
});

// Search for gigs
router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(e => console.error(e));
});

module.exports = router;
