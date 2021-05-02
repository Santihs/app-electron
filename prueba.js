const jsPDF = require('jspdf').jsPDF
const { encodeFromFile } = require('image-data-uri');

encodeFromFile('imag.JPEG')
    .then(res => {
        encodeFromFile('a.PNG')
        .then( res2 => {
            const doc = new jsPDF();
    
            doc.text("Hello worlds", 10, 10);
            doc.rect(10, 10, 150, 200)
            doc.rect(10.5, 10.5, 149, 199)
            doc.addImage(res, 'JPEG', 15, 15, 50, 50)
            doc.addImage(res2, 'JPEG', 65, 15, 75, 50)
            doc.save('prueba.pdf')
            doc.close()

        })
    })


