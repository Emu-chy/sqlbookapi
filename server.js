import express from "express";
import mysql from "mysql";
const app = express();
const port = 5000;

app.use(express.json());
// sql data base connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    // password: "root",
    database: "test",
});

app.get("/", (req, res) => {
    const query = "SELECT * FROM test.books";
    db.query(query, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ message: data });
    });
});

app.post("/add", (req, res) => {
    const { title, desc } = req.body;
    // one way
    // const query = "INSERT INTO `test`.`books` (`id`, `title`, `desc`) VALUES (title, desc)";

    // another way

    const query = "INSERT INTO books (`title`, `desc`) VALUES(?)";
    const value = [title, desc];

    db.query(query, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("data created");
    });
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    const query = "UPDATE books SET `title` = ?, `desc` = ? WHERE id = ?";

    db.query(query, [title, desc, id], (err, data) => {
        if (err) return res.json(err);
        return res.json("data updated");
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM books WHERE id = ?";
    db.query(query, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("data deleted");
    });
});

app.listen(port, () => {
    console.log("server on ", port);
});
