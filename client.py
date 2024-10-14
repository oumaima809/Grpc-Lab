import helloworld_pb2_grpc
import helloworld_pb2
import time
import grpc

def get_client_stream_requests():
    while True:
        name = input("Please enter a name (or nothing to stop chatting): ")

        if name == "":
            break

        hello_request = helloworld_pb2.HelloRequest(greeting = "Hello", name = name)
        yield hello_request
        time.sleep(1)

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        print("1. SayHello - ENG")
        print("2. DireBonjour - FR")
        print("3. مرحبا    - AR" )
        print("4. EXIT")
        rpc_call = input("Which rpc would you like to make: ")

        if rpc_call == "1":
            name = input("Would you like to write your name: ")
            hello_request = helloworld_pb2.HelloRequest(greeting = "Hi", name = name)
            hello_reply = stub.SayHello(hello_request)
            print("SayHello Response Received:")
            print(hello_reply)
            
        elif rpc_call == "2":
             name = input("pouvez vous écrire votre nom: ")
             hello_request = helloworld_pb2.HelloRequest(greeting = "Bonjour", name = name)
             hello_reply = stub.SayHello(hello_request)
             print("SayHello Response Received:")
             print(hello_reply)

  
        elif rpc_call == "3":
            name = input("أرجوك اكتب اسمك ")
            hello_request = helloworld_pb2.HelloRequest(greeting = "مرحبا ", name = name)
            hello_reply = stub.SayHello(hello_request)
            print("SayHello Response Received:")
            print(hello_reply)
            
        elif rpc_call == "4":
            print("goodbye")
            return
        
        run()

if __name__ == "__main__":
    run()