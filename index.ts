import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express, { Request, Response } from 'express'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.post('/api', async (req: Request, res: Response) => {
	const { email, name } = req.body

	if (!email || !name) {
		return res.status(400).json({
			message: 'Email and name are required',
		})
	}

	try {
		const createdRow = await prisma.waitList.create({
			data: {
				email,
				name,
			},
		})
		res.json(createdRow)
	} catch (error) {
		res.status(400).send({ message: error })
	}
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
