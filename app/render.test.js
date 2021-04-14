import { window, document } from '../src/dom.js';
import { decodeDataURL } from '../src/dom-handlers';
import * as fs from 'fs';
import * as path from 'path';
import * as ol from 'ol';
import * as olproj from 'ol/proj';
import * as olsource from 'ol/source';
import * as ollayer from 'ol/layer';

(async () => {
    const mapElement = document.createElement('div');
    document.body.appendChild(mapElement);
    mapElement.setAttribute('id', 'map');
    mapElement.style.height = '500px';
    mapElement.style.width = '500px';

    await new Promise((resolve, reject) => {
        const layer = new ollayer.Tile({
            source: new olsource.OSM()
        });
        const map = new ol.Map({
            target: 'map',
            layers: [
                layer
            ],
            view: new ol.View({
                center: olproj.fromLonLat([37.41, 8.82]),
                zoom: 4
            })
        });

        const tm = setTimeout(reject, 20 * 1000);
        let image;
        layer.on('postrender', (e) => {
            console.log('received image');
            image = e.context.canvas.toDataURL();
        });
        map.once('rendercomplete', () => {
            console.log('render complete, writing out.png');
            clearTimeout(tm);
            const raw = decodeDataURL(image);
            fs.writeFileSync('out.png', raw);
            resolve();
        });
        console.log('rendering');
    });
})();
