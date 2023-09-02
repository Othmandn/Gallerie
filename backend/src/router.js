const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./public/tmp/" });

const router = express.Router();

// authentication import

const {
  verifyEmail,
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./auth");

// controllers import

const itemControllers = require("./controllers/itemControllers");
const artworkControllers = require("./controllers/artworkControllers");
const artistControllers = require("./controllers/artistControllers");
const userControllers = require("./controllers/userControllers");
const trendControllers = require("./controllers/trendControllers");
const techniqueControllers = require("./controllers/techniqueControllers");
const typeControllers = require("./controllers/typeControllers");
const artistTechniqueControllers = require("./controllers/artistTechniqueControllers");
const artTrendArtistControllers = require("./controllers/artTrendArtistControllers");
const uploadControllers = require("./controllers/uploadControllers");
const favoriteControllers = require("./controllers/favoriteControllers");
const entityControllers = require("./controllers/entityControllers");

// --- PUBLIC ROUTES --- //

// item routes (changes might occur here on the next pull request)

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);

// artist routes

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.get("/artists-artworks-url/:id", artistControllers.readArtworkUrl);
router.get("/arttrends-artists/:id", artistControllers.readArtTrendName);
router.get("/artists-techniques/:id", artistControllers.readTechniqueName);

// user routes

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/loggeduser/:id", userControllers.safeRead);
router.get("/findadmin", userControllers.browseAdmin);

// art_trend routes

router.get("/arttrends", trendControllers.browse);
router.get("/arttrends/:id", trendControllers.read);

// technique routes

router.get("/techniques", techniqueControllers.browse);
router.get("/techniques/:id", techniqueControllers.read);

// type routes

router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);

// artist_technique routes

router.get("/artists-techniques", artistTechniqueControllers.browse);

// art_trend routes

router.get("/arttrends-artists", artTrendArtistControllers.browse);
router.get("/findusers", userControllers.browseUsers);

// entity routes

router.get("/entities", entityControllers.browse);

// --- PASSWORD NEEDED ROUTE --- //

// user routes
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

// upload-users routes

router.post(
  "/upload-users",
  upload.single("myfile"),
  uploadControllers.uploadusers
);

// --- TOKEN NEEDED ROUTES --- //

router.use(verifyToken);

// artwork routes

router.post("/artworks", artworkControllers.create);
router.put("/artworks/:id", artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

// user routes

router.put("/users/:id", verifyEmail, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);
router.put("/users-password/:id", hashPassword, userControllers.edit);

// technique routes

router.post("/techniques", techniqueControllers.addTechnique);
router.delete("/techniques/:id", techniqueControllers.destroy);

// art_trend routes

router.post("/arttrends", trendControllers.addArtTrend);
router.delete("/arttrends/:id", trendControllers.destroy);

// artist_technique routes

router.post(
  "/artists-techniques",
  artistTechniqueControllers.addArtistTechnique
);
router.delete(
  "/artists-techniques",
  artistTechniqueControllers.destroyJointureTechnique
);

// art_trend_artists routes

router.post("/arttrends-artists", artTrendArtistControllers.addArtTrendArtist);
router.delete(
  "/arttrend-artist",
  artTrendArtistControllers.destroyJointureArtTrend
);

// artist routes

router.post("/artists", artistControllers.addArtist);
router.put("/artists/:id", artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

// type routes

router.post("/types", typeControllers.addType);
router.delete("/types/:id", typeControllers.destroy);

// upload-artworks routes

router.post(
  "/upload-artworks",
  upload.single("myfile"),
  uploadControllers.uploadartworks
);

// upload-artists routes

router.post(
  "/upload-artists",
  upload.single("myfile"),
  uploadControllers.uploadartists
);

// upload routes

router.delete("/upload", uploadControllers.destroy);
router.delete("/upload/group", uploadControllers.destroyGroup);

// favorite artwork routes

router.post(
  "/user/:userId/artwork/:artworkId/favorite",
  favoriteControllers.addFavorite
);
router.delete(
  "/user/:userId/artwork/:artworkId/favorite",
  favoriteControllers.deleteFavorite
);

router.get(
  "/user/:userId/artworks/favorites",
  favoriteControllers.browseFavorites
);
router.get("/user/:userId/artwork/:artworkId", favoriteControllers.isFavorite);

module.exports = router;
