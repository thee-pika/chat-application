import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import prisma from "@repo/db";
import { config } from "dotenv";
config();

console.log("env", process.env.CA_CERT_PATH);

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!], 
  ssl: {
    ca: [
      fs.readFileSync(
        path.resolve(__dirname, process.env.CA_CERT_PATH!),
        "utf-8"
      ),
    ],
  },
  sasl: {
    username: process.env.KAFKA_USERNAME!, 
    mechanism: process.env.KAFKA_MECHANISM as any,
    password: process.env.KAFKA_PASSWORD!,
  },
});

let producer: Producer | null = null;

const createPrdoucer = async () => {
  if (producer) {
    return producer;
  }
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
};

export const produceMessage = async (message: string, channel: string) => {
  const producer = await createPrdoucer();

  await producer.send({
    messages: [{ key: `messages-${Date.now()}`, value: message}],
    topic: channel,
  });

  return true;
};

export const startMessageConsumer = (channel:string) => {
  const consumer = kafka.consumer({ groupId: "default" });
  consumer.connect();
  consumer.subscribe({ topic: channel, fromBeginning: true });

  consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (message.value) {
        try {
          const messageValue = message.value.toString("utf-8");

          await prisma.message.create({
            data: {
              channel,
              message: messageValue,
            },
          });

        } catch (error) {
          console.log("Something is wrong in db");
          pause();
          setTimeout(() => {
            consumer.resume([{ topic: channel }]);
          }, 60 * 1000);
        }
      }
    },
  });
};
