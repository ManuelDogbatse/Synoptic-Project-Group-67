document.getElementById("download").addEventListener("click", generatePDF);

const generatePDF = function()
{
  
    html2pdf()
    .from(document.body)
    .save();
}