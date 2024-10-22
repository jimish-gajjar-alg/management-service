# Management Service for Algonquin Pet Store

This lab assignment involves developing the **Management Service** for the Algonquin Pet Store. The service handles incoming order messages via **RabbitMQ** and makes them accessible through a **REST API** for the store-admin web application. The implementation adheres to four principles of the **12-Factor App** methodology: **Codebase**, **Dependencies**, **Configuration**, and **Backing Services**.

## `index.js`

The main functionality of the Management Service is defined in this file. It establishes a connection with **RabbitMQ**, processes the incoming order messages, and offers a REST API for the store-admin web application to use the data.

### Implementation Overview:

1. I installed the necessary dependencies to make RabbitMQ work and set up RabbitMQ in the `index.js` file using the **amqplib** library.
2. To manage the requests from the store-admin web application, a **Node.js REST API** framework was created.

## `test-api.http`

This file holds **HTTP requests** to use in testing the REST API endpoints. These requests mimic API calls to ensure that the Management Service is functioning as expected. For these tests, I employed the **REST Client** extension in Visual Studio Code to make API testing more manageable.

## **Deployment Process**

### **Step 1: Set Up RabbitMQ on Azure VM**

1. **Create an Azure Virtual Machine (VM)**:
   - Go to the **Azure Portal** and create a new **Ubuntu Virtual Machine**.
   - Ensure that SSH is enabled for remote access.

2. **Install RabbitMQ on the VM**:
   - SSH into the VM:
     ```bash
     ssh <username>@<VM-IP-Address>
     ```
   - Update the VM and install RabbitMQ:
     ```bash
     sudo apt update
     sudo apt install rabbitmq-server -y
     ```
   - Start and enable RabbitMQ:
     ```bash
     sudo systemctl start rabbitmq-server
     sudo systemctl enable rabbitmq-server
     ```

3. **Open Required Ports**:
   - In the Azure portal, go to your VM's **Network Security Group (NSG)** and open inbound ports **5672** (RabbitMQ) and **15672** (RabbitMQ Management UI).

### **Step 2: Create an Azure Web App for the Management Service**

1. **Create a Web App**:
   - In **Azure Portal**, create a new **Web App**.
   - Choose **Node.js** as the runtime stack and ensure it's deployed in the same region as your VM.

2. **Configure Environment Variables**:
   - In your Web App's **Configuration** section, add the following environment variables:
     ```plaintext
     PORT=3000
     RABBITMQ_URL=amqp://<username>:<password>@<VM-IP-Address>:5672
     ```

### **Step 3: Configure CI/CD with GitHub Actions**