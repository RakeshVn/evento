const controller = module.exports
const formidable = require('formidable');
const path = require('path');
const mv = require('mv');

const eventModel = require('../../models/event.model')

controller.create = async function (req, res) {

    try {

        const { body } = req
        const regNumber = Math.floor(100000 + Math.random() * 900000)

        const eventData = await new eventModel({ ...body, regNumber }).save()

        return res.status(200).send({ message: 'success', data: eventData })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.upload = async function (req, res) {

    try {

        const { params } = req
        const form = new formidable.IncomingForm();
        const extensionRegex = /(?:\.([^.]+))?$/;

        form.parse(req, async (err, fields, files) => {

            const file = files.file
            const destPath = path.join(`../../${Date.now()}.${extensionRegex.exec(files.file.name)[1]}`)

            mv(file.path, destPath, async function (error) {

                if (error) {
                    console.error(error)
                }

                await eventModel.findOneAndUpdate({ _id: params.id }, { $set: { idCard: destPath } })

                return res.status(200).send({ message: 'success' })

            });


        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}