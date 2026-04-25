/*
RenderLab SaaS
Fluxo principal de navegação e persistência
*/

const RenderLab = {

  saveProductionData(data) {
    localStorage.setItem(
      "renderlab_production",
      JSON.stringify(data)
    );
  },

  getProductionData() {
    const data = localStorage.getItem(
      "renderlab_production"
    );

    return data ? JSON.parse(data) : null;
  },

  clearProductionData() {
    localStorage.removeItem(
      "renderlab_production"
    );
  },

  startProduction() {
    const evento = document.getElementById("evento")?.value || "";
    const produto = document.getElementById("produto")?.value || "";
    const tipo = document.getElementById("tipo")?.value || "";
    const info = document.getElementById("info")?.value || "";

    if (!evento || !produto) {
      this.setStatus(
        "Preencha Nome do Evento e Produto."
      );
      return;
    }

    const data = {
      id: Date.now(),
      nome_evento: evento,
      produto: produto,
      tipo_formatura: tipo,
      info_evento: info,
      status: "processing",
      created_at: new Date().toISOString()
    };

    this.saveProductionData(data);

    this.setStatus(
      "Solicitação enviada com sucesso..."
    );

    setTimeout(() => {
      window.location.href = "status.html";
    }, 1200);
  },

  updateStatusPage() {
    const data = this.getProductionData();

    if (!data) return;

    const productBox = document.querySelector(
      "#produto-box"
    );

    if (productBox) {
      productBox.innerText = data.produto;
    }
  },

  finishProduction() {
    const data = this.getProductionData();

    if (!data) return;

    data.status = "done";
    data.video_link =
      "https://drive.google.com/";
    data.convite_link =
      "https://drive.google.com/";

    this.saveProductionData(data);

    window.location.href = "entrega.html";
  },

  updateDeliveryPage() {
    const data = this.getProductionData();

    if (!data) return;

    const videoLink = document.getElementById(
      "video-link"
    );

    const conviteLink = document.getElementById(
      "convite-link"
    );

    if (videoLink) {
      videoLink.href = data.video_link || "#";
    }

    if (conviteLink) {
      conviteLink.href = data.convite_link || "#";
    }
  },

  setStatus(message) {
    const status = document.getElementById(
      "status"
    );

    if (status) {
      status.innerText = message;
    }
  }

};


/*
AUTO EXEC
Detecta página atual
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const page =
      window.location.pathname;

    if (page.includes("status.html")) {
      RenderLab.updateStatusPage();
    }

    if (page.includes("entrega.html")) {
      RenderLab.updateDeliveryPage();
    }

  }
);
