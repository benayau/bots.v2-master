// ==UserScript==
// @name         free cellcraft.io bots!
// @namespace    free cellcraft.io bots!
// @version      1
// @description  l3
// @author       l3mpik
// @match        *.cellcraft.io/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

var html = "<div id='wrap' style='font-size: 2em; color: #ff0000; position: fixed; top: 10%;left:5%;'></div>"

document.body.innerHTML += html;

window.client = {
    x: 0,
    y: 0,
    server: "",
    rageMode: false,
    randomSkin: false,
    ai: false,
    bots: 0
}

window.socket = io.connect("ws://127.0.0.1:1000");


WebSocket.prototype._send = WebSocket.prototype.send
WebSocket.prototype.send = function (data) {
    this._send(data);
    var msg = new DataView(data);
    if (msg.byteLength === 13) {
        if (msg.getUint8(0, true) === 16) {
            window.client.x = msg.getInt32(1, true);
            window.client.y = msg.getInt32(5, true)
        }
    }
    window.client.server = this.url;
};

/**
 * 
 * Binds:
 * 
 * / - change bot name
 * E - split
 * K - rush b mode
 * M - random skins
 * O - add bot id to name
 * 
 */

document.onkeydown = (e) => {
    switch (e.key) {
        case 'e':

            window.socket.emit('action', 'split');
            break;

        case 'x':

            if (window.client.ai) {

                window.client.ai = false;

            } else {

                window.client.ai = true;
            }
            break;

        case 'k':

            if (window.client.rageMode) {

                window.client.rageMode = false;
                window.socket.emit('action', 'rage', false);

            } else {

                window.client.rageMode = true;
                window.socket.emit('action', 'rage', true);
            }
            break;
        case 'o':

            if (window.client.botId) {

                window.client.botId = false;
                window.socket.emit('action', 'botid', true);
            } else {

                window.client.botId = true;
                window.socket.emit('action', 'botid', false);
            }
            break;
        case 'm':

            if (window.client.randomSkin) {

                window.client.randomSkin = false;
                window.socket.emit('action', 'skin', true);

            } else {

                window.client.randomSkin = true;
                window.socket.emit('action', 'skin', false);
            }
            break;
        case '/':
            var name = prompt("Bots Name?");

            window.socket.emit('action', 'name', name);
            break;

        case '.':
            window.socket.emit('action', 'spawn', "force");
            break;

    }
}
setInterval(() => {

    if (window.client.server != "" && window.socket !== null) {

        window.socket.emit('data', window.client);
    }

}, 100);

var test = false;

socket.on('info', (type, data) => {


    switch (type) {

        case 'bots':

            document.getElementById("wrap").innerHTML = "Bots: " + data;
            break;
    }
});