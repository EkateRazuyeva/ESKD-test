import express, { Request, Response } from "express";
import cors from "cors";
import { setupDB } from "./setup";

const PORT = 5000;

async function startServer() {
    const db = await setupDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/", (_req: Request, res: Response) => {
        res.send("✅ Server is running");
    });

    app.post("/api/messages", async (req: Request, res: Response) => {
        const { name, phone, message } = req.body;

        if (typeof name !== "string" || name.trim().length < 2) {
            return res.status(400).json({ error: "Имя должно содержать минимум 2 символа" });
        }

        const phoneRegex = /^(\+375|80)\d{7,9}$/;
        if (typeof phone !== "string" || !phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Телефон должен быть в формате +375... или 80..." });
        }

        if (typeof message !== "string" || message.trim().length < 2) {
            return res.status(400).json({ error: "Сообщение должно содержать минимум 2 символа" });
        }

        try {
            await db.run(
                `INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)`,
                [name, phone, message]
            );

            return res.status(201).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

startServer().catch(err => {
    console.error("Ошибка при запуске сервера:", err);
});
