import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}))
app.use(clerkMiddleware())

const PORT = process.env.PORT || 4000

app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "API Working."
    })
})
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(4000, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})

