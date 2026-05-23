const express = require("express");
const cors = require("cors");
const path = require("path");
const contract = require("./contract");

const app = express();

app.use(cors());
app.use(express.json());

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (require("fs").existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.use((req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

// REGISTER PRODUCT
app.post("/register", async (req, res) => {

    try {

        const {
            name,
            origin,
            quantity
        } = req.body;

        const tx = await contract.registerProduct(
            name,
            origin,
            quantity
        );

        const receipt = await tx.wait();
        const event = receipt.events?.find((item) => item.event === "ProductRegistered");
        const productId = event?.args?.id?.toString();

        res.json({
            message: "Product Registered",
            productId,
        });

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// GET PRODUCT
app.get("/product/:id", async (req, res) => {

    try {

        const product =
        await contract.getProduct(
            req.params.id
        );

        res.json({
            id: product[0].toString(),
            name: product[1],
            origin: product[2],
            quantity: product[3].toString(),
            owner: product[4]
        });

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// TRANSFER OWNERSHIP
app.post("/transfer", async (req, res) => {

    try {

        const {
            id,
            newOwner
        } = req.body;

        const tx =
        await contract.transferOwnership(
            id,
            newOwner
        );

        await tx.wait();

        res.json({
            message:
            "Ownership Transferred"
        });

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});


app.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );
});