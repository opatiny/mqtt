'use strict';

const mqtt = require('mqtt');

const server = 'mqtt://localhost:1883';
const topic = 'chat/nodejs';

const client = mqtt.connect(server);

return 42;
