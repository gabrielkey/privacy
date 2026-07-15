// ─────────────────────────────────────────────────────────────
//  GabrielKey — links de loja por aplicativo
//  Usado por store-modal.js para montar o seletor Android / iOS.
//
//  Para adicionar um novo app, adicione uma chave appX com os
//  links reais de cada loja. Use `null` (não string vazia) para
//  a plataforma ainda indisponível — o modal mostra automaticamente
//  "indisponível no momento" nesse caso.
// ─────────────────────────────────────────────────────────────

window.STORE_LINKS = {
  app1: {
    android: 'https://play.google.com/store/apps/details?id=br.com.gabrielkey.geografia',
    ios: null,
  },
};
