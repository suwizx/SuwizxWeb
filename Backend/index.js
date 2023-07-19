const PrismaClient = require('@prisma/client')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require("multer")
const fs = require('fs');
const path = require('path');

const app = express();
const prisma = new PrismaClient.PrismaClient();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
const upload = multer({ storage: storage });

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'ไปดูที่ frontend สิฟะจะมาดูใน api เพื่ออออ',
        url : "https://suwizx.dev"
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
    const imageUrl = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
    const response = {
      imageUrl: imageUrl
    };
    res.json(response);
  })
  
  app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'uploads', filename)
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ error: 'Image not found' })
        return;
      }
      res.sendFile(imagePath);
    });
  })

app.get('/sidebar', async (req, res) => {
    const sidebar = await prisma.myData.findMany({
        where: {
            NOT: [
                {field : 'displayName'},
                {field : 'photoURL'},
            ]
        }});
    res.json(sidebar);}
);

app.get('/sidebar/:query', async (req, res) => {
    const query = req.params.query;
    const sidebar = await prisma.myData.findFirst({
        where: { field : query }
    })
    res.json(sidebar);
});

app.get('/socials', async (req, res) => {
    const socials = await prisma.socials.findMany({
        where: {
            NOT: [
                {name : 'mail'}
            ]
        }
    })
    res.json(socials)
});

app.get('/socials/:query', async (req, res) => {
    const query = req.params.query;
    const socials = await prisma.socials.findFirst({
        where: { name : query }
    })
    res.json(socials);;
});

app.get('/educations', async (req, res) => {
    const educations = await prisma.educations.findMany();
    res.json(educations);
});

app.get('/skills', async (req, res) => {
    const skills = await prisma.skills.findMany();
    res.json(skills);
});

app.get('/projects', async (req, res) => {
    const project = await prisma.projects.findMany();
    res.json(project);
});

app.get('/activities', async (req, res) => {
    const activities = await prisma.activities.findMany();
    res.json(activities);
});

app.get('/certificates', async (req, res) => {
    const certificates = await prisma.certificates.findMany();
    res.json(certificates);
});

app.listen(8000, () => {    
    console.log('Server is running at http://localhost:8000');
})
