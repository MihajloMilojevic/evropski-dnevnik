const notFound = (req, res) => {
    res.status(404).send(`${req.url} ne postoji`);
}

module.exports = notFound;