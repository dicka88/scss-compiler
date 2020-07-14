class Index {
  constructor() {
    // console.log("hello");
  }

  index(req, res) {
    res.send("Hello");
  }
}

module.exports = new Index();