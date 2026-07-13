const CACHE_NAME = "esp32-ble-controller-v2";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./manifest.json",
    "./sw.js",

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];



// Instala o Service Worker

self.addEventListener("install", (event) => {


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then((cache)=>{

            return cache.addAll(FILES_TO_CACHE);

        })

    );


    self.skipWaiting();


});





// Ativa e remove caches antigos

self.addEventListener("activate", (event)=>{


    event.waitUntil(

        caches.keys()

        .then((cacheNames)=>{


            return Promise.all(

                cacheNames.map((cache)=>{


                    if(cache !== CACHE_NAME){

                        return caches.delete(cache);

                    }


                })

            );


        })

    );


    self.clients.claim();


});





// Controle das requisições

self.addEventListener("fetch",(event)=>{


    event.respondWith(


        caches.match(event.request)

        .then((response)=>{


            return response || fetch(event.request);


        })


    );


});
