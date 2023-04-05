const lista = [];

function dodaj() {
  const imePrezime = document.getElementById("imePrezime").value;
  const razlogDolaska = document.getElementById("razlogDolaska").value;
  const vrijeme = new Date().toLocaleString();
  const unos = `${imePrezime} - ${razlogDolaska} - ${vrijeme}`;

  lista.push(unos);

  render();

  // Očisti input polja nakon unosa
  document.getElementById("imePrezime").value = "";
  document.getElementById("razlogDolaska").value = "";
}

function render() {
  const listaDiv = document.getElementById("lista");
  listaDiv.innerHTML = "";

  lista.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    listaDiv.appendChild(li);
  });
}

function ocisti() {
  // Alert prije brisanja
  if (confirm("Jeste li sigurni da želite obrisati sve unose?") == true) {
    lista.length = 0;
    render();
  } else {
    return;
  }
}

function preuzmi(format) {
  let content = "";
  lista.forEach((item) => {
    content += item + "\n";
  });

  if (format === "txt") {
    const txtFile = new Blob([content], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(txtFile);
    downloadLink.download = "lista.txt";
    downloadLink.click();
  } else if (format === "pdf") {
    const pdfDoc = new jsPDF();
    pdfDoc.text(content, 10, 10);
    pdfDoc.save("lista.pdf");
  }
}