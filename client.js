const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('./protos/helloworld.proto', {});
const helloworld = grpc.loadPackageDefinition(packageDefinition).greet;

// Create a client instance
const client = new helloworld.Greeter('localhost:50051', grpc.credentials.createInsecure());

function getInput(prompt) {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(prompt, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

async function run() {
    while (true) {
      // Display the menu only once at the start of the loop
      console.log("1. SayHello - ENG");
      console.log("2. DireBonjour - FR");
      console.log("3. مرحبا    - AR");
      console.log("4. EXIT");
      
      const rpcCall = await getInput("Which rpc would you like to make: ");
      
      if (rpcCall === "1") {
        const name = await getInput("Would you like to write your name: ");
        const request = { greeting: "Hi", name: name };
        
        // Handle response before showing the menu again
        await new Promise((resolve) => {
          client.SayHello(request, (error, response) => {
            if (error) {
              console.error("Error:", error);
            } else {
              console.log("SayHello Response Received:", response.message);
            }
            resolve(); // Resolve after response to continue the loop
          });
        });
        
      } else if (rpcCall === "2") {
        const name = await getInput("pouvez vous écrire votre nom: ");
        const request = { greeting: "Bonjour", name: name };
  
        // Handle response before showing the menu again
        await new Promise((resolve) => {
          client.SayHello(request, (error, response) => {
            if (error) {
              console.error("Error:", error);
            } else {
              console.log("SayHello Response Received:", response.message);
            }
            resolve(); // Resolve after response to continue the loop
          });
        });
        
      } else if (rpcCall === "3") {
        const name = await getInput("أرجوك اكتب اسمك ");
        const request = { greeting: "مرحبا", name: name };
  
        // Handle response before showing the menu again
        await new Promise((resolve) => {
          client.SayHello(request, (error, response) => {
            if (error) {
              console.error("Error:", error);
            } else {
              console.log("SayHello Response Received:", response.message);
            }
            resolve(); // Resolve after response to continue the loop
          });
        });
  
      } else if (rpcCall === "4") {
        console.log("Goodbye!");
        break; // Exit the loop
      } else {
        console.log("Invalid choice, please try again.");
      }
    }
  }
  
  run();
  
