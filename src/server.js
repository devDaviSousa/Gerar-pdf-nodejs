const { response } = require('express');
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const express = require('express');

const app = express();

const passengers = [
  {
    name: "Davi",
    flightNumber: 1234,
    time: "18h00"
  },
  {
    name: "Paulo",
    flightNumber: 2020,
    time: "17h00"
  },
]

app.get('/', (request, response) => {
  const filePath = path.join(__dirname, "/print.ejs");

  ejs.renderFile(filePath, { passengers }, (err, html) => {

    if (err) {
      return response.send('Erro na leitura do arquivo')
    }
    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        heigth: "20mm"
      },
      footer: {
        heigth: "20mm"
      }
    }
    //criar o pdf
    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return response.send("erro ao gerar pdf");
      }
      //enviar para o navegador
      return response.send("deu certo")
    })

  })

})

app.listen(3000);