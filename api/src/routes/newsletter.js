const {Router} = require('express');
const async = require("async")
const nodemailer = require("nodemailer");

const router = Router();

router.put("/suscribe", async (req, res)=>{
    const {email} = req.body;
	if (!email) return res.status(404).send({message: 'email is required'});
	let validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
	if (!validEmail) return res.send({error: true, message: 'email not valid'});
	try {
		let newsletter = await NewsLetter.findOne();
		if (!newsletter) newsletter = await new NewsLetter();
		if (newsletter.emails.includes(email)) {
			return res.send({message: 'already suscribed'});
		}
		newsletter.emails.push(email);
		await newsletter.save();

        var smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: "apikey",
                pass: "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" //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
            }
        });
        

		await transporter.sendMail({
			from: "alumnohenry09@gmail.com", // sender address
			to: user.email, // list of receivers
			subject: 'NewsLetter Subscribe', // Subject line
			html: `
            <h1>Congratulations</h1>
            <h2>You Are suscribed to the newsLetter of store!</h2>
                    `, // html body
		});
		res.send({message: 'suscribed to the newsLetter'});
	} catch (error) {
		res.status(500).send({message: error});
	}
});

router.put("/unsuscribe", async (req, res)=>{
    const {email} = req.body;
	if (!email) return res.status(400).send({message: "there isn't an email"});
	let validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
	if (!validEmail) return res.send({error: true, message: 'email not valid'});
	try {
		let newsletter = await NewsLetter.findOne();
		if (!newsletter) newsletter = await new NewsLetter();
		if (!newsletter.emails.includes(email)) {
			return res.send({message: 'email was already unSuscribed'});
		}
		newsletter.emails = newsletter.emails.filter((em) => em !== email);
		await newsletter.save();
		res.send({message: 'unSuscribed'});
	} catch (error) {
		res.status(500).send({message: error});
	}
});

module.exports = router;