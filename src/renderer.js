/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
//import '../semantic/dist/semantic.min.css';
//import '../semantic/dist/components/icon.min.css';
//require('semantic-ui-icons/icon.css');
//import 'a940d584750708f5435ce2c523498ddb.woff';
require('fomantic-ui/dist/semantic.css');
//require('fomantic-ui/dist/components/icon.css');
//require('semantic-ui-icon');
async function getData(url) {
    const { ipcRenderer } = require('electron');
    var rsp = await ipcRenderer.invoke('load-webpage', url);
    if (rsp) {
        var x = document.getElementById("bottom-nav-bar");
        x.style.display = "block";
    }
    
    
}

function navigateApp(direction) {
    const { ipcRenderer } = require('electron');
    ipcRenderer.invoke('nav-app', direction);
}

document.querySelector('#btnFirst').addEventListener('click', () => {
    getData('https://login.i-ready.com/')
})

document.querySelector('#btnSecond').addEventListener('click', () => {
    getData('https://app.lomdei.net/login')
})

document.querySelector('#btnThird').addEventListener('click', () => {
    getData('https://www.ixl.com/signin')
})

document.querySelector('#btnFourth').addEventListener('click', () => {
    getData('https://yby-biasyehudah.myschoolsplp.com/')
})

document.querySelector('#nav-back').addEventListener('click', () => {
    navigateApp('back')
})

document.querySelector('#nav-home').addEventListener('click', () => {
    navigateApp('home')
    var x = document.getElementById("bottom-nav-bar");
    x.style.display = "none";
})
