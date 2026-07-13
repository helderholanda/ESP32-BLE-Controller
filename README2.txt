#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>


// ===============================
// CONFIGURAÇÃO BLE
// ===============================


#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"

#define CHARACTERISTIC_UUID "abcd1234-5678-1234-5678-abcdef123456"



// ===============================
// LED
// ===============================


#define LED_PIN 2



BLECharacteristic *pCharacteristic;

bool deviceConnected = false;



// ===============================
// PROTÓTIPOS DAS FUNÇÕES
// ===============================


void fastBlink();

void morseSOS();

void blink(int tempo, int vezes);




// ===============================
// CONTROLE DE CONEXÃO
// ===============================


class MyServerCallbacks : public BLEServerCallbacks {


    void onConnect(BLEServer* pServer) {


        deviceConnected = true;


        Serial.println(
            "Celular conectado BLE"
        );


    }



    void onDisconnect(BLEServer* pServer) {


        deviceConnected = false;


        Serial.println(
            "Celular desconectado"
        );


        delay(500);


        pServer->startAdvertising();


    }


};






// ===============================
// RECEBER COMANDOS
// ===============================


class MyCallbacks : public BLECharacteristicCallbacks {


    void onWrite(BLECharacteristic *pCharacteristic) {


        String command = pCharacteristic->getValue();



        Serial.print(
            "Comando recebido: "
        );


        Serial.println(command);





        if(command == "LED_ON"){


            digitalWrite(
                LED_PIN,
                HIGH
            );


        }



        else if(command == "LED_OFF"){


            digitalWrite(
                LED_PIN,
                LOW
            );


        }



        else if(command == "FAST_BLINK"){


            fastBlink();


        }



        else if(command == "MORSE_SOS"){


            morseSOS();


        }


    }


};








// ===============================
// EFEITOS DO LED
// ===============================



void fastBlink(){



    for(int i = 0; i < 10; i++){



        digitalWrite(
            LED_PIN,
            HIGH
        );


        delay(100);



        digitalWrite(
            LED_PIN,
            LOW
        );


        delay(100);



    }


}






void morseSOS(){



    // S (...)


    blink(
        200,
        3
    );


    delay(300);




    // O (---)


    blink(
        600,
        3
    );


    delay(300);




    // S (...)


    blink(
        200,
        3
    );



}







void blink(int tempo, int vezes){



    for(int i = 0; i < vezes; i++){



        digitalWrite(
            LED_PIN,
            HIGH
        );


        delay(tempo);



        digitalWrite(
            LED_PIN,
            LOW
        );


        delay(tempo);



    }


}








// ===============================
// SETUP
// ===============================



void setup(){



    Serial.begin(
        115200
    );



    pinMode(
        LED_PIN,
        OUTPUT
    );



    digitalWrite(
        LED_PIN,
        LOW
    );







    BLEDevice::init(
        "ESP32 BLE Controller"
    );




    BLEServer *pServer =
        BLEDevice::createServer();




    pServer->setCallbacks(
        new MyServerCallbacks()
    );







    BLEService *pService =
        pServer->createService(
            SERVICE_UUID
        );







    pCharacteristic =
        pService->createCharacteristic(

            CHARACTERISTIC_UUID,

            BLECharacteristic::PROPERTY_WRITE |

            BLECharacteristic::PROPERTY_WRITE_NR

        );







    pCharacteristic->setCallbacks(
        new MyCallbacks()
    );







    pService->start();







    BLEAdvertising *pAdvertising =
        BLEDevice::getAdvertising();






    pAdvertising->addServiceUUID(
        SERVICE_UUID
    );



    pAdvertising->setScanResponse(
        true
    );



    pAdvertising->setMinPreferred(
        0x06
    );



    pAdvertising->setMinPreferred(
        0x12
    );







    BLEDevice::startAdvertising();







    Serial.println(
        "=============================="
    );


    Serial.println(
        "ESP32 BLE iniciado"
    );


    Serial.println(
        "Aguardando conexão..."
    );


    Serial.println(
        "Nome: ESP32 BLE Controller"
    );


    Serial.println(
        "=============================="
    );



}








// ===============================
// LOOP
// ===============================



void loop(){


    delay(1000);


}
