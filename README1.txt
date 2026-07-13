# ESP32 BLE Controller

## Visão Geral

O **ESP32 BLE Controller** é um aplicativo PWA (Progressive Web App) que permite controlar um ESP32-WROOM através de Bluetooth Low Energy (BLE), sem a necessidade de instalar aplicativos pela Play Store.

O aplicativo funciona diretamente pelo navegador Google Chrome e, após instalado, pode ser utilizado como um aplicativo comum no celular.

---

# O que você vai precisar

## Hardware

* ESP32-WROOM-32
* Cabo USB
* Computador
* Celular Android com Bluetooth
* Conexão com a Internet (apenas para instalar o aplicativo)

---

## Software

* Arduino IDE
* Driver da placa ESP32
* Biblioteca BLE do ESP32
* Google Chrome para Android

---

# 1. Acessando o aplicativo

Abra o navegador **Google Chrome** no celular.

Acesse o endereço do projeto hospedado no GitHub Pages.

https://helderholanda.github.io/ESP32-BLE-Controller/

---

# 2. Instalando o aplicativo

Ao abrir o site pela primeira vez, o navegador reconhecerá que ele é um PWA.

Caso o botão **"Instalar Aplicativo"** apareça na tela, basta tocá-lo.

Caso não apareça:

1. Abra o menu do Chrome (⋮).
2. Escolha **Instalar aplicativo** ou **Adicionar à tela inicial**.
3. Confirme a instalação.

Após esse processo, o aplicativo ficará instalado como qualquer outro aplicativo do Android.

Não será mais necessário abrir o navegador para utilizá-lo.

---

# 3. Preparando o ESP32

Conecte o ESP32 ao computador utilizando um cabo USB.

Abra a Arduino IDE.

---

# 4. Instalando o suporte para ESP32

Caso seja a primeira utilização da placa:

Abra:

```
Arquivo
→ Preferências
```

No campo **URLs adicionais para Gerenciadores de Placas**, adicione:

```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

Depois:

```
Ferramentas
→ Placa
→ Gerenciador de Placas
```

Pesquise por:

```
esp32
```

Instale o pacote oficial da Espressif.

---

# 5. Selecionando a placa

Na Arduino IDE selecione:

```
Ferramentas
→ Placa
→ ESP32 Arduino
→ ESP32 Dev Module
```

Essa configuração é compatível com a maioria das placas ESP32-WROOM-32.

---

# 6. Selecionando a porta

Conecte a placa.

Depois selecione:

```
Ferramentas
→ Porta
```

Escolha a porta correspondente ao ESP32.

---

# 7. Abrindo o firmware

Abra o arquivo do firmware do projeto.

O código completo encontra-se no **README2** deste repositório.

Copie o código para a Arduino IDE.

---

# 8. Compilando

Clique em:

```
Verificar
```

ou pressione:

```
Ctrl + R
```

Se tudo estiver correto, a compilação será concluída sem erros.

---

# 9. Gravando no ESP32

Clique em:

```
Enviar
```

ou pressione:

```
Ctrl + U
```

Aguarde o término da gravação.

---

# 10. Abrindo o Monitor Serial

Abra:

```
Ferramentas
→ Monitor Serial
```

Configure:

```
115200 baud
```

Se tudo estiver correto aparecerá algo semelhante a:

```
==============================
ESP32 BLE iniciado
Aguardando conexão...
Nome: ESP32 BLE Controller
==============================
```

Isso indica que o Bluetooth BLE já está ativo.

---

# 11. Conectando o aplicativo

Abra o aplicativo instalado no celular.

Toque em:

```
🔍 Procurar Dispositivo
```

Será exibida a lista de dispositivos BLE encontrados.

Selecione:

```
ESP32 BLE Controller
```

Após alguns segundos o aplicativo informará que a conexão foi realizada.

---

# 12. Testando

Utilize os botões do aplicativo.

Cada botão envia um comando BLE ao ESP32.

Exemplo:

```
💡 Ligar LED
```

envia

```
LED_ON
```

O ESP32 recebe esse comando e executa a função correspondente.

Da mesma forma:

```
🌙 Desligar LED
```

envia

```
LED_OFF
```

```
⚡ Piscar Rápido
```

envia

```
FAST_BLINK
```

```
📡 Morse SOS
```

envia

```
MORSE_SOS
```

---

# Como o projeto funciona

O aplicativo nunca controla diretamente o hardware.

Ele apenas envia um texto através do Bluetooth BLE.

Fluxo de funcionamento:

```
Aplicativo

        │

Bluetooth BLE

        │

        ▼

ESP32 recebe um comando

        │

        ▼

O firmware identifica o comando

        │

        ▼

Executa a função correspondente
```

Toda a lógica do projeto está concentrada no firmware do ESP32.

Isso permite substituir facilmente qualquer função sem alterar a estrutura do aplicativo.

---

# Estrutura do projeto

```
ESP32-BLE-Controller/

│

├── index.html

├── manifest.json

├── sw.js

├── README1.md

├── README2.md

└── icons/
```

---

# Próximo passo

Após concluir a instalação e verificar que a comunicação está funcionando, consulte o **README2**, onde está disponível o firmware completo do ESP32 e instruções para personalizar o comportamento dos botões, criar novas funções e adaptar o projeto para controlar relés, motores, servos, sensores e outros dispositivos.
