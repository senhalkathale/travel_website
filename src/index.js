const express = require("express")
const path = require("path")
const app = express()
//const hbs = require("hbs")
//below code is for connection of db
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())
// takaking folder for hbs
const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);
app.set('view engine', 'hbs')


// as we have given file folder name as tempelates and by default it is views so change it
app.set('views', tempelatePath)
app.use(express.static(publicPath))
// this will redirect to home
app.use(express.urlencoded({ extended: false }))


// hbs.registerPartials(partialPath)

// this is for home page 
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/gallery', (req, res) => {
    res.render('gallery')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/package', (req, res) => {
    res.render('package');
});

app.post('/package',async(req,res) =>{
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name })

        if (existingUser) {
            res.send("User details already exist")
        } else {
            await LogInCollection.create(data)
            //res.status(201).render("home", { naming: req.body.name })
            res.status(201).send("Congratulations, you are logged in!");

                // Redirect to the package page after a short delay
                setTimeout(() => {
                    res.redirect('/package');
                }, 2000); 
        }
    } catch (error) {
        res.send("Error processing the request")
    }
})






app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name })

        if (existingUser) {
            res.send("User details already exist")
        } else {
            await LogInCollection.create(data)
            //res.status(201).render("home", { naming: req.body.name })
            res.status(201).send("Congratulations, you are logged in!");

                // Redirect to the package page after a short delay
                setTimeout(() => {
                    res.redirect('/package');
                }, 2000); 
        }
    } catch (error) {
        res.send("Error processing the request")
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name })

        if (user) {
            if (user.password === req.body.password) {
                //res.status(201).render("package", { naming: `${req.body.name}` })
                res.status(201).send("Congratulations, you are logged in!");

                // Redirect to the package page after a short delay
                setTimeout(() => {
                    res.redirect('/package');
                }, 2000); 
            } else {
                res.send("Incorrect password")
            }
        } else {
            res.send("User not found")
        }
    } catch (error) {
        res.send("Error processing the request")
    }
})


app.listen(port, () => {
    console.log('port connected');
})