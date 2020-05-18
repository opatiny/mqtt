'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mqtt = require('mqtt');

const user1 = process.argv[2];
const user2 = process.argv[3];
const pubTopic = `chat/${process.argv[2]}`;
const subTopic = `chat/${process.argv[3]}`;
const broker = process.argv[4] || 'mqtt://localhost:1883';

// console.log(pubTopic, subTopic, broker);

const client = mqtt.connect(broker);

client.on('connect', () => {
  client.subscribe(subTopic, (err) => {
    if (err) {
      rl.write(err);
    }
  });
});

rl.on('line', (input) => {
  let line = input.toString();
  if (line.length === 0) {
    rl.question(`${user1}: `, (message) => {
      client.publish(pubTopic, message);
    });
  }
});

client.on('message', function (topic, message) {
  if (topic === subTopic) {
    // message is Buffer
    let answer = message.toString();
    rl.write(`${user2}: ${answer}\n`);
  }
});
